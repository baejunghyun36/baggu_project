package com.project.baggu.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TradeFinDto {
  private String requestNickname;
  private String receiveNickname;
  private Long requestItemIdx;
  private Long receiveItemIdx;
  private String requestItemImgUrl;
  private String receiveItemImgUrl;
  private String requestUserImgUrl;
  private String receiveUserImgUrl;
  private int heartCount;
  @JsonDeserialize(
      using = LocalDateTimeDeserializer.class
  )
  @JsonSerialize(
      using = LocalDateTimeSerializer.class
  )
  private LocalDateTime createdAt;
  private boolean isUserHeart;
}
