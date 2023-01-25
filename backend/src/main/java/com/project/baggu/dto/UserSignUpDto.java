package com.project.baggu.dto;

import com.project.baggu.domain.enumType.CategoryType;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSignUpDto{

  private String email;
  private String nickname;
  private ArrayList<CategoryType> category = new ArrayList<>();
  private String si;
  private String gu;
  private String dong;
  private String lng;
  private String lat;

}

