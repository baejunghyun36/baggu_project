package com.project.baggu.controller;

import com.project.baggu.dto.BaseMessageResponse;
import com.project.baggu.exception.BaseResponseStatus;
import com.project.baggu.exception.BaseException;
import com.project.baggu.service.JwtTokenService;
import com.project.baggu.utils.CookieUtils;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class AuthController {

  @Autowired
  private final JwtTokenService jwtTokenService;
  @GetMapping("/")
  public String index(HttpServletRequest request, HttpServletResponse response){
    return "welcome";
  }

  @GetMapping("/auth/login")
  public String login(HttpServletRequest request, HttpServletResponse response){
    return "hi";
  }

  @GetMapping("/auth/fin")
  public String afterAuthentication(HttpServletRequest request, HttpServletResponse response){
    return "welcome userIdx " + SecurityContextHolder.getContext().getAuthentication().getPrincipal() + ", you are authorized";
  }

  @GetMapping("/auth/token")
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

//  @GetMapping("/baggu/auth/login")
//  public boolean loginUserTrueOrFalse(
//      @RequestParam(name = "code") String code,
//      @RequestParam(name = "state") String state){
//    String email = "bae1004kin@naver.com";
//    return userService.findUserByEmail(email);
//  }


}
