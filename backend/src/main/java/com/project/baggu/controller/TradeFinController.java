package com.project.baggu.controller;

import com.project.baggu.dto.ReviewTagDto;
import com.project.baggu.dto.ReviewTextDto;
import com.project.baggu.dto.TradeFinDto;
import com.project.baggu.service.TradeFinService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/baggu/tradeFin")
@RequiredArgsConstructor
public class TradeFinController {

  private final TradeFinService tradeFinService;

  //해당 거래에 대한 후기를 작성한다.
  @PostMapping("/reviewText")
  public void reviewText(@RequestBody ReviewTextDto reviewTextDto){

    tradeFinService.reviewText(reviewTextDto);
  }

  //거래 상대 유저에 대한 태그후기를 작성한다.
  @PostMapping("/reviewTag")
  public void reviewTag(@RequestBody ReviewTagDto reviewTagDto){

    tradeFinService.reviewTag(reviewTagDto);
  }

  //유저의 최근 거래(바꾸) 리스트를 받는다.
  @GetMapping(params = {"userIdx"})
  public List<TradeFinDto> userTradeFinList(@RequestParam(name = "userIdx") Long userIdx){

    return tradeFinService.userTradeFinList(userIdx);
  }

  //최근 성사된 거래(바꾸) 리스트를 받는다.
  @GetMapping
  public List<TradeFinDto> tradeFinList(){

    return tradeFinService.tradeFinList();
  }

}
