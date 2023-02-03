package com.project.baggu.config.oauth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.baggu.domain.OAuth2KakaoUser;
import com.project.baggu.domain.RefreshToken;
import com.project.baggu.dto.AuthLoginDto;
import com.project.baggu.dto.AuthLogoutDto;
import com.project.baggu.dto.UserProfileDto;
import com.project.baggu.service.JwtTokenService;
import java.io.BufferedReader;
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

    AuthLogoutDto authLogoutDto = getJsonRequest(request);
    String userIdx = authLogoutDto.getUserIdx().toString();

    //쿠키의 경우 config 설정에 의해 삭제된다.
    //refresh token을 db에서 삭제한다.
    //아래 line 500에러 뜸 (findById가 안먹는다..)
//    jwtTokenService.deleteRefreshToken(userIdx);

    System.out.println("로그아웃 완료");
  }
  public AuthLogoutDto getJsonRequest(HttpServletRequest request)
      throws IOException {

    StringBuilder sb = new StringBuilder();
    BufferedReader reader = request.getReader();

    String line;
    while ((line = reader.readLine()) != null) {
      sb.append(line);
    }

    String jsonPayload = sb.toString();
    ObjectMapper mapper = new ObjectMapper();
    return mapper.readValue(jsonPayload, AuthLogoutDto.class);
  }
}
