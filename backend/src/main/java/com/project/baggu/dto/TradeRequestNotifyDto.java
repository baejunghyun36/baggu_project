package com.project.baggu.dto;

import lombok.Data;

@Data
public class TradeRequestNotifyDto {

  private Long receiveUserIdx;
  private int type;
  private Long typeIdx;
  private String requestUserNickName;
}
