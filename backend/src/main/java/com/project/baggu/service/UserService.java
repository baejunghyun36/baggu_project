package com.project.baggu.service;

import com.project.baggu.exception.BaseException;
import com.project.baggu.exception.BaseResponseStatus;
import com.project.baggu.domain.Category;
import com.project.baggu.domain.Item;
import com.project.baggu.domain.Notify;
import com.project.baggu.domain.ReviewTag;
import com.project.baggu.domain.ReviewText;
import com.project.baggu.domain.User;
import com.project.baggu.dto.*;
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

  @Transactional
  public UserProfileDto userSignUp(UserSignUpDto userSignUpDto) throws BaseException {

    User user = userRepository.findUserByKakaoId(userSignUpDto.getKakaoId()).orElseThrow(()-> new BaseException(BaseResponseStatus.REQUEST_ERROR));

    user.setEmail(userSignUpDto.getEmail());
    user.setNickname(userSignUpDto.getNickname());
    user.setCategories(new ArrayList<>());
    user.setSi(userSignUpDto.getSi());
    user.setGu(userSignUpDto.getGu());
    user.setDong(userSignUpDto.getDong());
    user.setLng(userSignUpDto.getLng());
    user.setLat(userSignUpDto.getLat());
    user.setRole(userSignUpDto.getRole());

    userRepository.save(user);

    for(int i=0; i<userSignUpDto.getCategory().size(); i++){
      Category category = new Category();
      category.setUser(user);
      category.setType(userSignUpDto.getCategory().get(i));
      categoryRepository.save(category);
    }

    return UserProfileDto.builder()
            .userIdx(user.getUserIdx())
            .nickname(user.getNickname())
            .info(user.getInfo())
            .dong(user.getDong())
            .role(user.getRole()).build();
  }



  public UserProfileDto userProfile(Long userIdx) throws BaseException {

    User user = userRepository.findById(userIdx).orElseThrow(()-> new BaseException(BaseResponseStatus.REQUEST_ERROR));

    return UserProfileDto.builder()
            .userIdx(user.getUserIdx())
            .nickname(user.getNickname())
            .info(user.getInfo())
            .dong(user.getDong())
            .role(user.getRole()).build();
  }
  public void userUpdateProfile(Long userIdx, UserUpdateProfileDto userUpdateProfileDto) throws Exception{
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
  public void userUpdateLocation(Long userIdx, UserUpdateLocationDto userUpdateLocationDto) {

    User user = userRepository.findById(userIdx).get();

    user.setSi(userUpdateLocationDto.getSi());
    user.setGu(userUpdateLocationDto.getGu());
    user.setDong(userUpdateLocationDto.getDong());
    user.setLat(userUpdateLocationDto.getLat());
    user.setLng(userUpdateLocationDto.getLng());

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

  public UserDetailDto userDetail(Long userIdx) throws BaseException {

    User user = userRepository.findById(userIdx).orElseThrow(()-> new BaseException(BaseResponseStatus.REQUEST_ERROR));
    UserDetailDto userDetailDto = new UserDetailDto();
    userDetailDto.setInfo(user.getInfo());
    userDetailDto.setNickname(user.getNickname());
    List<Item> items = itemRepository.userItemList(userIdx);

    for(Item item : items){
      userDetailDto.getItemList().add(
              ItemListDto.builder()
                      .title(item.getTitle())
                      .dong(item.getDong())
                      .createdAt(item.getCreatedAt())
                      .state(item.getState())
                      .isValid(item.isValid())
                      .build()
      );
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
      reviewTextDto.setTargetItemIdx(rt.getItem().getItemIdx());
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


  //내부 로직 수행에서 필요 -> auth
  public void save(User user){
    userRepository.save(user);
  }

  public Optional<User> findUserByKakaoId(String kakaoId){
    return userRepository.findUserByKakaoId(kakaoId);
  }
}
