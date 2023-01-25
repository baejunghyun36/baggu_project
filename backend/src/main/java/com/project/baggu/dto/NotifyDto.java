package com.project.baggu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotifyDto {

  private String title;
  private int notifyType;
  private String content;
  private Long notifyIdx;

}
