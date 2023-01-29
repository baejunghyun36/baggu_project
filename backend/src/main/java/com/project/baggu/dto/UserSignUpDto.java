package com.project.baggu.dto;

import com.project.baggu.domain.enumType.CategoryType;
import java.util.ArrayList;

import com.project.baggu.domain.enumType.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserSignUpDto{

  private String email;
  private String nickname;
  private ArrayList<CategoryType> category = new ArrayList<>();
  private String si;
  private String gu;
  private String dong;
  private String lng;
  private String lat;
  private Role role;
  private String kakaoId;

}

