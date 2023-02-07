package com.project.baggu.raceCondition;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.project.baggu.domain.Item;
import com.project.baggu.dto.TradeRequestDto;
import com.project.baggu.dto.TradeRequestNotifyDto;
import com.project.baggu.repository.ItemRepository;
import com.project.baggu.repository.UserRepository;
import com.project.baggu.service.ItemService;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest
@Slf4j
public class OptimisticLockTest {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ItemRepository itemRepository;

  @Autowired
  private ItemService itemService;

  @Autowired
  OptimisticLockRaceConditionFacade optimisticLockRaceConditionFacade;


  @BeforeEach
  @Test
  void init(){
    Optional<Item> item = itemRepository.findById(1L);
    if (item.isPresent()) {
      item.get().setUserRequestCount(7);
    }
    itemRepository.save(item.get());
  }

  @Test
  void OptimisticLock_동시에_100개의_요청() throws InterruptedException {


    int threadCount = 5;
    ExecutorService executorService = Executors.newFixedThreadPool(32);//비동기로 실행하는 작업을 단순화하여 사용
    CountDownLatch latch = new CountDownLatch(threadCount);
    Long startTime = System.nanoTime();
    ArrayList<Long> list = new ArrayList<>();
    list.add(2L);

    TradeRequestDto tradeRequestDto = new TradeRequestDto();
    tradeRequestDto.setComment("안녕하세요");
    tradeRequestDto.setRequestUserIdx(2L);
    tradeRequestDto.setRequestItemIdxList(list);

    for (int i = 0; i < threadCount; i++) {
      int finalI = i;
      executorService.submit(() -> {
        try {
//          optimisticLockRaceConditionFacade.tradeRequest(1L, tradeRequestDto);

          TradeRequestNotifyDto tradeRequestNotifyDto = optimisticLockRaceConditionFacade.tradeRequest(1L, tradeRequestDto);
          if(tradeRequestNotifyDto==null){
            log.info("{} 스레드 : {}", finalI, "Fail");
          }
          else{
            log.info("{} 스레드 : {}", finalI, "Success");
          }
        }  catch (InterruptedException e) {
          e.printStackTrace();
        }
        finally {
          latch.countDown();;
        }
      });
    }
    latch.await();//다른 쓰레드에서 수행중인 작업이 완료될때까지 기다려줌
    Long endTime = System.nanoTime();
    System.out.println("\n"+(endTime - startTime)/(double)1000000000+"초 걸린다\n");

    Item item = itemRepository.findById(1L).orElseThrow();

    assertEquals(10L, item.getUserRequestCount());
  }
}
