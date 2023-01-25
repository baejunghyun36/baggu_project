package com.project.baggu.service;

import com.project.baggu.domain.Item;
import com.project.baggu.domain.TradeDetail;
import com.project.baggu.domain.TradeRequest;
import com.project.baggu.dto.ItemListDto;
import com.project.baggu.dto.TradeDeleteDto;
import com.project.baggu.dto.TradeRequestDto;
import com.project.baggu.repository.ItemRepository;
import com.project.baggu.repository.TradeDetailRepository;
import com.project.baggu.repository.TradeRequestRepository;
import com.project.baggu.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TradeRequestService {

  private final ItemRepository itemRepository;
  private final TradeRequestRepository tradeRequestRepository;
  private final TradeDetailRepository tradeDetailRepository;
  private final UserRepository userRepository;

  @Transactional
  public void tradeDelete(TradeDeleteDto tradeDeleteDto) {

    Long tradeRequestIdx = tradeRequestRepository.findIdxByUserIdx(tradeDeleteDto.getRequestUserIdx(), tradeDeleteDto.getItemIdx());
    tradeDetailRepository.deleteTradeRequest(tradeRequestIdx);
    tradeRequestRepository.deleteTradeRequest(tradeRequestIdx);
  }

  public List<ItemListDto> requestItemList(Long userIdx) {


    List<Item> items = tradeRequestRepository.findItemByUserIdx(userIdx);
    List<ItemListDto> userItemDtoList = new ArrayList<>();
    for(Item i : items){
      ItemListDto userItemDto = new ItemListDto();
      userItemDto.setTitle(i.getTitle());
      userItemDto.setDong(i.getDong());
      userItemDto.setCreatedAt(i.getCreatedAt());
      userItemDto.setState(i.getState());
      userItemDtoList.add(userItemDto);
    }
    return userItemDtoList;
  }

  @Transactional
  public void tradeRequest(TradeRequestDto tradeRequestDto) {

    TradeRequest tradeRequest = new TradeRequest();
    tradeRequest.setRequestUser(userRepository.findById(tradeRequestDto.getRequestUserIdx()).get());
    tradeRequest.setReceiveItemIdx(itemRepository.findById(tradeRequestDto.getReceiveItemIdx()).get());
    tradeRequest.setComment(tradeRequestDto.getComment());
    tradeRequestRepository.save(tradeRequest);
    for(Long itemIdx : tradeRequestDto.getRequestItemIdxList()){
      TradeDetail tradeDetail = new TradeDetail();
      tradeDetail.setRequestItemIdx(itemIdx);
      tradeDetail.setTradeRequest(tradeRequest);
      tradeDetailRepository.save(tradeDetail);
    }
  }

  @Transactional
  public void tradeRequestSelect(Long tradeDetailIdx) {

    tradeDetailRepository.updateTypeOne(tradeDetailIdx);
    Long tradeRequestIdx = tradeDetailRepository.findById(tradeDetailIdx).get().getTradeRequest().getTradeRequestIdx();
    log.info("{}", tradeRequestIdx);
    tradeRequestRepository.updateTypeOne(tradeRequestIdx);
  }
}
