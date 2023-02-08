package com.project.baggu.controller;

import com.project.baggu.domain.TokenInfo;
import com.project.baggu.domain.User;
import com.project.baggu.domain.enumType.Role;
import com.project.baggu.exception.BaseException;
import com.project.baggu.dto.*;
import com.project.baggu.repository.UserRepository;
import com.project.baggu.service.JwtTokenService;
import com.project.baggu.service.UserService;
import com.project.baggu.utils.CookieUtils;
import com.project.baggu.utils.JwtTokenUtils;
import java.util.List;
import com.project.baggu.exception.BaseResponseStatus;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/baggu/user")
@Slf4j
public class UserController {

  private final UserRepository userRepository;

  private final UserService userService;
  private final JwtTokenService jwtTokenService;


  //[POST] /baggu/user
  //  - 화면에 입력된 사용자의 닉네임을 저장한다.
  //  - 유저의 관심 카테고리를 저장한다. (1순위)
  //  - 유저의 현재 위치를 기준으로 유저의 동네를 저장한다.
  @PostMapping
  public UserProfileDto userSignUp(@RequestBody UserSignUpDto userSignUpDto,
      HttpServletResponse response) throws Exception {

    UserProfileDto userProfileDto = userService.userSignUp(userSignUpDto);

    //토큰 발급
    TokenInfo tokenInfo = JwtTokenUtils.allocateToken(userProfileDto.getUserIdx(),
        userProfileDto.getRole().toString());
    jwtTokenService.saveRefreshToken(userProfileDto.getUserIdx(), tokenInfo.getRefreshToken());
    response.addHeader("Authorization", tokenInfo.getAccessToken());
    CookieUtils.addCookie(response, "refresh-token", tokenInfo.getRefreshToken(),
        (int)(JwtTokenUtils.REFRESH_PERIOD/1000));

    return userProfileDto;
  }

  //[GET] /baggu/user/{userIdx}
  //로그인 시 사용자 정보 가져온다.
  @GetMapping("/{userIdx}")
  public UserProfileDto getUserProfile(@PathVariable("userIdx") Long userIdx) throws Exception {

    UserProfileDto userProfileDto = userService.getUserProfile(userIdx);

    return userProfileDto;
  }

  // [PUT] /baggu/user/{userIdx}/location
  // 유저의 현재 위치를 기준으로 유저의 동네를 저장한다.
  @PutMapping("/{userIdx}/location")
  public BaseIsSuccessDto updateUserLocation(@PathVariable("userIdx") Long userIdx,
      @RequestBody UserUpdateLocationDto userUpdateLocationDto) throws Exception {

    Long authUserIdx = Long.parseLong(
        SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
    if (authUserIdx != userIdx) {
      throw new BaseException(BaseResponseStatus.UNVALID_USER);
    }

    userService.updateUserLocation(userIdx, userUpdateLocationDto);
    return new BaseIsSuccessDto(true);
  }

  //[GET] /baggu/user/{userIdx}/item
  //해당 유저에 대한 프로필 정보와 등록한 아이템 리스트를 받는다.
  @GetMapping("/{userIdx}/item")
  public UserDetailDto getUserDetail(@PathVariable("userIdx") Long userIdx,
      @RequestParam(required = false, name = "page") Integer page) {

    if(page==null){
      page = 0;
    }
    UserDetailDto userDetailDto = userService.getUserDetail(userIdx, page);

    return userDetailDto;
  }

  //[GET] /baggu/user/{userIdx}/review
  //해당 유저가 받은 태그 유저 후기, 받은 텍스트 후기, 보낸 텍스트 후기 리스트를 받는다.
  @GetMapping("/{userIdx}/review")
  public ReviewDto getUserReviewInfo(@PathVariable("userIdx") Long userIdx) {
    return userService.getReviewInfo(userIdx);
  }

  // [PUT] /baggu/user/{userIdx}/detail
  // 유저의 프로필 정보를 수정한다.
  @PutMapping("/{userIdx}/detail")
  public BaseIsSuccessDto updateUserProfile(@PathVariable("userIdx") Long userIdx,
      @ModelAttribute UserUpdateProfileDto userUpdateProfileDto) throws Exception {

      Long authUserIdx = Long.parseLong(
          SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
      if (authUserIdx != userIdx) {
        throw new BaseException(BaseResponseStatus.UNVALID_USER);
      }

      userService.updateUserProfile(userIdx, userUpdateProfileDto);

      return new BaseIsSuccessDto(true);
  }


  //============================
  //이하 2순위 이하 API (미완성)
  //============================

  //유저가 받은 최근 알림 리스트를 받는다.
  @GetMapping("/notify/{userIdx}")
  public List<NotifyDto> notifyList(@PathVariable("userIdx") Long userIdx) {

    return userService.notifyList(userIdx);
  }

  //유저의 관심목록을 받는다.
  @GetMapping("/{userIdx}/keep")
  public List<ItemListDto> userKeepItemList(@PathVariable("userIdx") Long userIdx) {

    return userService.userKeepItemList(userIdx);
  }

  //page test
  @GetMapping
  public Page<User> getUserPage(@RequestParam(required = false) Integer page){
    if(page==null){
      page = 0;
    }
    return userService.getUserPage(page);
  }
  @PostMapping("/logout")
  public ResponseEntity<String> userLogout(@RequestBody AuthLogoutDto authLogoutDto) {
    jwtTokenService.deleteRefreshToken(authLogoutDto.getUserIdx());
    return new ResponseEntity<>("SUCESS", HttpStatus.OK );
  }
}
