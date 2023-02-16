package com.project.baggu.dto;

import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateProfileDto {

//  private String unchangedProfileImg;
  private Object profileImg;
  private String nickname;
  private String info;
}
