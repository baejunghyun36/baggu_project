package com.project.baggu.dto;

import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

  private Long userIdx;
  private String nickname;
  private String comment;
  private String profileImgUrl;
  private ArrayList<Long> requestItemIdxList = new ArrayList<>();
  private ArrayList<Long> tradeDetailIdxList = new ArrayList<>();
}
