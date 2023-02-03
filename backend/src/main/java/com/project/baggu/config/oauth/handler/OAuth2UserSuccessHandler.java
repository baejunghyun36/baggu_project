package com.project.baggu.config.oauth.handler;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.baggu.domain.OAuth2KakaoUser;
import com.project.baggu.domain.TokenInfo;
import com.project.baggu.dto.AuthLoginDto;
import com.project.baggu.dto.UserProfileDto;
import com.project.baggu.service.JwtTokenService;
import com.project.baggu.utils.CookieUtils;
import com.project.baggu.utils.JwtTokenUtils;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler implements OAuth2CustomHandler{

  private ObjectMapper objectMapper = new ObjectMapper();
  private final JwtTokenService jwtTokenService;
  private static final int REFRESH_PERIOD = 60 * 60 * 24 * 14;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

    //만약 기존에 쿠키에 저장된 refresh token이 존재할 경우 강제 삭제
//    if(CookieUtils.getCookie(request,"refresh-token")!=null){
//      CookieUtils.deleteCookie(request, response, "refresh-token");
//    }

    //user attributes 추출
    OAuth2KakaoUser kakaoUser = OAuth2KakaoUser.mapToObj(((DefaultOAuth2User)authentication.getPrincipal()).getAttributes());

    //jwt 토큰 생성 후 refresh token 저장
    TokenInfo tokenInfo = JwtTokenUtils.allocateToken(kakaoUser.getUserIdx(), kakaoUser.getRole().getKey());
//    jwtTokenService.saveRefreshToken(kakaoUser.getUserIdx(), tokenInfo.getRefreshToken());

    //token 설정
    response.setHeader("Authorization",tokenInfo.getAccessToken());
//    CookieUtils.addCookie(response,"refresh-token",tokenInfo.getRefreshToken(), REFRESH_PERIOD);

    //임시 코드
    System.out.println(tokenInfo);

    writeJsonResponse(response,kakaoUser);
  }

  @Override
  public void writeJsonResponse(HttpServletResponse response, OAuth2KakaoUser oAuth2KakaoUser) throws IOException {
    //응답 헤더 설정
    response.setContentType("application/json");
    response.setCharacterEncoding("utf-8");

    AuthLoginDto authLoginDto = AuthLoginDto.builder()
        .isSigned(true)
        .kakaoId(oAuth2KakaoUser.getKakaoId())
        .user(UserProfileDto.builder().userIdx(oAuth2KakaoUser.getUserIdx()).role(oAuth2KakaoUser.getRole()).nickname(oAuth2KakaoUser.getNickname()).build())
        .build();

    //json 변환 후 response에 저장
    String stringResponseData = objectMapper.writeValueAsString(authLoginDto);
    response.getWriter().write(stringResponseData);
  }
}