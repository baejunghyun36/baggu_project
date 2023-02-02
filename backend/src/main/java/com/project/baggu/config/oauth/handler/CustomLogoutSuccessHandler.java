package com.project.baggu.config.oauth.handler;

import com.project.baggu.domain.RefreshToken;
import com.project.baggu.service.JwtTokenService;
import java.io.IOException;
import java.time.LocalDateTime;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {

  private final JwtTokenService jwtTokenService;

  @Override
  public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {

//    System.out.println(request);
//    //refresh token 삭제
//    jwtTokenService.deleteRefreshToken(authentication.getPrincipal().toString());

    System.out.println("로그아웃 완료");
  }
}
