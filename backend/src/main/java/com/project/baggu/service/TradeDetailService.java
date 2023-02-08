package com.project.baggu.service;

import com.project.baggu.domain.Item;
import com.project.baggu.domain.TradeDetail;
import com.project.baggu.domain.TradeRequest;
import com.project.baggu.domain.User;
import com.project.baggu.dto.ChatRoomDto;
import com.project.baggu.repository.ItemRepository;
import com.project.baggu.repository.TradeDetailRepository;
import com.project.baggu.repository.TradeRequestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class TradeDetailService {

  private final ItemRepository itemRepository;
  private final TradeDetailRepository tradeDetailRepository;

  @Transactional
  public ChatRoomDto tradeRequestSelect(Long tradeDetailIdx) {

    TradeDetail tradeDetail = tradeDetailRepository.findById(tradeDetailIdx).get();
    TradeRequest tradeRequest = tradeDetail.getTradeRequest();
    Item item1 = itemRepository.findById(tradeDetail.getRequestItemIdx()).get();
    Item item2 = itemRepository.findById(tradeRequest.getReceiveItemIdx().getItemIdx()).get();
    tradeDetail.setTradeState(1);
    tradeRequest.setTradeRequestState(1);
    item1.setState(1);
    item1.setTradeItemIdx(item2.getItemIdx());
    item2.setState(1);
    item2.setTradeItemIdx(item1.getItemIdx());

    ChatRoomDto chatRoomDto = new ChatRoomDto();
    User user1 = item1.getUser();
    User user2 = item2.getUser();

    Long[] userIdx = new Long[2];
    String[] nickname = new String[2];
    String[] userImg = new String[2];
    String[] itemImg = new String[2];
    Long[] itemIdx = new Long[2];

    userIdx[0] = user1.getUserIdx();
    userIdx[1] = user2.getUserIdx();

    nickname[0] = user1.getNickname();
    nickname[1] = user2.getNickname();

    userImg[0] = user1.getProfileImg();
    userImg[1] = user2.getProfileImg();

    itemImg[0] = item1.getFirstImg();
    itemImg[1] = item2.getFirstImg();

    itemIdx[0] = item1.getItemIdx();
    itemIdx[1] = item2.getItemIdx();

    chatRoomDto.setUserIdx(userIdx);
    chatRoomDto.setNickname(nickname);
    chatRoomDto.setUserImg(userImg);
    chatRoomDto.setItemImg(itemImg);
    chatRoomDto.setItemIdx(itemIdx);
    chatRoomDto.setTradeDetailIdx(tradeDetailIdx);

    return chatRoomDto;

  }

  @Transactional
  public void tradeDetailDelete(Long tradeDetailIdx) {

    TradeDetail tradeDetail = tradeDetailRepository.findById(tradeDetailIdx).get();
    tradeDetail.setValid(false);
  }
}
