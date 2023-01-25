package com.project.baggu.controller;

import com.project.baggu.dto.ItemListDto;
import com.project.baggu.dto.TradeDeleteDto;
import com.project.baggu.dto.TradeRequestDto;
import com.project.baggu.service.TradeRequestService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/baggu/trade")
@RequiredArgsConstructor
@Slf4j
public class TradeRequestController {

  private final TradeRequestService tradeRequestService;

  //신청받은 아이템 중 교환할 물건을 선택한다.
  @GetMapping("/{tradeDetailIdx}")
  public void tradeRequestSelect(@PathVariable("tradeDetailIdx") Long tradeDetailIdx){
    tradeRequestService.tradeRequestSelect(tradeDetailIdx);
  }

  //유저가 신청메세지와 함께 바꾸신청을 보낸다.
  @PostMapping("/request")
  public void tradeRequest(@RequestBody TradeRequestDto tradeRequestDto){
    tradeRequestService.tradeRequest(tradeRequestDto);
  }

  //유저가 바꾸신청을 보낸 아이템들의 리스트를 받는다.
  @GetMapping("/requestItemList/{userIdx}")
  public List<ItemListDto> requestItemList(@PathVariable("userIdx") Long userIdx) {

    return tradeRequestService.requestItemList(userIdx);
  }

  //신청한 내역을 취소한다.
  //선택한 신청자를 삭제한다. -> 신청자와 관련된 아이템을 모두 삭제
  @DeleteMapping
  public void tradeDelete(@RequestBody TradeDeleteDto tradeDeleteDto){

    tradeRequestService.tradeDelete(tradeDeleteDto);
  }
}
