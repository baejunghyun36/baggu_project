package com.project.baggu.controller;

import com.project.baggu.domain.TradeDetail;
import com.project.baggu.service.TradeDetailService;
import com.project.baggu.service.TradeRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/baggu/tradeDetail")
@RequiredArgsConstructor
@Slf4j
public class TradeDetailController {

  private final TradeDetailService tradeDetailService;
  //신청받은 아이템 중 교환할 물건을 선택한다.
  @GetMapping("/{tradeDetailIdx}")
  public void tradeRequestSelect(@PathVariable("tradeDetailIdx") Long tradeDetailIdx){

    tradeDetailService.tradeRequestSelect(tradeDetailIdx);
  }
}
