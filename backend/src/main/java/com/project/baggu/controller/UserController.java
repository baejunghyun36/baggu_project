package com.project.baggu.controller;

import com.project.baggu.exception.BaseException;
import com.project.baggu.dto.*;
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

import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/baggu/user")
@Slf4j
public class UserController {

  private final UserService userService;
  private final ItemService itemService;
  private final TradeRequestService tradeRequestService;
  private final TradeFinService tradeFinService;

  //[POST] /baggu/user
  //  - 화면에 입력된 사용자의 닉네임을 저장한다.
  //  - 유저의 관심 카테고리를 저장한다. (1순위)
  //  - 유저의 현재 위치를 기준으로 유저의 동네를 저장한다.
  @PostMapping
  public UserProfileDto userSignUp(@RequestBody UserSignUpDto userSignUpDto, HttpServletResponse response) {
    UserProfileDto userProfileDto = new UserProfileDto();

    try{
      userProfileDto = userService.userSignUp(userSignUpDto);

      //토큰 발급 로직
      //TokenInfo tokenInfo = JwtUtils.allocateToken(authLoginUserDto.getUserIdx, authLoginUserDto.getRole);
      //response.addHeader("access-token",tokenInfo.getAccessToken());
      //CookieUtils.addCookie(response,refresh토큰);

    } catch (BaseException e){
//      //catch logic
    }

    return userProfileDto;

  }

  //[GET] /baggu/user/{userIdx}
  //로그인 시 사용자 정보 가져온다.
  @GetMapping("/{userIdx}")
  public UserProfileDto userProfile(@PathVariable("userIdx") Long userIdx){
    UserProfileDto userProfileDto = new UserProfileDto();

    try{
      userProfileDto = userService.userProfile(userIdx);
    } catch (BaseException e){
      //catch logic
    }

    return userProfileDto;
  }





  //유저가 받은 최근 알림 리스트를 받는다.
  @GetMapping("/notify/{userIdx}")
  public List<NotifyDto> notifyList(@PathVariable("userIdx") Long userIdx){

    return userService.notifyList(userIdx);
  }

  /*
  - 화면에 입력된 사용자의 닉네임을 저장한다.
  - 유저의 관심 카테고리를 저장한다. (1순위)
  - 유저의 현재 위치를 기준으로 유저의 동네를 저장한다.
  */



  //[GET] /baggu/user/{userIdx}/item
  //해당 유저에 대한 프로필 정보와 등록한 아이템 리스트를 받는다.
  @GetMapping("/{userIdx}/item")
  public UserDetailDto userDetail(@PathVariable("userIdx") Long userIdx){
    UserDetailDto userDetailDto = new UserDetailDto();

    try{
      userDetailDto = userService.userDetail(userIdx);
    } catch (BaseException e){
      //catch
    }

    return userDetailDto;
  }

  // [PUT] /baggu/user/{userIdx}/detail
  // 유저의 프로필 정보를 수정한다.
  @PutMapping("/{userIdx}/detail")
  public BaseIsSuccessDto userUpdateProfile(@PathVariable("userIdx") Long userIdx, @RequestBody UserUpdateProfileDto userUpdateProfileDto){
    try{
      userService.userUpdateProfile(userIdx, userUpdateProfileDto);
      return new BaseIsSuccessDto(true);
    } catch (Exception e){
      return new BaseIsSuccessDto(false);
    }
  }


  // [PUT] /baggu/user/{userIdx}/location
  // 유저의 프로필 정보를 수정한다.
  @PutMapping("/{userIdx}/location")
  public BaseIsSuccessDto userUpdateLocation(@PathVariable("userIdx") Long userIdx, @RequestBody UserUpdateLocationDto userUpdateLocationDto){
    try{
      userService.userUpdateLocation(userIdx, userUpdateLocationDto);
      return new BaseIsSuccessDto(true);
    } catch (Exception e){
      return new BaseIsSuccessDto(false);
    }
  }


  //[GET] /baggu/user/{userIdx}/review
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
