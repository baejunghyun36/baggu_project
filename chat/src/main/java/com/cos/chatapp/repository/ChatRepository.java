package com.cos.chatapp.repository;

import com.cos.chatapp.domain.Chat;
import java.time.LocalDateTime;
import java.util.Date;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ChatRepository extends ReactiveMongoRepository<Chat, String> {


  @Tailable//커서를 안닫고 계속 유지한다.
  @Query("{'sender': ?0, 'receiver': ?1}")
  Flux<Chat> mFindBySender(String sender, String receiver); //Flux (흐름) response를 유지하면서 데이터를 계속 흘려 보내기


  @Tailable//커서를 안닫고 계속 유지한다.
  @Query("{'roomId': ?0}")
  Flux<Chat> findByRoomId(String roomId); //Flux (흐름) response를 유지하면서 데이터를 계속 흘려 보내기

  @Tailable
  @Query("{receiverIdx: ?0, createdAt: {$gt: ?1}}")
  Flux<Chat> mFindByReceiver(Long receiverIdx, LocalDateTime queryTime);


//  @Tailable
//  @Query("{roomNum: ?0} sort:{createdAt:-1} limit:1")
//  Flux<Chat> lastChat(Integer roomNum);


}

