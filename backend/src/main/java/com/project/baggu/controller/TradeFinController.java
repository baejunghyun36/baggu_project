package com.project.baggu.controller;

import com.project.baggu.dto.*;
import com.project.baggu.exception.BaseResponseStatus;
import com.project.baggu.exception.BaseException;
import com.project.baggu.service.TradeFinService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/baggu/tradeFin")
@RequiredArgsConstructor
public class TradeFinController {

  private final TradeFinService tradeFinService;


  //교환 완료
  @PostMapping
  public  ResponseEntity<BaseIsSuccessDto> tradeComplete(@RequestBody TradeCompleteDto tradeCompleteDto){

    tradeFinService.tradeComplete(tradeCompleteDto);
    return new ResponseEntity(new BaseIsSuccessDto(true), HttpStatus.OK);
  }



  // [GET] /baggu/tradeFin?userIdx={userIdx}&page={page}
  //최근 성사된 거래(바꾸) 리스트를 받는다.
  @GetMapping
  public List<TradeFinDto> getTradeFinList(@RequestParam(required = false, name = "userIdx")Long userIdx,
      @RequestParam(required = false, name="page") Integer page){

    Long curUserIdx = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

    if(page==null) {
      page = 0;
    }

    //userIdx가 존재하지 않다면 전체 TradeFinDto 리스트를 반환
    if(userIdx==null){
      return tradeFinService.getTradeFinList(curUserIdx, page);
    }

    //userIdx가 존재한다면 특정 유저의 TradeFinDto 리스트를 반환
    return tradeFinService.getTradeFinList(userIdx, curUserIdx, page);
  }

  //[POST] /baggu/tradeFin/reviewText
  //해당 거래에 대한 후기를 작성한다.
  @PostMapping("/reviewText")
  public BaseIsSuccessDto writeTextReview(@RequestBody ReviewTextDto reviewTextDto) throws Exception{

    Long authUserIdx = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
    if(authUserIdx!=reviewTextDto.getWriteUserIdx()){
      throw new BaseException(BaseResponseStatus.UNVALID_USER);
    }

    tradeFinService.createTextReview(reviewTextDto);

    return new BaseIsSuccessDto(true);
  }

  //[POST] /baggu/tradeFin/{tradeFinIdx}/like
  //사용자가 특정 바꾸 내역에 대해 좋아요를 표시한다.
  @PostMapping("/{tradeFinIdx}/like")
  public BaseIsSuccessDto likeTradeFin(@PathVariable("tradeFinIdx") Long tradeFinIdx) throws Exception{

    Long curUserIdx = Long.parseLong(
        SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

    tradeFinService.createHeart(tradeFinIdx, curUserIdx);

    return new BaseIsSuccessDto(true);
  }

  //[DELETE] /baggu/tradeFin/{tradeFinIdx}/like
  //사용자가 피드 게시물에 좋아요된 상태에서 한 번 더 눌러 취소한다.
  @DeleteMapping("/{tradeFinIdx}/like")
  public BaseIsSuccessDto dislikeTradeFin(@PathVariable("tradeFinIdx") Long tradeFinIdx) throws Exception{

    Long curUserIdx = Long.parseLong(
        SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

    tradeFinService.deleteHeart(tradeFinIdx, curUserIdx);
    return new BaseIsSuccessDto(true);
  }

  //[POST] /baggu/tradeFin/reviewTag
  //거래 상대 유저에 대한 태그후기를 작성한다.
  @PostMapping("/reviewTag")
  public BaseIsSuccessDto writeTagReview(@RequestBody ReviewTagDto reviewTagDto) throws Exception{

    tradeFinService.createTagReview(reviewTagDto);

    return new BaseIsSuccessDto(true);
  }


  //============================
  //이하 2순위 이하 API (미완성)
  //============================
}
