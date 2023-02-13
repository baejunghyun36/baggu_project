package com.project.baggu.service;

//import static com.project.baggu.config.RedisConfig.RedisCacheKey.TRADE_FIN_LIST;

import com.project.baggu.dto.TradeCompleteDto;
import com.project.baggu.exception.BaseException;
import com.project.baggu.exception.BaseResponseStatus;
import com.project.baggu.domain.*;
import com.project.baggu.dto.ReviewTagDto;
import com.project.baggu.dto.ReviewTextDto;
import com.project.baggu.dto.TradeFinDto;
import com.project.baggu.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
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


//  @Cacheable(value = "trade", cacheManager = "redisCacheManager")
  public List<TradeFinDto> getTradeFinList(Long userIdx, int page) {
    User user = userRepository.findById(userIdx).orElseThrow();

    List<TradeFin> tradeFinList = tradeFinRepository.findAll(PageRequest.of(page,20,Sort.by(Sort.Direction.DESC, "createdAt"))).getContent();
    List<TradeFinDto> tradeFinDtos = new ArrayList<>();
    for(TradeFin tf : tradeFinList){
      TradeFinDto tradeFinDto = new TradeFinDto();
      tradeFinDto.setTradeFinIdx(tf.getTradeFinIdx());
      tradeFinDto.setHeartCount(tf.getHeartCount());
      tradeFinDto.setCreatedAt(tf.getCreatedAt());

      tradeFinDto.setReceiveItemIdx(tf.getReceiveItemIdx());
      tradeFinDto.setRequestItemIdx(tf.getRequestItemIdx());
      tradeFinDto.setReceiveNickname(tf.getReceiveNickname());
      tradeFinDto.setRequestNickname(tf.getRequestNickname());
      tradeFinDto.setReceiveUserImgUrl(tf.getReceiveProfileImgUrl());
      tradeFinDto.setReceiveUserImgUrl(tf.getRequestProfileImgUrl());
      tradeFinDto.setRequestUserIdx(tf.getRequestUserIdx());
      tradeFinDto.setReceiveUserIdx(tf.getReceiveUserIdx());

      Item item1 = itemRepository.findById(tf.getReceiveItemIdx()).orElseThrow(()->new BaseException(BaseResponseStatus.DATABASE_GET_ERROR));
      Item item2 = itemRepository.findById(tf.getRequestItemIdx()).orElseThrow(()->new BaseException(BaseResponseStatus.DATABASE_GET_ERROR));
      tradeFinDto.setReceiveItemImgUrl(item1.getFirstImg());
      tradeFinDto.setRequestItemImgUrl(item2.getFirstImg());

      user.getHearts().forEach((heart)->{
        if(heart.getTradeFin().getTradeFinIdx()==tf.getTradeFinIdx()){
          tradeFinDto.setUserHeart(true);
        }
      });

      tradeFinDtos.add(tradeFinDto);
    }

    return tradeFinDtos;
  }

  public List<TradeFinDto> getTradeFinList(Long userIdx, Long authUserIdx, int page) {

    User user = userRepository.findById(authUserIdx).orElseThrow();

    List<TradeFin> tradeFinList = tradeFinRepository.userTradeFinList(userIdx, PageRequest.of(page,20,Sort.by(Sort.Direction.DESC, "createdAt")));
    List<TradeFinDto> tradeFinDtos = new ArrayList<>();
    for(TradeFin tf : tradeFinList){
      TradeFinDto tradeFinDto = new TradeFinDto();
      tradeFinDto.setTradeFinIdx(tf.getTradeFinIdx());
      tradeFinDto.setHeartCount(tf.getHeartCount());
      tradeFinDto.setCreatedAt(tf.getCreatedAt());
      tradeFinDto.setReceiveItemIdx(tf.getReceiveItemIdx());
      tradeFinDto.setRequestItemIdx(tf.getRequestItemIdx());
      tradeFinDto.setReceiveNickname(tf.getReceiveNickname());
      tradeFinDto.setRequestNickname(tf.getRequestNickname());
      tradeFinDto.setReceiveUserImgUrl(tf.getReceiveProfileImgUrl());
      tradeFinDto.setReceiveUserImgUrl(tf.getRequestProfileImgUrl());
      tradeFinDto.setRequestUserIdx(tf.getRequestUserIdx());
      tradeFinDto.setReceiveUserIdx(tf.getReceiveUserIdx());

      Item item1 = itemRepository.findById(tf.getReceiveItemIdx()).orElseThrow(()->new BaseException(BaseResponseStatus.DATABASE_GET_ERROR));
      Item item2 = itemRepository.findById(tf.getRequestItemIdx()).orElseThrow(()->new BaseException(BaseResponseStatus.DATABASE_GET_ERROR));
      tradeFinDto.setReceiveItemImgUrl(item1.getFirstImg());
      tradeFinDto.setRequestItemImgUrl(item2.getFirstImg());

      user.getHearts().forEach((heart)->{
        if(heart.getTradeFin().getTradeFinIdx()==tf.getTradeFinIdx()){
          tradeFinDto.setUserHeart(true);
        }
      });

      tradeFinDtos.add(tradeFinDto);
    }
    return tradeFinDtos;
  }

  public void createTagReview(ReviewTagDto reviewTagDto) {

    User user = userRepository.findById(reviewTagDto.getUserIdx()).get();

    reviewTagDto.getReviewTagTypes().stream().forEach((reviewTagType) ->
      reviewTagRepository.save(ReviewTag.builder().user(user).type(reviewTagType).build()));
  }

  @Transactional
  public void createTextReview(ReviewTextDto reviewTextDto) throws BaseException {

    User writeUser = userRepository.findById(reviewTextDto.getWriteUserIdx()).orElseThrow(()->new BaseException(BaseResponseStatus.REQUEST_ERROR));
    Item targetItem = itemRepository.findById(reviewTextDto.getTargetItemIdx()).orElseThrow(()->new BaseException(BaseResponseStatus.REQUEST_ERROR));

    if(reviewTextRepository.findByUserIdxAndTradeItemIdx(writeUser.getUserIdx(), targetItem.getItemIdx()).isPresent()){
      return;
    }

    reviewTextRepository.save(
            ReviewText.builder()
                    .user(writeUser)
                    .item(targetItem)
                    .comment(reviewTextDto.getReviewText())
                    .receiveUserIdx(targetItem.getUser().getUserIdx())
                    .build()
    );

//    createTradeFin(writeUser, targetItem);
  }

