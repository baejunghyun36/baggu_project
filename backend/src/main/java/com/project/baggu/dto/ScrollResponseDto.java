package com.project.baggu.dto;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ScrollResponseDto<T> {
  List<T> items;
  Boolean isLast;


}
