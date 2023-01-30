package com.project.baggu.service;

import com.project.baggu.domain.OAuth2KakaoUser;
import com.project.baggu.domain.User;
import com.project.baggu.exception.OAuth2LoginException;
import com.project.baggu.repository.UserRepository;
import java.util.Collections;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuth2UserService implements
    org.springframework.security.oauth2.client.userinfo.OAuth2UserService<OAuth2UserRequest, OAuth2User> {
  private final UserRepository userRepository;

  /**
   * OAuth2UserRequest의 token 정보를 활용해 인증 서버에서 해당하는 유저의 정보를 가져온다.
   * 이후 DB에 저장된 유저의 정보와 비교하여 필요한 응답을 생성한다.
   *
   * @param userRequest 토큰 발급이 완료된 OAuth2UserRequest
   */
  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    // 제공되는 OAuth2기본 유저 서비스를 가져와 OAuth2User 정보를 생성한다.
    // 식별자와 유저 이메일, 닉네임, 이메일 인증 여부 등의 정보를 가져옴
    org.springframework.security.oauth2.client.userinfo.OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
    OAuth2User oAuth2User = delegate.loadUser(userRequest);

    // 필요한 속성을 사용하기 위해 custom user 객체로 변환
    OAuth2KakaoUser kakaoUser = getOAuth2KakaoUser(oAuth2User.getAttributes());
    // kakaoId로 db에서 기존 유저 정보 찾아오기
    User registeredUser = userRepository.findUserByKakaoId(kakaoUser.getKakaoId()).orElseGet(User::new);

    // 현재 db에 유저가 존재하지 않다면 -> failure handler
    if(registeredUser.getUserIdx()==null){
      throw new OAuth2LoginException("SIGN_UP", kakaoUser);
    }

    // db에 존재하는 유저일 경우
    kakaoUser.setUserIdx(registeredUser.getUserIdx());
    kakaoUser.setRole(registeredUser.getRole());
    kakaoUser.setEmail(registeredUser.getEmail());

    return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority(kakaoUser.getRole().getKey())),
        kakaoUser.objToMap(),
        "id");
  }

  /**
   * Oauth2User의 attributes(인증 서버에서 반환한 user info)에서 필요한 정보만을 추출해 map으로 반환한다.
   *
   * @param attributes the attributes
   * @return the map
   */
  public OAuth2KakaoUser getOAuth2KakaoUser(Map<String, Object> attributes){
    Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");
    Map<String, Object> kakaoProfile = (Map<String, Object>)kakaoAccount.get("profile");

    return OAuth2KakaoUser
            .builder()
            .kakaoId(attributes.get("id").toString())
            .nickname(kakaoProfile.get("nickname").toString())
            .email(kakaoAccount.getOrDefault("email","null").toString())
            .isEmailValid(Boolean.valueOf(kakaoAccount.getOrDefault("is_email_valid","false").toString()))
            .isEmailVerified(Boolean.valueOf(kakaoAccount.getOrDefault("is_email_verified","false").toString()))
            .build();
  }
}
