package com.project.baggu.controller;

import com.project.baggu.service.TradeRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TradeRequestController {

  private final TradeRequestService tradeRequestService;
}
