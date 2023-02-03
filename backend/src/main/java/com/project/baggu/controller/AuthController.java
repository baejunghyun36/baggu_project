package com.project.baggu.controller;

import com.project.baggu.domain.TokenInfo;
import com.project.baggu.dto.AuthDevTokenDto;
import com.project.baggu.dto.BaseIsSuccessDto;
import com.project.baggu.dto.BaseMessageResponse;
import com.project.baggu.dto.BaseResponseStatus;
import com.project.baggu.exception.BaseException;
import com.project.baggu.service.JwtTokenService;
import com.project.baggu.utils.CookieUtils;
import com.project.baggu.utils.JwtTokenUtils;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/baggu/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class AuthController {

  @Autowired
  private final JwtTokenService jwtTokenService;

  @GetMapping("/token")
  public BaseMessageResponse tokenRefresh(HttpServletRequest request, HttpServletResponse response){
    try{
      String refreshToken = CookieUtils.getCookie(request,"refresh-token").getValue();
      if(refreshToken==null){
        throw new BaseException(BaseResponseStatus.UNVALID_TOKEN);
      }
      response.setHeader("access-token",jwtTokenService.renewAccessToken(refreshToken));
    } catch(BaseException e){
      response.setStatus(401);
      return new BaseMessageResponse(e.getStatus().getMessage());
    }
    return new BaseMessageResponse("ACCEPT");
  }

  @PostMapping("/token/dev")
  public String tokenAllocateForDev(@RequestBody AuthDevTokenDto authDevTokenDto, HttpServletResponse response){

    TokenInfo tokenInfo = JwtTokenUtils.allocateDevToken(authDevTokenDto.getUserIdx());
    response.addHeader("Authorization", tokenInfo.getAccessToken());
    CookieUtils.addCookie(response, "refresh-token", tokenInfo.getRefreshToken(),
        (int)(JwtTokenUtils.REFRESH_PERIOD/1000));

    return tokenInfo.getAccessToken();
//      return JwtTokenUtils.allocateDevToken(authDevTokenDto.getUserIdx()).getAccessToken();
  }

  @GetMapping("/token/dev/{userIdx}")
  public TokenInfo tokenAllocateForDev(@PathVariable("userIdx") Long userIdx, HttpServletResponse response){

    TokenInfo tokenInfo = JwtTokenUtils.allocateDevToken(userIdx);
    response.addHeader("Authorization", tokenInfo.getAccessToken());
    CookieUtils.addCookie(response, "refresh-token", tokenInfo.getRefreshToken(),
        (int)(JwtTokenUtils.REFRESH_PERIOD/1000));

    return tokenInfo;
//      return JwtTokenUtils.allocateDevToken(authDevTokenDto.getUserIdx()).getAccessToken();
  }

  @GetMapping("/healthcheck")
  public BaseIsSuccessDto healthCheck(){
    return new BaseIsSuccessDto(true);
  }

//  @GetMapping("/baggu/auth/login")
//  public boolean loginUserTrueOrFalse(
//      @RequestParam(name = "code") String code,
//      @RequestParam(name = "state") String state){
//    String email = "bae1004kin@naver.com";
//    return userService.findUserByEmail(email);
//  }

}
