package com.project.baggu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateProfileDto {

  private String nickname;
  private String info;
}
