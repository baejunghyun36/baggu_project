package com.project.baggu.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.baggu.domain.enumType.CategoryType;
import com.project.baggu.domain.enumType.TradeState;
import java.time.LocalDateTime;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDetailDto {

  //작성자 정보
  private Long userIdx;
  private String nickname;
  private String info;
  private String profileImgUrl;

  //아이템 정보
  private String title;
  private int category;
  private String dong;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
  private LocalDateTime createdAt;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
  private LocalDateTime modifiedAt;
  private String content;
  private int tradeState;
  private ArrayList<String> itemImgUrls;
  private ArrayList<UserDto> requestUserList = new ArrayList<>();

}
