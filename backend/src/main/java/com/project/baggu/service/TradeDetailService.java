package com.project.baggu.service;

import com.project.baggu.domain.Item;
import com.project.baggu.domain.TradeDetail;
import com.project.baggu.domain.TradeRequest;
import com.project.baggu.repository.ItemRepository;
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

  private final ItemRepository itemRepository;
  private final TradeDetailRepository tradeDetailRepository;

  @Transactional
  public void tradeRequestSelect(Long tradeDetailIdx) {

    TradeDetail tradeDetail = tradeDetailRepository.findById(tradeDetailIdx).get();
    TradeRequest tradeRequest = tradeDetail.getTradeRequest();
    Item item1 = itemRepository.findById(tradeDetail.getRequestItemIdx()).get();
    Item item2 = itemRepository.findById(tradeRequest.getReceiveItemIdx().getItemIdx()).get();
    tradeDetail.setTradeState(1);
    tradeRequest.setTradeRequestState(1);
    item1.setState(1);
    item1.setTradeItemIdx(item2.getItemIdx());
    item2.setState(1);
    item2.setTradeItemIdx(item1.getItemIdx());
  }

  @Transactional
  public void tradeDetailDelete(Long tradeDetailIdx) {

    TradeDetail tradeDetail = tradeDetailRepository.findById(tradeDetailIdx).get();
    tradeDetail.setValid(false);
  }
}
