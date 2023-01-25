package com.project.baggu.dto;

import com.project.baggu.domain.enumType.ReviewTagType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewTagDto {
  private Long userIdx;
  private ReviewTagType reviewTagType;
}
