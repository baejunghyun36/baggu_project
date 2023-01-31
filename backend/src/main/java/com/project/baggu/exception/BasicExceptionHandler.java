package com.project.baggu.exception;

import java.sql.SQLOutput;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
@Slf4j
@ControllerAdvice
public class BasicExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(BaseException.class)
  public ResponseEntity<?> errorHandler(BaseException e) {
    log.error("Error occurs {}", e.toString());
    return ResponseEntity.status(e.getStatus().getStatus())
        .body(e.getStatus().name());
  }

}
