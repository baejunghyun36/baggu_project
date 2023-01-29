package com.project.baggu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateLocationDto {

  private String si;
  private String gu;
  private String dong;
  private String lat;
  private String lng;
}
