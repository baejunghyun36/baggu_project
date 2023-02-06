package com.project.baggu.exception;

import com.fasterxml.jackson.databind.ser.Serializers.Base;
import java.sql.SQLOutput;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@ControllerAdvice
public class BasicExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler({BaseException.class})
  protected ResponseEntity handleCustomException(BaseException e) {
    log.error("Error occurs {}", e.toString());
    return ResponseEntity.status(e.getStatus().getStatus())
        .body(e.getStatus().getMessage());
  }

  @ExceptionHandler({Exception.class})
  protected ResponseEntity handleServerException(Exception e) {
    log.error("Uncatched Error occurs {}", e.toString());
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
  }

}
