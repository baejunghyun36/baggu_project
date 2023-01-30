package com.project.baggu.service;

import com.project.baggu.exception.BaseException;
import com.project.baggu.dto.BaseResponseStatus;
import com.project.baggu.domain.*;
import com.project.baggu.dto.ReviewTagDto;
import com.project.baggu.dto.ReviewTextDto;
import com.project.baggu.dto.TradeFinDto;
import com.project.baggu.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TradeFinService {

  private final UserRepository userRepository;
  private final TradeFinRepository tradeFinRepository;
  private final ReviewTagRepository reviewTagRepository;
  private final ItemRepository itemRepository;
  private final ReviewTextRepository reviewTextRepository;
  private final TradeRequestRepository tradeRequestRepository;
  private final TradeDetailRepository tradeDetailRepository;
  private final HeartRepository heartRepository;


  public List<TradeFinDto> tradeFinList() {

    List<TradeFin> tradeFinList = tradeFinRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    List<TradeFinDto> tradeFinDtos = new ArrayList<>();
    for(TradeFin tf : tradeFinList){
      TradeFinDto tradeFinDto = new TradeFinDto();
      tradeFinDto.setHeartCount(tf.getHeartCount());
      tradeFinDto.setCreatedAt(tf.getCreatedAt());
      tradeFinDto.setReceiveItemIdx(tf.getReceiveItemIdx());
      tradeFinDto.setRequestItemIdx(tf.getRequestItemIdx());
      tradeFinDto.setReceiveNickname(tf.getReceiveNickname());
      tradeFinDto.setRequestNickname(tf.getRequestNickname());
      tradeFinDtos.add(tradeFinDto);
    }

    return tradeFinDtos;
  }

  public List<TradeFinDto> userTradeFinList(Long userIdx) {

    List<TradeFin> tradeFinList = tradeFinRepository.userTradeFinList(userIdx);
    List<TradeFinDto> tradeFinDtos = new ArrayList<>();
    for(TradeFin tf : tradeFinList){
      TradeFinDto tradeFinDto = new TradeFinDto();
      tradeFinDto.setHeartCount(tf.getHeartCount());
      tradeFinDto.setCreatedAt(tf.getCreatedAt());
      tradeFinDto.setReceiveItemIdx(tf.getReceiveItemIdx());
      tradeFinDto.setRequestItemIdx(tf.getRequestItemIdx());
      tradeFinDto.setReceiveNickname(tf.getReceiveNickname());
      tradeFinDto.setRequestNickname(tf.getRequestNickname());
      tradeFinDtos.add(tradeFinDto);
    }
    return tradeFinDtos;
  }

  public void reviewTag(ReviewTagDto reviewTagDto) {

    User user = userRepository.findById(reviewTagDto.getUserIdx()).get();

    reviewTagDto.getReviewTagTypes().stream().forEach((reviewTagType) ->
      reviewTagRepository.save(ReviewTag.builder().user(user).type(reviewTagType).build()));
  }

  public void reviewText(ReviewTextDto reviewTextDto) throws BaseException {

    User writeUser = userRepository.findById(reviewTextDto.getWriteUserIdx()).orElseThrow(()->new BaseException(BaseResponseStatus.REQUEST_ERROR));
    Item targetItem = itemRepository.findById(reviewTextDto.getTargetItemIdx()).orElseThrow(()->new BaseException(BaseResponseStatus.REQUEST_ERROR));

    reviewTextRepository.save(
            ReviewText.builder()
                    .user(writeUser)
                    .item(targetItem)
                    .comment(reviewTextDto.getReviewText())
                    .receiveUserIdx(targetItem.getUser().getUserIdx())
                    .build()
    );

    createTradeFin(writeUser, targetItem);
  }

  public void createTradeFin(User writeUser, Item targetItem) throws BaseException {

    //이미 상대방이 먼저 후기를 등록해서 trade fin 된 상태인지 확인
    if(tradeFinRepository.findTradeFinByItemIdx(targetItem.getItemIdx())>0) return;

    //해당 후기를 작성하려는 writer가 requestUser인지 receiveUser인지 확인한다.
    //trade request에 item(신청받는 아이템)이 targetItem이고 user(신청자)가 writer고, state가 1인 레코드가 존재한다면
    //writer가 requestUser
    Optional<TradeRequest> opt = tradeRequestRepository.findIdxByUserIdxAndItemIdx(writeUser.getUserIdx(), targetItem.getItemIdx());

    User requestUser;
    User receiveUser;
    Item requestItem;
    Item receiveItem;
    TradeFin tradeFin;

    if(opt.isPresent() && opt.get().getTradeRequestState()==1){
      TradeRequest tradeRequest = opt.get();

      requestUser = tradeRequest.getRequestUser();
      receiveItem = tradeRequest.getReceiveItemIdx();
      receiveUser = receiveItem.getUser();

      TradeDetail tradeDetail = tradeDetailRepository.findFinItemByTradeRequestIdx(tradeRequest.getTradeRequestIdx()).orElseThrow();

      tradeFin = TradeFin.builder()
              .receiveItemIdx(receiveItem.getItemIdx())
              .receiveNickname(receiveUser.getNickname())
              .receiveUserIdx(receiveUser.getUserIdx())
              .requestItemIdx(tradeDetail.getRequestItemIdx())
              .requestNickname(requestUser.getNickname())
              .requestUserIdx(requestUser.getUserIdx())
              .build();

    } else{
      receiveUser = writeUser;
      requestItem = targetItem;

      TradeDetail tradeDetail = tradeDetailRepository.findFinItemByRequestItemIdx(requestItem.getItemIdx()).orElseThrow();
      TradeRequest tradeRequest = tradeDetail.getTradeRequest();

      requestUser = tradeRequest.getRequestUser();
      receiveItem = tradeRequest.getReceiveItemIdx();

      tradeFin = TradeFin.builder()
              .receiveItemIdx(receiveItem.getItemIdx())
              .receiveNickname(receiveUser.getNickname())
              .receiveUserIdx(receiveUser.getUserIdx())
              .requestItemIdx(requestItem.getItemIdx())
              .requestNickname(requestUser.getNickname())
              .requestUserIdx(requestUser.getUserIdx())
              .build();
    }

    tradeFinRepository.save(tradeFin);

  }

  public void likeTradeFin(Long tradeFinIdx, Long userIdx){
    heartRepository.save(Heart.builder()
            .tradeFin(tradeFinRepository.findById(tradeFinIdx).orElseThrow())
            .user(userRepository.findById(userIdx).orElseThrow())
            .build());

    tradeFinRepository.likeTradeFin(tradeFinIdx);
  }

  public void dislikeTradeFin(Long tradeFinIdx, Long userIdx){
    heartRepository.delete(Heart.builder()
            .tradeFin(tradeFinRepository.findById(tradeFinIdx).orElseThrow())
            .user(userRepository.findById(userIdx).orElseThrow())
            .build());
    tradeFinRepository.dislikeTradeFin(tradeFinIdx);
  }


}
