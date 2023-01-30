package com.project.baggu.domain;

import lombok.*;

@Data
@Builder
@ToString
@AllArgsConstructor
public class TokenInfo {
  private String accessToken;
  private String refreshToken;
}
