package com.project.baggu.dto;

import lombok.Data;

@Data
public class ChatRoomDto {

  private Long[] userIdx = new Long[2];
  private String[] nickname = new String[2];
  private String[] userImg = new String[2];
  private String[] itemImg = new String[2];
  private Long[] itemIdx = new Long[2];

}
