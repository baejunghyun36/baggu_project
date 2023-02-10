package com.project.baggu.service;

import com.project.baggu.domain.Item;
import com.project.baggu.domain.ItemImage;
import com.project.baggu.domain.ReviewText;
import com.project.baggu.domain.TradeDetail;
import com.project.baggu.domain.TradeRequest;
import com.project.baggu.domain.User;
import com.project.baggu.domain.enumType.TradeState;
import com.project.baggu.exception.BaseResponseStatus;
import com.project.baggu.dto.ItemDetailDto;
import com.project.baggu.dto.ItemOrderByNeighborDto;
import com.project.baggu.dto.ItemListDto;
import com.project.baggu.dto.TradeRequestDto;
import com.project.baggu.dto.TradeRequestNotifyDto;
import com.project.baggu.dto.UpdateItemDto;
import com.project.baggu.dto.UpdateItemResponseDto;
import com.project.baggu.dto.UserDto;
import com.project.baggu.dto.UserItemDto;
import com.project.baggu.dto.UserRegistItemDto;
import com.project.baggu.exception.BaseException;
import com.project.baggu.repository.ItemImageRepository;
import com.project.baggu.repository.ItemKeepRepository;
import com.project.baggu.repository.ItemRepository;
import com.project.baggu.repository.ReviewTextRepository;
import com.project.baggu.repository.TradeDetailRepository;
import com.project.baggu.repository.TradeFinRepository;
import com.project.baggu.repository.TradeRequestRepository;
import com.project.baggu.repository.UserRepository;
import org.springframework.data.domain.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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

  private final S3UploadService s3UploadService;

  private final ItemImageRepository itemImageRepository;

  private final String IMAGE_DIR_ITEM = "item";

  public List<ItemOrderByNeighborDto> itemListOrderByNeighbor(String dong, int page) {

    List <Item> itemList = itemRepository.itemListOrderByNeighbor(dong, PageRequest.of(page,20,
        Sort.by(Direction.DESC, "createdAt")));
    List<ItemOrderByNeighborDto> ItemDtoList = new ArrayList<>();
    for(Item i : itemList){
      ItemOrderByNeighborDto itemDto = new ItemOrderByNeighborDto();
      itemDto.setItemIdx(i.getItemIdx());
      itemDto.setTitle(i.getTitle());
      itemDto.setCreatedAt(i.getCreatedAt());
      itemDto.setState(i.getState());
      itemDto.setItemImgUrl(i.getFirstImg());
      itemDto.setDong(i.getDong());
      ItemDtoList.add(itemDto);
    }
    return ItemDtoList;
  }

  public List<UserItemDto> getUserItemList(Long userIdx, int page) {

    List <Item> itemList = itemRepository.getUserItemList(userIdx, PageRequest.of(page, 20, Sort.by(
        Direction.DESC, "createdAt")));
    List<UserItemDto> userItemDtoList = new ArrayList<>();
    for(Item i : itemList){
      UserItemDto itemDto = new UserItemDto();
      itemDto.setItemIdx(i.getItemIdx());
      itemDto.setTitle(i.getTitle());
      itemDto.setDong(i.getDong());
      itemDto.setCreatedAt(i.getCreatedAt());
      itemDto.setTradeState(i.getState());
      itemDto.setItemImgUrl(i.getFirstImg());
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
  public UpdateItemResponseDto updateItem(Long itemIdx, UpdateItemDto updateItemDto) {

    Item item = itemRepository.findById(itemIdx).orElseThrow(()->new BaseException(BaseResponseStatus.DATABASE_GET_ERROR));
    item.setTitle(updateItemDto.getTitle());
    item.setCategory(updateItemDto.getCategory());
    item.setContent(updateItemDto.getContent());

    //업로드 이미지들에 대해서 요청을 수행한다.
    //그 전에 이미 저장된 이미지들을 삭제한다.
    item.getItemImages().forEach((itemImage)->{
      itemImageRepository.delete(itemImage);
    });

    item.setItemImages(new ArrayList<>());

    //현재 저장된 이미지 리스트를 갱신하는데, 이 때 대표 이미지는 따로 저장해줘야한다.
    int tempImageOrder = 0;
    List<String> uploadImageUrls = updateItemDto.getUploadImgUrls();
    for(int i=0; i<uploadImageUrls.size(); i++){
      //해당 이미지가 대표 이미지라면
      if(i==updateItemDto.getItemFirstImgIdx()){
        item.setFirstImg(uploadImageUrls.get(i));
        continue;
      }

      //해당 이미지가 대표 이미지가 아니라면 순서에 맞게 저장해준다.
      ItemImage itemImage = ItemImage.builder()
              .itemImg(uploadImageUrls.get(i))
              .imgOrder(tempImageOrder++)
              .item(item)
              .build();

      item.getItemImages().add(itemImage);
      itemImageRepository.save(itemImage);
    }

    itemRepository.save(item);

    return new UpdateItemResponseDto(item.getCategory().ordinal(), item.getTitle(), item.getContent(), item.getFirstImg(),item.getItemImageUrls());
  }

  @Transactional
  public void registItem(UserRegistItemDto u) throws Exception {

    User user = userRepository.findById(u.getUserIdx()).get();

    //아이템 생성
    Item item = new Item();
    item.setSi(user.getSi());
    item.setGu(user.getGu());
    item.setDong(user.getDong());
    item.setTitle(u.getTitle());
    item.setContent(u.getContent());
    item.setCategory(u.getCategory());
    item.setUser(user);
    itemRepository.save(item);

    //이미지 존재시 이미지 저장 -> 순서대로
    if(u.getItemImgs()!=null&&u.getItemImgs().size()>0){
      ArrayList<String> uploadUrls = s3UploadService.upload(u.getItemImgs(), IMAGE_DIR_ITEM);

      int tempImageOrder = 0;
      for(int i=0; i<uploadUrls.size(); i++){
        if(i==u.getItemFirstImgIdx()){
          item.setFirstImg(uploadUrls.get(i));
          continue;
        }

        ItemImage itemImage = ItemImage.builder()
                .imgOrder(tempImageOrder++)
                .itemImg(uploadUrls.get(i))
                .item(item)
                .build();

        itemImage.setItem(item);

        itemImageRepository.save(itemImage);
      }
    }

    itemRepository.save(item);
  }

  public ItemDetailDto itemDetail(Long itemIdx) {

    ItemDetailDto idd = new ItemDetailDto();
    Item item = itemRepository.findById(itemIdx).get();
    idd.setUserIdx(item.getUser().getUserIdx());
    idd.setNickname(item.getUser().getNickname());
    idd.setInfo(item.getUser().getInfo());
    idd.setProfileImgUrl(item.getUser().getProfileImg());

    idd.setTitle(item.getTitle());
    idd.setCategory(item.getCategory().ordinal());
    idd.setDong(item.getDong());
    idd.setCreatedAt(item.getCreatedAt());
    idd.setModifiedAt(item.getModifiedAt());
    idd.setContent(item.getContent());
    idd.setTradeState(item.getState());
    idd.setItemImgUrl(item.getFirstImg());

    List<TradeRequest> trList = tradeRequestRepository.findByItemIdx(itemIdx);

    for(TradeRequest tr : trList){

      List<TradeDetail> tradeDetailList = tradeDetailRepository.findByTradeRequestIdx(tr.getTradeRequestIdx());
      UserDto userDto = new UserDto();
      userDto.setUserIdx(tr.getRequestUser().getUserIdx());
      userDto.setNickname(tr.getRequestUser().getNickname());
      userDto.setComment(tr.getComment());
      userDto.setProfileImgUrl(tr.getRequestUser().getProfileImg());
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
      itemListDto.setItemImgUrl(i.getFirstImg());
      list.add(itemListDto);
    }
    return list;
  }


  @Transactional
  public TradeRequestNotifyDto tradeRequest(Long itemIdx, TradeRequestDto tradeRequestDto){

    Item item = itemRepository.findByIdLock(itemIdx);
    String nickname = item.getUser().getNickname();
    if (item.getUserRequestCount() >= 10) return null;
    item.setUserRequestCount(item.getUserRequestCount()+1);
    itemRepository.save(item);

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
    user.setTradeCount(user.getTradeCount()+1);
    TradeRequestNotifyDto tn = new TradeRequestNotifyDto();
    tn.setReceiveUserIdx(item.getUser().getUserIdx());
    tn.setType(0);
    tn.setTypeIdx(itemIdx);
    tn.setRequestUserNickName(nickname);
    return tn;
  }

  public Long getUserIdxByItemIdx(Long itemIdx){
    return itemRepository.findById(itemIdx).orElseThrow(()-> new BaseException(
            BaseResponseStatus.DATABASE_GET_ERROR)).getUser().getUserIdx();
  }
}