//  public void createTradeFin(User writeUser, Item targetItem) throws BaseException {
//
//    //이미 상대방이 먼저 후기를 등록해서 trade fin 된 상태인지 확인
//    if(tradeFinRepository.findTradeFinByItemIdx(targetItem.getItemIdx())>0) return;
//
//    //해당 후기를 작성하려는 writer가 requestUser인지 receiveUser인지 확인한다.
//    //trade request에 item(신청받는 아이템)이 targetItem이고 user(신청자)가 writer고, state가 1인 레코드가 존재한다면
//    //writer가 requestUser
//    Optional<TradeRequest> opt = tradeRequestRepository.findByUserIdxAndItemIdx(writeUser.getUserIdx(), targetItem.getItemIdx());
//
//    User requestUser;
//    User receiveUser;
//    Item requestItem;
//    Item receiveItem;
//    TradeFin tradeFin;
//
//    if(opt.isPresent() && opt.get().getTradeRequestState()==1){
//      TradeRequest tradeRequest = opt.get();
//
//      requestUser = tradeRequest.getRequestUser();
//      receiveItem = tradeRequest.getReceiveItemIdx();
//      receiveUser = receiveItem.getUser();
//
//      TradeDetail tradeDetail = tradeDetailRepository.findFinItemByTradeRequestIdx(tradeRequest.getTradeRequestIdx()).orElseThrow();
//
//      tradeFin = TradeFin.builder()
//              .receiveItemIdx(receiveItem.getItemIdx())
//              .receiveNickname(receiveUser.getNickname())
//              .receiveUserIdx(receiveUser.getUserIdx())
//          .receiveProfileImgUrl(receiveUser.getProfileImg())
//              .requestItemIdx(tradeDetail.getRequestItemIdx())
//              .requestNickname(requestUser.getNickname())
//              .requestUserIdx(requestUser.getUserIdx())
//          .requestProfileImgUrl(requestUser.getProfileImg())
//          .build();
//
//    } else{
//      receiveUser = writeUser;
//      requestItem = targetItem;
//
//      TradeDetail tradeDetail = tradeDetailRepository.findFinItemByRequestItemIdx(requestItem.getItemIdx()).orElseThrow();
//      TradeRequest tradeRequest = tradeDetail.getTradeRequest();
//
//      requestUser = tradeRequest.getRequestUser();
//      receiveItem = tradeRequest.getReceiveItemIdx();
//
//      tradeFin = TradeFin.builder()
//              .receiveItemIdx(receiveItem.getItemIdx())
//              .receiveNickname(receiveUser.getNickname())
//              .receiveUserIdx(receiveUser.getUserIdx())
//          .receiveProfileImgUrl(receiveUser.getProfileImg())
//              .requestItemIdx(requestItem.getItemIdx())
//              .requestNickname(requestUser.getNickname())
//              .requestUserIdx(requestUser.getUserIdx())
//          .requestProfileImgUrl(requestUser.getProfileImg())
//              .build();
//    }
//
//    tradeFinRepository.save(tradeFin);
//  }

  @Transactional
  public void createHeart(Long tradeFinIdx, Long userIdx) throws BaseException {
    TradeFin tf = tradeFinRepository.findById(tradeFinIdx).orElseThrow();

    //이미 좋아요를 했는데 한번 더 요청할경우
    if(heartRepository.findByTradeFinIdxAndUserIdx(tradeFinIdx, userIdx)>0) {
      throw new BaseException(BaseResponseStatus.REQUEST_ERROR);
    }

    heartRepository.save(Heart.builder()
            .tradeFin(tradeFinRepository.findById(tradeFinIdx).orElseThrow())
            .user(userRepository.findById(userIdx).orElseThrow())
            .build());

    tf.setHeartCount(tf.getHeartCount()+1);
  }

  @Transactional
  public void deleteHeart(Long tradeFinIdx, Long userIdx) throws BaseException {
    TradeFin tf = tradeFinRepository.findById(tradeFinIdx).orElseThrow();

    if(heartRepository.findByTradeFinIdxAndUserIdx(tradeFinIdx, userIdx)==0) {
      throw new BaseException(BaseResponseStatus.REQUEST_ERROR);
    }

    heartRepository.deleteHeart(tradeFinIdx, userIdx);

    tf.setHeartCount(tf.getHeartCount()-1);
  }


  @Transactional
  public void tradeComplete(TradeCompleteDto tcd) {

    TradeDetail tradeDetail = tradeDetailRepository.findById(tcd.getTradeDetailIdx()).get();
    TradeRequest tradeRequest =  tradeRequestRepository.findById(  tradeDetail.getTradeRequest().getTradeRequestIdx()).get();

    Long itemIdxA = tcd.getItemIdx()[0];
    Long itemIdxB = tcd.getItemIdx()[1];

    Item a = itemRepository.findById(itemIdxA).get();
    Item b = itemRepository.findById(itemIdxB).get();

    tradeRequest.setTradeRequestState(2);
    tradeDetail.setTradeState(2);
    a.setTradeItemIdx(b.getItemIdx());
    b.setTradeItemIdx(a.getItemIdx());

    TradeFin tradeFin = new TradeFin();
    tradeFin.setReceiveItemIdx(tcd.getItemIdx()[0]);
    tradeFin.setRequestItemIdx(tcd.getItemIdx()[1]);
    tradeFin.setReceiveNickname(tcd.getUserNickname()[0]);
    tradeFin.setRequestNickname(tcd.getUserNickname()[1]);
    tradeFin.setReceiveUserIdx(tcd.getUserIdx()[0]);
    tradeFin.setRequestUserIdx(tcd.getUserIdx()[1]);
    tradeFin.setReceiveProfileImgUrl(tcd.getUserImg()[0]);
    tradeFin.setRequestProfileImgUrl(tcd.getUserImg()[1]);

    tradeFinRepository.save(tradeFin);
  }
}
