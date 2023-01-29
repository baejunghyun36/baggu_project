package com.project.baggu.controller;

import com.project.baggu.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/baggu/auth")
@Slf4j
public class AuthController {

  private final UserService userService;

  //사용자가 가입된 유저인지 아닌지에 대한 정보를 받는다.
  @GetMapping("/login")
  public boolean loginUserTrueOrFalse(
      @RequestParam(name = "code") String code,
      @RequestParam(name = "state") String state){
    String email = "bae1004kin@naver.com";
    return userService.findUserByEmail(email);
  }



}
