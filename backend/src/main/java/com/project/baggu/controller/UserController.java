package com.project.baggu.controller;

import com.project.baggu.dto.ItemListDto;
import com.project.baggu.dto.LocationInfoDto;
import com.project.baggu.dto.NotifyDto;
import com.project.baggu.dto.ReviewDto;
import com.project.baggu.dto.UserDetailDto;
import com.project.baggu.dto.UserItemDto;
import com.project.baggu.dto.UserProfileDto;
import com.project.baggu.dto.UserSignUpDto;
import com.project.baggu.dto.UserUpdateProfileDto;
import com.project.baggu.service.ItemService;
import com.project.baggu.service.TradeFinService;
import com.project.baggu.service.TradeRequestService;
import com.project.baggu.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/baggu/user")
@Slf4j
public class UserController {

  private final UserService userService;
  private final ItemService itemService;
  private final TradeRequestService tradeRequestService;
  private final TradeFinService tradeFinService;

  //유저가 받은 최근 알림 리스트를 받는다.
  @GetMapping("/notify/{userIdx}")
  public List<NotifyDto> notifyList(@PathVariable("userIdx") Long userIdx){

    return userService.notifyList(userIdx);
  }

  //유저의 현재 위치를 기준으로 유저의 동네를 저장한다.
  @PutMapping("/{userIdx}/location")
  public void userChangeLocation(@PathVariable("userIdx") Long userIdx, @RequestBody LocationInfoDto locationInfoDto){

    userService.userChangeLocation(userIdx, locationInfoDto);
  }

  /*
  - 화면에 입력된 사용자의 닉네임을 저장한다.
  - 유저의 관심 카테고리를 저장한다. (1순위)
  - 유저의 현재 위치를 기준으로 유저의 동네를 저장한다.
  */
  @PostMapping
  public void userSignUp(@RequestBody UserSignUpDto userSignUpDto){

    userService.userSignUp(userSignUpDto);
  }

  //유저의 정보를 받는다.
  @GetMapping("/{userIdx}")
  public UserProfileDto userProfile(@PathVariable("userIdx") Long userIdx){

    return userService.userProfile(userIdx);
  }

  //해당 유저에 대한 프로필 정보와 등록한 아이템 리스트를 받는다.
  @GetMapping("/{userIdx}/item")
  public UserDetailDto userDetail(@PathVariable("userIdx") Long userIdx){

    return userService.userDetail(userIdx);
  }

  // 유저의 프로필 정보를 수정한다.
  @PutMapping("/{userIdx}/detail")
  public void userUpdateProfile(@PathVariable("userIdx") Long userIdx, @RequestBody UserUpdateProfileDto userUpdateProfileDto){

    userService.userUpdateProfile(userIdx, userUpdateProfileDto);
  }


  //해당 유저가 받은 태그 유저 후기, 받은 텍스트 후기, 보낸 텍스트 후기 리스트를 받는다.
  @GetMapping("/{userIdx}/review")
  public ReviewDto reviewInfo(@PathVariable("userIdx") Long userIdx){

    return userService.reviewInfo(userIdx);
  }

  //유저의 관심목록을 받는다.
  @GetMapping("/{userIdx}/keep")
  public List<ItemListDto> userKeepItemList(@PathVariable("userIdx") Long userIdx){

    return userService.userKeepItemList(userIdx);
  }


}
