package com.project.baggu.controller;

import com.project.baggu.dto.BaseIsSuccessDto;
import com.project.baggu.dto.ReviewTagDto;
import com.project.baggu.dto.ReviewTextDto;
import com.project.baggu.dto.TradeFinDto;
import com.project.baggu.service.TradeFinService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/baggu/tradeFin")
@RequiredArgsConstructor
public class TradeFinController {

  private final TradeFinService tradeFinService;

  // [GET] /baggu/tradeFin
  //최근 성사된 거래(바꾸) 리스트를 받는다.
  @GetMapping
  public List<TradeFinDto> tradeFinList(HttpServletRequest request){
    return tradeFinService.tradeFinList();
  }



  //[POST] /baggu/tradeFin/reviewText
  //해당 거래에 대한 후기를 작성한다.
  @PostMapping("/reviewText")
  public BaseIsSuccessDto reviewText(@RequestBody ReviewTextDto reviewTextDto){
    try{
      tradeFinService.reviewText(reviewTextDto);
      return new BaseIsSuccessDto(true);
    } catch (Exception e){
      return new BaseIsSuccessDto(false);
    }
  }

  //[POST] /baggu/tradeFin/{tradeFinIdx}/like
  //사용자가 특정 바꾸 내역에 대해 좋아요를 표시한다.
  @PostMapping("/{tradeFinIdx}/like")
  public BaseIsSuccessDto likeTradeFin(@PathVariable("tradeFinIdx") Long tradeFinIdx){
    try{
      //jwt에서 추출 로직 필요
      Long userIdx = 1L;
      tradeFinService.likeTradeFin(tradeFinIdx, userIdx);
      return new BaseIsSuccessDto(true);
    } catch (Exception e){
      return new BaseIsSuccessDto(false);
    }

  }


  //[DELETE] /baggu/tradeFin/{tradeFinIdx}/like
  //사용자가 피드 게시물에 좋아요된 상태에서 한 번 더 눌러 취소한다.
  @DeleteMapping("/{tradeFinIdx}/like")
  public BaseIsSuccessDto dislikeTradeFin(@PathVariable("tradeFinIdx") Long tradeFinIdx) {
    try {
      //jwt에서 추출 로직 필요
      Long userIdx = 1L;
      tradeFinService.dislikeTradeFin(tradeFinIdx, userIdx);
      return new BaseIsSuccessDto(true);
    } catch (Exception e) {
      return new BaseIsSuccessDto(false);
    }
  }


  //유저의 최근 거래(바꾸) 리스트를 받는다.
  @GetMapping(params = {"userIdx"})
  public List<TradeFinDto> userTradeFinList(@RequestParam(name = "userIdx") Long userIdx){

    return tradeFinService.userTradeFinList(userIdx);
  }

  //[GET] /baggu/tradeFin/reviewTag
  //거래 상대 유저에 대한 태그후기를 작성한다.
  @PostMapping("/reviewTag")
  public void reviewTag(@RequestBody ReviewTagDto reviewTagDto){

    tradeFinService.reviewTag(reviewTagDto);
  }




}
