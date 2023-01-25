package com.project.baggu.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemOrderByNeighborDto {

  private String title;
  private LocalDateTime createdAt;
  private int state;

}
