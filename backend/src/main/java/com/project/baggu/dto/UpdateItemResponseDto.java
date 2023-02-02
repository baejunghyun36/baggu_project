package com.project.baggu.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateItemResponseDto {

  private int category;
  private String title;
  private String content;
  private String itemFirstImgUrl;
  private List<String> itemImgUrls;
}
