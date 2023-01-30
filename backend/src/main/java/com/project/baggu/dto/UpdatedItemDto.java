package com.project.baggu.dto;

import com.project.baggu.domain.enumType.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatedItemDto {

  private CategoryType category;
  private String title;
  private String content;
}
