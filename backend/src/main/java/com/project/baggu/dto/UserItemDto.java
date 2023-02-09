package com.project.baggu.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
  private LocalDateTime createdAt;
  private int tradeState;
  private boolean reviewState;
  private String itemImgUrl;
}
