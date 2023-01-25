package com.project.baggu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewTextDto {

  private Long receiveItemIdx;
  private Long requestUserIdx;
  private String reviewText;

}
