package com.project.baggu.service;

import com.project.baggu.repository.TradeDetailRepository;
import com.project.baggu.repository.TradeRequestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class TradeDetailService {

  private final TradeDetailRepository tradeDetailRepository;
  private final TradeRequestRepository tradeRequestRepository;
  @Transactional
  public void tradeRequestSelect(Long tradeDetailIdx) {

    tradeDetailRepository.updateTypeOne(tradeDetailIdx);
    Long tradeRequestIdx = tradeDetailRepository.findById(tradeDetailIdx).get().getTradeRequest().getTradeRequestIdx();
    tradeRequestRepository.updateTypeOne(tradeRequestIdx);
  }
}
