package com.cos.chatapp.dto;


import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomDto {

  private Long[] userIdx = new Long[2];
  private String [] nickname = new String[2];
  private String [] userImg = new String[2];
  private String[] itemImg = new String[2];
  private Long[] itemIdx = new Long[2];
  private Integer[] reviewState = new Integer[2];
  private Long tradeDetailIdx;
  //63d9e720df40360b0d72a94f
}
