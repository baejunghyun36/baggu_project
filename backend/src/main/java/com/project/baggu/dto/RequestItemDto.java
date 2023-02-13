package com.project.baggu.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RequestItemDto {
  private Long tradeDetailIdx;
  private Long requestItemIdx;
  private String requestItemFirstImg;

}
