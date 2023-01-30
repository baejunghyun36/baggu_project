package com.project.baggu.dto;

import com.project.baggu.domain.enumType.TradeState;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserItemDto {

  private Long itemIdx;
  private String title;
  private String dong;
  private LocalDateTime createdAt;
  private int tradeState;
  private boolean reviewState;
}
