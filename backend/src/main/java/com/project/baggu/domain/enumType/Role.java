package com.project.baggu.domain.enumType;

import lombok.Getter;

@Getter
public enum Role {

    TYPE0("ROLE_VISITOR", "비인증방문자"),   //비인증 방문자
    TYPE1("ROLE_REGULAR_USER", "정회원"),   //이메일 인증과 동네 등록이 완료된 회원
    TYPE2("ROLE_ASSOCIATE_USER", "준회원"),    //이메일 인증은 완료되지 않았으나 동네 등록이 완료된 회원
    TYPE3("ROLE_UNSIGNED_USER", "미등록회원"),    //이메일 인증은 완료됐으나 동네 등록이 완료되지 않은 회원
    TYPE4("ROLE_TEMP_USER", "미가입회원"),   //이메일 인증과 동네 등록 모두 완료되지 않은 회원
    TYPE5("ROLE_ADMIN", "관리자"); //관리자

    private String key;
    private String description;

    Role(String key, String description) {
        this.key = key;
        this.description = description;
    }

    public static Role afterSignUp(Role role){
        if(role.key.equals("ROLE_TEMP_USER")){
            return TYPE2;
        } else{
            return TYPE1;
        }
    }
}