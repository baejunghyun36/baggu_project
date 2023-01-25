package com.project.baggu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TradeDeleteDto {

  private Long itemIdx;
  private Long requestUserIdx;
}
