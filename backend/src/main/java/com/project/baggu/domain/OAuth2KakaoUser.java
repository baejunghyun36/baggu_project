package com.project.baggu.domain;


import com.project.baggu.domain.enumType.Role;
import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;
import lombok.Setter;

//카카오 인증 과정에서 사용되는 OAuth2User
@Getter
@Setter
@Builder
public class OAuth2KakaoUser {
    private Long userIdx;
    private String kakaoId;
    private String nickname;
    private String email;
    private boolean isEmailValid;
    private boolean isEmailVerified;
    private Role role;
    private String id;


    public Map<String, Object> objToMap(){
        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("userIdx", userIdx);
        resultMap.put("kakaoId", kakaoId);
        resultMap.put("nickname", nickname);
        resultMap.put("email", email);
        resultMap.put("isEmailValid", isEmailValid);
        resultMap.put("isEmailVerified", isEmailVerified);
        resultMap.put("role", role);
        resultMap.put("id", userIdx);

        return resultMap;
    }

    public void setUserIdx(Long userIdx){
        this.userIdx = userIdx;
    }

    public void setRole(Role role){
        this.role = role;
    }

    public static OAuth2KakaoUser mapToObj(Map<String, Object> attributes){
        return OAuth2KakaoUser.builder()
                .userIdx((Long)(attributes.getOrDefault("userIdx", "null")))
                .kakaoId(attributes.getOrDefault("id","null").toString())
                .nickname(attributes.getOrDefault("nickname","null").toString())
                .email(attributes.getOrDefault("email","null").toString())
                .isEmailValid(Boolean.valueOf(attributes.getOrDefault("isEmailValid",false).toString()))
                .isEmailVerified(Boolean.valueOf(attributes.getOrDefault("isEmailVerified",false).toString()))
                .role((Role)attributes.getOrDefault("role","ROLE_UNAUTHORIZED"))
                .build();
    }
}
