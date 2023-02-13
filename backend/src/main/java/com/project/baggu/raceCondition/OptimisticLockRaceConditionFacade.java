package com.project.baggu.raceCondition;

import com.project.baggu.dto.TradeRequestDto;
import com.project.baggu.dto.TradeRequestNotifyDto;
import com.project.baggu.service.ItemService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class OptimisticLockRaceConditionFacade {

  private final ItemService itemService;
  public TradeRequestNotifyDto tradeRequest(Long itemIdx, TradeRequestDto tradeRequestDto) throws InterruptedException{

    Map<Exception, TradeRequestNotifyDto> map = new HashMap<>();

    while(true){
      try {
        TradeRequestNotifyDto tradeRequestNotifyDto = itemService.tradeRequest(itemIdx, tradeRequestDto);
        return tradeRequestNotifyDto;
      }
      catch (Exception e) {
        Thread.sleep(20);
      }
    }
  }
}
