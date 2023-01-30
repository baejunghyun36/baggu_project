package com.project.baggu.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//controller 생성 후

@Slf4j
@RestControllerAdvice(basePackages = "com.project.baggu.src")
public class BaseControllerAdvice {

//  @ExceptionHandler(Exception.class)
//  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//  public BaseResponse<BaseResponseStatus> errorMissingParamHandler() {
//    return new BaseResponse<>(EMPTY_PARAMETER);
//  }

}