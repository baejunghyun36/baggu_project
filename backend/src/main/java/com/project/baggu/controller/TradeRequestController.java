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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/baggu/tradeRequest")
@RequiredArgsConstructor
@Slf4j
public class TradeRequestController {

  private final TradeRequestService tradeRequestService;



//  신청한 내역을 취소한다.
//  선택한 신청자를 삭제한다. -> 신청자와 관련된 아이템을 모두 삭제
  @DeleteMapping("/{tradeRequestIdx}")
  public void tradeDelete(@PathVariable("tradeRequestIdx") Long tradeRequestIdx){

    tradeRequestService.tradeDelete(tradeRequestIdx);
  }


  //유저가 바꾸신청을 보낸 아이템들의 리스트를 받는다.
  @GetMapping
  public List<ItemListDto> requestItemList(@RequestParam(name = "userIdx") Long userIdx) {

    return tradeRequestService.requestItemList(userIdx);
  }
}
