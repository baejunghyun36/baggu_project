package com.project.baggu.dto;

import com.project.baggu.domain.enumType.CategoryType;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateItemDto {
  private CategoryType category;
  private String title;
  private String content;
  private List<String> uploadImgUrls;
  private int itemFirstImgIdx;

}
