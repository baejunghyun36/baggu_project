package com.cos.chatapp.repository;


import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

public interface ChatListCurrent extends ReactiveMongoRepository<ChatListCurrent, String> {

  @Tailable//커서를 안닫고 계속 유지한다.
  @Query("{roomNum: ?0}")
  Flux<ChatListCurrent> mFindByRoomNum(Integer roomNum); //Flux (흐름) response를 유지하면서 데이터를 계속 흘려 보내기

}
