package com.project.baggu.exception;

import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import com.project.baggu.domain.OAuth2KakaoUser;

public class OAuth2LoginException extends OAuth2AuthenticationException {

    OAuth2KakaoUser oAuth2KakaoUser;

    public OAuth2LoginException(String errorCode, OAuth2KakaoUser oAuth2KakaoUser) {
        super(errorCode);
        this.oAuth2KakaoUser = oAuth2KakaoUser;
    }

    public OAuth2KakaoUser getOAuth2KakaoUser() {
        return oAuth2KakaoUser;
    }
}
