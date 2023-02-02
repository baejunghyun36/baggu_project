package com.project.notify.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "notify")
public class Notify  {

  @Id
  private String notifyIdx;
  private String title;
  private String content;
  private int type;
  private Long typeIdx;
  private Long receiveUserIdx;
  private boolean readState = false;
  private LocalDateTime createdAt;
}
