package com.project.baggu.dto;

import com.project.baggu.domain.enumType.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserLoginDto {
  private String kakaoId;
  private String email;
  private String nickname;
  private Role role;

}
