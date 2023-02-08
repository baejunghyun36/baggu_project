package com.project.baggu.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

/*
  @value : 해쉬키값
  @timeToLive : 만료시간
 */
@RedisHash(
    value = "refreshToken",
    timeToLive = 60L * 60L * 24L
)
@Getter
@Setter
@ToString
@Builder
public class RefreshToken {
  @Id
  private String userIdx;
  private String refreshToken;
  @JsonDeserialize(
      using = LocalDateTimeDeserializer.class
  )
  @JsonSerialize(
      using = LocalDateTimeSerializer.class
  )
  private LocalDateTime accessProvideTime;

}
