package com.project.baggu.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewTextDto {

  private Long targetItemIdx;
  private String targetItemFirstImgUrl;
  private Long writeUserIdx;
  private String reviewText;
  private String profileImgUrl;

}
