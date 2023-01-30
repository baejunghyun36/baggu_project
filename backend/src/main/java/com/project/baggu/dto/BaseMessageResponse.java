package com.project.baggu.dto;

import lombok.Getter;

@Getter
public class BaseMessageResponse {
  String message;
  public BaseMessageResponse(String message){
    this.message =message;
  }
}
