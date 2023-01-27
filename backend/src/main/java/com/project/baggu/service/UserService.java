package com.project.baggu.service;

import com.project.baggu.domain.Category;
import com.project.baggu.domain.Item;
import com.project.baggu.domain.Notify;
import com.project.baggu.domain.ReviewTag;
import com.project.baggu.domain.ReviewText;
import com.project.baggu.domain.User;
import com.project.baggu.dto.ItemListDto;
import com.project.baggu.dto.LocationInfoDto;
import com.project.baggu.dto.NotifyDto;
import com.project.baggu.dto.ReviewDto;
import com.project.baggu.dto.ReviewTextDto;
import com.project.baggu.dto.UserDetailDto;
import com.project.baggu.dto.UserProfileDto;
import com.project.baggu.dto.UserSignUpDto;
import com.project.baggu.dto.UserUpdateProfileDto;
import com.project.baggu.repository.CategoryRepository;
import com.project.baggu.repository.ItemRepository;
import com.project.baggu.repository.NotifyRepository;
import com.project.baggu.repository.ReviewTagRepository;
import com.project.baggu.repository.ReviewTextRepository;
import com.project.baggu.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserService {

  private final ItemRepository itemRepository;
  private final UserRepository userRepository;
  private final CategoryRepository categoryRepository;
  private final NotifyRepository notifyRepository;
  private final ReviewTextRepository reviewTextRepository;
  private final ReviewTagRepository reviewTagRepository;

  public UserProfileDto userProfile(Long userIdx) {

    User user = userRepository.findById(userIdx).get();
    UserProfileDto userProfileDto = new UserProfileDto();
    userProfileDto.setDong(user.getDong());
    userProfileDto.setInfo(user.getInfo());
    userProfileDto.setNickname(user.getNickname());

    return userProfileDto;
  }
  public void userUpdateProfile(Long userIdx, UserUpdateProfileDto userUpdateProfileDto) {

    userRepository.userUpdateProfile(userIdx,userUpdateProfileDto.getNickname(), userUpdateProfileDto.getInfo());
  }
  public User findUser(Long userIdx) {

    return userRepository.findById(userIdx).get();
  }
  public boolean findUserByEmail(String email) {

    Optional<User> user = userRepository.findUserByEmail(email);
    if(user.isPresent())return true;
    else return false;

  }
  @Transactional
  public void userSignUp(UserSignUpDto userSignUpDto) {

    User user = new User();
    user.setEmail(userSignUpDto.getEmail());
    user.setNickname(userSignUpDto.getNickname());
    user.setSi(userSignUpDto.getSi());
    user.setGu(userSignUpDto.getGu());
    user.setDong(userSignUpDto.getDong());
    user.setLng(userSignUpDto.getLng());
    user.setLat(userSignUpDto.getLat());
    userRepository.save(user);

    for(int i=0; i<userSignUpDto.getCategory().size(); i++){
      Category category = new Category();
      category.setUser(user);
      category.setType(userSignUpDto.getCategory().get(i));
      categoryRepository.save(category);
    }
  }
  @Transactional
  public void userChangeLocation(Long userIdx, LocationInfoDto locationInfoDto) {

    User user = userRepository.findById(userIdx).get();
    user.setLat(locationInfoDto.getLat());
    user.setLng(locationInfoDto.getLng());
    userRepository.save(user);
  }

  public List<NotifyDto> notifyList(Long userIdx) {

    List<Notify> notifyList = notifyRepository.notifyListByUserIdx(userIdx);
    List<NotifyDto> notifyDtoList = new ArrayList<>();

    for (Notify n : notifyList) {
      NotifyDto notifyDto = new NotifyDto();
      notifyDto.setNotifyType(n.getType().ordinal());
      notifyDto.setNotifyIdx(n.getNotifyIdx());
      notifyDto.setTitle(n.getTitle());
      notifyDto.setContent(n.getContent());
      notifyDtoList.add(notifyDto);
    }
    return notifyDtoList;
  }

  public UserDetailDto userDetail(Long userIdx) {

    User user = userRepository.findById(userIdx).get();
    UserDetailDto userDetailDto = new UserDetailDto();
    userDetailDto.setInfo(user.getInfo());
    userDetailDto.setNickname(user.getNickname());
    List<Item> items = itemRepository.userItemList(userIdx);

    for(Item item : items){
      ItemListDto userItemDto = new ItemListDto();
      userItemDto.setTitle(item.getTitle());
      userItemDto.setDong(item.getDong());
      userItemDto.setCreatedAt(item.getCreatedAt());
      userItemDto.setState(item.getState());
      userDetailDto.getItemList().add(userItemDto);
    }
    return userDetailDto;
  }



  //tradeCount 0 으로 초기화
  @Transactional
  public void raceConditionUpdateUser(Long userIdx) {
    User user = userRepository.findById(userIdx).get();
    user.setTradeCount(0);
  }


  @Transactional
  public void raceConditionTest(Long userIdx){
    Optional<User> user = userRepository.findById(userIdx);
    if(user.isPresent()){
      log.info("여기");
      User u = user.get();
      u.setTradeCount(u.getTradeCount() + 1);
      log.info("count -> {}", u.getTradeCount());
    }
  }

  public int raceConditionTradeCountUser(Long userIdx){
    User user = userRepository.findById(userIdx).get();
    log.info("사용자 정보");
    log.info("{} {} {} {}", user.getUserIdx(), user.getInfo(), user.getName(),
        user.getTradeCount());
    log.info("{} 트레이드 카운트", userRepository.findById(userIdx).get().getTradeCount());
    return userRepository.findById(userIdx).get().getTradeCount();
  }

  public ReviewDto reviewInfo(Long userIdx) {

    ReviewDto reviewDto = new ReviewDto();
    List<ReviewTag> reviewTagList = reviewTagRepository.findReviewTag(userIdx);
    for(ReviewTag rt : reviewTagList){
      reviewDto.getReviewTag().put(rt.getType().ordinal(), reviewDto.getReviewTag().getOrDefault(rt.getType().ordinal(), 0) + 1);
    }
    List<String> commentList = reviewTextRepository.findReviewReceiveTextList(userIdx);
    for(String c : commentList){
      reviewDto.getReceiveReviewText().add(c);
    }
    List<ReviewText> reviewRequestTextList = reviewTextRepository.findReviewRequestTextList(userIdx);
    for(ReviewText rt : reviewRequestTextList){
      ReviewTextDto reviewTextDto = new ReviewTextDto();
      reviewTextDto.setReceiveItemIdx(rt.getItem().getItemIdx());
      reviewTextDto.setReviewText(rt.getComment());
      reviewDto.getRequestReviewText().add(reviewTextDto);
    }
    return reviewDto;
  }

  public List<ItemListDto> userKeepItemList(Long userIdx) {

    List<Item> list = itemRepository.userKeepItemList(userIdx);
    ItemListDto itemListDto = new ItemListDto();
    List<ItemListDto> itemListDtos = new ArrayList<>();
    for (Item i : list) {
      itemListDto.setTitle(i.getTitle());
      itemListDto.setDong(i.getDong());
      itemListDto.setState(i.getState());
      itemListDto.setCreatedAt(i.getCreatedAt());
      itemListDtos.add(itemListDto);
    }
    return itemListDtos;
  }
}
