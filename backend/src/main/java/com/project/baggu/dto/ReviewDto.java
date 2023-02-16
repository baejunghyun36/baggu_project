package com.project.baggu.dto;

import com.project.baggu.domain.enumType.ReviewTagType;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {

  private Map <Integer, Integer> reviewTag = new HashMap<>();
  private ArrayList<ReviewTextDto> receiveReviewText = new ArrayList<>();
  private ArrayList<ReviewTextDto> requestReviewText = new ArrayList<>();

}

