package com.cos.chatapp.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateDto {
  private String roomId;
  private Long userIdx;
  private Integer reviewNumber;
}
