package com.cos.chatapp.domain;

import java.time.LocalDateTime;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "chat")
public class Chat {

  @Id
  private String chatId;
  private String msg;
  private Long receiverIdx; // 받는 사람 PK
  private Long senderIdx; //보내는 사람 PK
  private String receiverNickname;
  private String senderNickname;
  private String roomId; // 방 번호
  private LocalDateTime createdAt;
}
//5번방 채팅 감지
//http://localhost:8080/baggu/5/chatRoom