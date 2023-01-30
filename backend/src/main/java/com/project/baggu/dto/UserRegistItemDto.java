package com.project.baggu.dto;

import com.project.baggu.domain.enumType.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegistItemDto {
  private Long userIdx;
  private String title;
  private CategoryType category;
  private String content;
}
