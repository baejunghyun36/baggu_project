package com.project.baggu.dto;

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

  //아이템 정보
  private String title;
  private int category;
  private String dong;
  private LocalDateTime createdAt;
  private LocalDateTime modifiedAt;
  private String content;
  private int tradeState;
  private ArrayList<UserDto> requestUserList = new ArrayList<>();

}
