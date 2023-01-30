package com.project.baggu.dto;

import com.project.baggu.domain.enumType.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfileDto {
  private Long userIdx;
  private String nickname;
  private String info;
  private String dong;
  private Role role;
}
