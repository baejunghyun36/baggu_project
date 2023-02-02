package com.cos.chatapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomFocusStateDto {

  private Long userIdx;
  private String roomId;
  private Boolean focusOn;

}
