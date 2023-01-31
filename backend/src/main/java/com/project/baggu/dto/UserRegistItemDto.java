package com.project.baggu.dto;

import com.project.baggu.domain.enumType.CategoryType;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegistItemDto {
  private Long userIdx;
  private String title;
  private CategoryType category;
  private String content;
//  private List<MultipartFile> itemImages;
}
