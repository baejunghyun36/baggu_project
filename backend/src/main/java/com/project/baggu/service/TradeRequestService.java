package com.project.baggu.service;

import com.project.baggu.repository.TradeRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TradeRequestService {

  private final TradeRequestRepository tradeRequestRepository;

}
