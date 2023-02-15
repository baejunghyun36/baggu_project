package com.project.baggu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserCheckDuplicatedNicknameResponseDto {
  private boolean isDuplicated;

}
