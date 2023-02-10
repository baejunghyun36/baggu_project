package com.project.baggu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TradeCompleteDto {

  private Long tradeDetailIdx;
  private Long[] itemIdx = new Long[2];
  private String[] userNickname = new String[2];
  private Long[] userIdx = new Long[2];
  private String[] userImg = new String[2];
}
