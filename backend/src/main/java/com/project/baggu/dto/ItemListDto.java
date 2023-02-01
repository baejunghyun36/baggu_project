package com.project.baggu.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemListDto {

  private Long tradeRequestIdx;
  private String title;
  private String dong;
  private LocalDateTime createdAt;
  private int state;
  private boolean isValid;
  private String itemImgUrl;
}
