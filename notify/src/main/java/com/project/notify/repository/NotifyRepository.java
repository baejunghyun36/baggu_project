package com.project.notify.repository;

import com.project.notify.domain.Notify;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface NotifyRepository extends ReactiveMongoRepository<Notify, String> {

  @Tailable
  @Query("{receiveUserIdx: ?0}")
  Flux<Notify> findByUser(Long receiveUserIdx);


}
