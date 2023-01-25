package com.project.baggu.dto;

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
  private Long requestItemIdx;
}
