package com.project.baggu.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TradeFinDto {
  private String requestNickname;
  private String receiveNickname;
  private Long requestItemIdx;
  private Long receiveItemIdx;
  private int heartCount;
  private LocalDateTime createdAt;
}
