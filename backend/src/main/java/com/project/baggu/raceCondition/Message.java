package com.project.baggu.raceCondition;

import lombok.Data;

@Data
public class Message {

  private String message;
  private Object data;
  public Message() {
    this.message = "Fail";
    this.data = null;
  }
}
