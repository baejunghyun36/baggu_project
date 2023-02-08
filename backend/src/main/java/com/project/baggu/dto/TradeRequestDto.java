package com.project.baggu.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TradeRequestDto{

  private List<Long> requestItemIdxList = new ArrayList<>();
  private Long requestUserIdx;
  private String comment;

}

