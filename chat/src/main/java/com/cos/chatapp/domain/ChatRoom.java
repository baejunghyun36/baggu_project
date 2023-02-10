package com.cos.chatapp.domain;

import java.time.LocalDateTime;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "chatRoom")
@NoArgsConstructor
@Setter
public class ChatRoom {

  @Id
  private String roomId;

  private Long []userIdx = new Long[]{0L, 0L};
  private Long []readNotCnt = new Long[]{0L,0L};
  private Boolean [] userActive = new Boolean[]{false, false};
  private String [] nickname = new String[2];
  private String [] userImg = new String[2];
  private String[] itemImg = new String[2];
  private Long[] itemIdx = new Long[2];
  private String lastContent;
  private LocalDateTime createdAt;

  private Integer[] reviewState = new Integer[2];
  private Boolean tradeCompleteStatus = false;
  private Long tradeDetailIdx;

}
