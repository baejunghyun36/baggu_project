package com.project.baggu.exception;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum BaseResponseStatus {

  REQUEST_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "요청에 실패하였습니다."),
  TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),
  UNVALID_TOKEN(HttpStatus.UNAUTHORIZED, "인증되지 않은 토큰입니다."),
  DUPLICATE_LOGIN(HttpStatus.CONFLICT,"이미 로그인 중입니다.");
  private final HttpStatus status;
  private final String message;

  private BaseResponseStatus(HttpStatus status, String message) {
    this.status = status;
    this.message = message;
  }
}