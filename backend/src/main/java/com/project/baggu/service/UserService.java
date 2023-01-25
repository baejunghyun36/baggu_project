package com.project.baggu.service;

import com.project.baggu.domain.Category;
import com.project.baggu.domain.Item;
import com.project.baggu.domain.Notify;
import com.project.baggu.domain.User;
import com.project.baggu.dto.ItemListDto;
import com.project.baggu.dto.LocationInfoDto;
import com.project.baggu.dto.NotifyDto;
import com.project.baggu.dto.UserDetailDto;
import com.project.baggu.dto.UserProfileDto;
import com.project.baggu.dto.UserSignUpDto;
import com.project.baggu.dto.UserUpdateProfileDto;
import com.project.baggu.repository.CategoryRepository;
import com.project.baggu.repository.ItemRepository;
import com.project.baggu.repository.NotifyRepository;
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
  public void userChangeLocation(LocationInfoDto locationInfoDto) {

    User user = userRepository.findById(locationInfoDto.getUserIdx()).get();
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
}
