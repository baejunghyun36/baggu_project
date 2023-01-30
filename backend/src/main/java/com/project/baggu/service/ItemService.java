package com.project.baggu.service;

import com.project.baggu.domain.Item;
import com.project.baggu.domain.ItemKeep;
import com.project.baggu.domain.ReviewText;
import com.project.baggu.domain.TradeDetail;
import com.project.baggu.domain.TradeRequest;
import com.project.baggu.domain.User;
import com.project.baggu.domain.enumType.TradeState;
import com.project.baggu.dto.ItemDetailDto;
import com.project.baggu.dto.ItemOrderByNeighborDto;
import com.project.baggu.dto.ItemListDto;
import com.project.baggu.dto.TradeRequestDto;
import com.project.baggu.dto.UpdateItemDto;
import com.project.baggu.dto.UpdatedItemDto;
import com.project.baggu.dto.UserDto;
import com.project.baggu.dto.UserItemDto;
import com.project.baggu.dto.UserRegistItemDto;
import com.project.baggu.repository.ItemKeepRepository;
import com.project.baggu.repository.ItemRepository;
import com.project.baggu.repository.ReviewTextRepository;
import com.project.baggu.repository.TradeDetailRepository;
import com.project.baggu.repository.TradeFinRepository;
import com.project.baggu.repository.TradeRequestRepository;
import com.project.baggu.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ItemService {

  private final ReviewTextRepository reviewTextRepository;

  private final ItemRepository itemRepository;
  private final UserRepository userRepository;
  private final TradeRequestRepository tradeRequestRepository;
  private final TradeDetailRepository tradeDetailRepository;
  private final TradeFinRepository tradeFinRepository;
  private final ItemKeepRepository itemKeepRepository;

  public List<ItemOrderByNeighborDto> itemListOrderByNeighbor(String dong) {

    List <Item> itemList = itemRepository.itemListOrderByNeighbor(dong);
    List<ItemOrderByNeighborDto> ItemDtoList = new ArrayList<>();
    for(Item i : itemList){
      ItemOrderByNeighborDto itemDto = new ItemOrderByNeighborDto();
      itemDto.setItemIdx(i.getItemIdx());
      itemDto.setTitle(i.getTitle());
      itemDto.setCreatedAt(i.getCreatedAt());
      itemDto.setState(i.getState());
      ItemDtoList.add(itemDto);
    }
    return ItemDtoList;
  }

  public List<UserItemDto> userItemList(Long userIdx) {

    List <Item> itemList = itemRepository.userItemList(userIdx);
    List<UserItemDto> userItemDtoList = new ArrayList<>();
    for(Item i : itemList){
      UserItemDto itemDto = new UserItemDto();
      itemDto.setItemIdx(i.getItemIdx());
      itemDto.setTitle(i.getTitle());
      itemDto.setDong(i.getDong());
      itemDto.setCreatedAt(i.getCreatedAt());
      itemDto.setTradeState(i.getState());
      if(i.getState() == TradeState.TYPE2.ordinal()){
        Optional<ReviewText> check = reviewTextRepository.findByTradeItemIdx(i.getTradeItemIdx());
        if(check.isEmpty()) itemDto.setReviewState(true);
      }
      userItemDtoList.add(itemDto);
    }
    return userItemDtoList;
  }

  @Transactional
  public void deleteItem(Long itemIdx) {

    itemRepository.deleteItem(itemIdx);
    itemKeepRepository.deleteItem(itemIdx);
    List<TradeRequest> list = tradeRequestRepository.findAllReceiveItem(itemIdx);
    for (TradeRequest tr : list) {
      tradeDetailRepository.deleteTradeDetail(tr.getTradeRequestIdx());
      tradeRequestRepository.deleteTradeRequest(tr.getTradeRequestIdx());
    }
  }

  @Transactional
  public UpdateItemDto updateItem(Long itemIdx, UpdatedItemDto item) {

    Item i = itemRepository.findById(itemIdx).get();
    i.setTitle(item.getTitle());
    i.setCategory(item.getCategory());
    i.setContent(item.getContent());
    return new UpdateItemDto(i.getCategory().ordinal(), i.getTitle(), i.getContent());
  }

  @Transactional
  public void registItem(UserRegistItemDto u) {

    User user = userRepository.findById(u.getUserIdx()).get();
    Item item = new Item();
    item.setSi(user.getSi());
    item.setGu(user.getGu());
    item.setDong(user.getDong());
    item.setTitle(u.getTitle());
    item.setContent(u.getContent());
    item.setCategory(u.getCategory());
    item.setUser(user);
    itemRepository.save(item);
  }

  public ItemDetailDto itemDetail(Long itemIdx) {

    ItemDetailDto idd = new ItemDetailDto();
    Item item = itemRepository.findById(itemIdx).get();
    idd.setUserIdx(item.getUser().getUserIdx());
    idd.setNickname(item.getUser().getNickname());
    idd.setInfo(item.getUser().getInfo());
    idd.setTitle(item.getTitle());
    idd.setCategory(item.getCategory().ordinal());
    idd.setDong(item.getDong());
    idd.setCreatedAt(item.getCreatedAt());
    idd.setModifiedAt(item.getModifiedAt());
    idd.setContent(item.getContent());
    idd.setTradeState(item.getState());

    List<TradeRequest> trList = tradeRequestRepository.findByItemIdx(itemIdx);

    for(TradeRequest tr : trList){

      List<TradeDetail> tradeDetailList = tradeDetailRepository.findByTradeRequestIdx(tr.getTradeRequestIdx());
      UserDto userDto = new UserDto();
      userDto.setUserIdx(tr.getRequestUser().getUserIdx());
      userDto.setNickname(tr.getRequestUser().getNickname());
      userDto.setComment(tr.getComment());
      for (TradeDetail td : tradeDetailList) {
        userDto.getRequestItemIdxList().add(td.getRequestItemIdx());
        userDto.getTradeDetailIdxList().add(td.getTradeDetailIdx());
      }
      idd.getRequestUserList().add(userDto);
    }
    return idd;
  }

  public List<ItemListDto> itemListByItemName(String itemName) {

    List<Item> itemList =  itemRepository.itemListByItemName(itemName);
    List<ItemListDto> list = new ArrayList<>();
    for(Item i : itemList){
      ItemListDto itemListDto = new ItemListDto();
      itemListDto.setDong(i.getDong());
      itemListDto.setState(i.getState());
      itemListDto.setCreatedAt(i.getCreatedAt());
      itemListDto.setTitle(i.getTitle());
      list.add(itemListDto);
    }
    return list;
  }

  @Transactional
  public void tradeRequest(Long itemIdx, TradeRequestDto tradeRequestDto) {

    TradeRequest tradeRequest = new TradeRequest();
    tradeRequest.setRequestUser(userRepository.findById(tradeRequestDto.getRequestUserIdx()).get());
    tradeRequest.setReceiveItemIdx(itemRepository.findById(itemIdx).get());
    tradeRequest.setComment(tradeRequestDto.getComment());
    tradeRequestRepository.save(tradeRequest);
    for(Long i : tradeRequestDto.getRequestItemIdxList()){
      TradeDetail tradeDetail = new TradeDetail();
      tradeDetail.setRequestItemIdx(i);
      tradeDetail.setTradeRequest(tradeRequest);
      tradeDetailRepository.save(tradeDetail);
    }
    User user = userRepository.findById(tradeRequestDto.getRequestUserIdx()).get();
    Item item = itemRepository.findById(itemIdx).get();
    user.setTradeCount(user.getTradeCount()+1);
    item.setUserRequestCount(item.getUserRequestCount()+1);
  }
}
