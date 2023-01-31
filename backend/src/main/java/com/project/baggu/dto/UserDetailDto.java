package com.project.baggu.dto;

import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDetailDto {

  private String profileImg;
  private String nickname;
  private String info;

  @Builder.Default
  private ArrayList<ItemListDto> itemList = new ArrayList<>();

}
