package com.project.baggu.sample.tradeRequest;

import com.project.baggu.domain.TradeRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SampleTradeRequestService {

  private final SampleTradeRequestRepository sampleTradeRequestRepository;


  public void regist(TradeRequest request) {
    sampleTradeRequestRepository.regist(request);
  }

  public TradeRequest findOne(Long tradeRequestIdx) {
    return sampleTradeRequestRepository.findOne(tradeRequestIdx);
  }
}
