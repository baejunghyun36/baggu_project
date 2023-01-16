package com.project.baggu.sample.tradeRequest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SampleTradeRequsetController {

  private final SampleTradeRequestService sampleTradeRequestService;

}
