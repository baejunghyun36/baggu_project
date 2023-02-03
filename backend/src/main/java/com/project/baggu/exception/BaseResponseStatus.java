package com.project.baggu.dto;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum BaseResponseStatus {

  REQUEST_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "요청에 실패하였습니다."),
  TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),
  UNVALID_TOKEN(HttpStatus.UNAUTHORIZED, "인증되지 않은 토큰입니다."),
  UNVALID_USER(HttpStatus.UNAUTHORIZED, "권한 없는 유저입니다."),
  OAUTH_REQUIRE(HttpStatus.UNAUTHORIZED, "소셜 인증이 이뤄지지 않은 유저입니다."),
  DUPLICATE_LOGIN(HttpStatus.CONFLICT,"이미 로그인 중입니다."),
  FILE_CONVERT_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,"파일 저장에 실패했습니다."),
  DATABASE_GET_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,"객체를 찾을 수 없습니다."),
  UNVALID_PARAMETER(HttpStatus.NOT_FOUND,"요청 파라미터를 확인해주세요."),


  //500
  //  1. db get 에러
  NOT_FOUND_REFRESH_TOKEN(HttpStatus.INTERNAL_SERVER_ERROR, "리프레시 토큰을 찾을 수 없습니다."),

  FILE_UPLOAD_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,"파일 업로드에 실패했습니다.");

  private final HttpStatus status;
  private final String message;

  private BaseResponseStatus(HttpStatus status, String message) {
    this.status = status;
    this.message = message;
  }
}