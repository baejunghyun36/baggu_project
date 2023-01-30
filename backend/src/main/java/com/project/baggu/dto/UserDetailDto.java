package com.project.baggu.dto;

import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailDto {
  private String nickname;
  private String info;
  private ArrayList<ItemListDto> itemList = new ArrayList<>();

}
