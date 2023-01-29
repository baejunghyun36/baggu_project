package com.project.baggu.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class AuthLoginDto {
  private boolean isSigned;
  private UserProfileDto user;

}
