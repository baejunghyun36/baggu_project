package com.project.baggu.sample.tradeRequest;

import com.project.baggu.domain.TradeRequest;
import javax.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class SampleTradeRequestRepository {

  private final EntityManager em;


  public void regist(TradeRequest request) {
    em.persist(request);
  }

  public TradeRequest findOne(Long tradeRequestIdx) {
    return em.find(TradeRequest.class, tradeRequestIdx);
  }
}
