package com.project.baggu.config.oauth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.baggu.domain.OAuth2KakaoUser;
import com.project.baggu.domain.User;
import com.project.baggu.domain.enumType.Role;
import com.project.baggu.dto.AuthLoginDto;
import com.project.baggu.dto.UserLoginDto;
import com.project.baggu.dto.UserProfileDto;
import com.project.baggu.exception.OAuth2LoginException;
import com.project.baggu.repository.UserRepository;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2UserFailureHandler extends SimpleUrlAuthenticationFailureHandler implements OAuth2CustomHandler{

  private final ObjectMapper objectMapper = new ObjectMapper();

  private final UserRepository userRepository;

  @Override
  public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException exception) throws IOException, ServletException {

    OAuth2LoginException loginException = (OAuth2LoginException)exception;
    OAuth2KakaoUser kakaoUser = loginException.getOAuth2KakaoUser();

    // 일단 무조건 회원 레코드를 저장해줘야함 (role을 저장하고 다음에 다시 로그인하면 권한처리 해줘야하니까)
    User user = User.builder()
        .nickname(kakaoUser.getNickname())
        .kakaoId(kakaoUser.getKakaoId())
        .email(kakaoUser.getEmail())
        .role(isUserHasEmail(kakaoUser)? Role.TYPE3 : Role.TYPE4)
        .build();

    userRepository.save(user);

    kakaoUser.setUserIdx(user.getUserIdx());
    kakaoUser.setRole(user.getRole());

    writeJsonResponse(response, kakaoUser);
  }

  @Override
  public void writeJsonResponse(HttpServletResponse response, OAuth2KakaoUser oAuth2KakaoUser)
      throws IOException {
    //헤더 설정
    response.setContentType("application/json");
    response.setCharacterEncoding("utf-8");

    //응답 dto 생성
    AuthLoginDto authLoginDto = AuthLoginDto.builder()
        .isSigned(false)
        .kakaoId(oAuth2KakaoUser.getKakaoId())
        .user(UserProfileDto.builder().userIdx(oAuth2KakaoUser.getUserIdx()).role(oAuth2KakaoUser.getRole()).nickname(oAuth2KakaoUser.getNickname()).build())
        .build();

    //json으로 변환하여 response에 저장
    String stringResponseData = objectMapper.writeValueAsString(authLoginDto);
    response.getWriter().write(stringResponseData);
  }

  private boolean isUserHasEmail(OAuth2KakaoUser kakaoUser){
    if(kakaoUser.getEmail().equals("null") || !kakaoUser.isEmailValid() || !kakaoUser.isEmailVerified()){
      return false;
    }
    return true;
  }
}
