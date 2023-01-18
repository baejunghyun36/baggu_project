package com.project.baggu.config;
import lombok.Getter;

@Getter
public enum BaseResponseStatus {

  SUCCESS(true, 1000, "요청에 성공하였습니다."),
  REQUEST_ERROR(false, 2000, "요청에 실패하였습니다.");

  private final boolean isSuccess;
  private final int code;
  private final String message;

  private BaseResponseStatus(boolean isSuccess, int code, String message) {
    this.isSuccess = isSuccess;
    this.code = code;
    this.message = message;
  }
}