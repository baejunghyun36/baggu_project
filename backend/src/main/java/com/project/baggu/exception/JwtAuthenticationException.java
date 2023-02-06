package com.project.baggu.exception;

import org.springframework.security.core.AuthenticationException;

public class JwtAuthenticationException extends AuthenticationException {

  private BaseResponseStatus status;

  public JwtAuthenticationException(BaseResponseStatus status) {
    super(status.getMessage());
    this.status = status;
  }

  public JwtAuthenticationException(BaseResponseStatus status, String message) {
    super(message);
    this.status = status;
  }

}
