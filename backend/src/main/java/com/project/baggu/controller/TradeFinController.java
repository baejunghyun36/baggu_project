package com.project.baggu.controller;

import com.project.baggu.dto.*;
import com.project.baggu.exception.BaseException;
import com.project.baggu.service.TradeFinService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.context.SecurityContextHolder;
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
  public List<TradeFinDto> tradeFinList(@RequestParam(required = false, name = "userIdx")Long userIdx){
    Long authUserIdx = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

    if(userIdx==null){
      return tradeFinService.tradeFinList(authUserIdx);
    }

    return tradeFinService.userTradeFinList(userIdx, authUserIdx);
  }


  //[POST] /baggu/tradeFin/reviewText
  //해당 거래에 대한 후기를 작성한다.
  @PostMapping("/reviewText")
  public BaseIsSuccessDto reviewText(@RequestBody ReviewTextDto reviewTextDto){
    try{
      Long authUserIdx = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
      if(authUserIdx!=reviewTextDto.getWriteUserIdx()){
        throw new BaseException(BaseResponseStatus.UNVALID_USER);
      }

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
      Long authUserIdx = Long.parseLong(
          SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

      tradeFinService.likeTradeFin(tradeFinIdx, authUserIdx);
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
      Long authUserIdx = Long.parseLong(
          SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

      tradeFinService.dislikeTradeFin(tradeFinIdx, authUserIdx);
      return new BaseIsSuccessDto(true);
    } catch (Exception e) {
      return new BaseIsSuccessDto(false);
    }
  }


  //유저의 최근 거래(바꾸) 리스트를 받는다.
  @GetMapping("/{userIdx}")
  public List<TradeFinDto> userTradeFinList(@PathVariable(name = "userIdx") Long userIdx){
    Long authUserIdx = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
    return tradeFinService.userTradeFinList(userIdx, authUserIdx);
  }

  //[POST] /baggu/tradeFin/reviewTag
  //거래 상대 유저에 대한 태그후기를 작성한다.
  @PostMapping("/reviewTag")
  public BaseIsSuccessDto reviewTag(@RequestBody ReviewTagDto reviewTagDto){
    try{
      return new BaseIsSuccessDto(true);
    }catch(Exception e){
     return new BaseIsSuccessDto(false);
    }
  }




}
