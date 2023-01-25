package com.project.baggu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatedItemDto {
  private String title;
  private int category;
  private String content;
}
