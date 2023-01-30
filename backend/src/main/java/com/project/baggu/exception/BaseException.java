package com.project.baggu.exception;

import com.project.baggu.dto.BaseResponseStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BaseException extends Exception {
  private BaseResponseStatus status;
}