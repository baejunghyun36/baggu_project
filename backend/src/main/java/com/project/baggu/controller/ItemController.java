package com.project.baggu.controller;

import com.project.baggu.dto.*;
import com.project.baggu.exception.BaseException;
import com.project.baggu.exception.BaseResponseStatus;
import com.project.baggu.raceCondition.Message;
import com.project.baggu.raceCondition.OptimisticLockRaceConditionFacade;
import com.project.baggu.repository.ItemRepository;
import com.project.baggu.service.ItemService;
import com.project.baggu.service.S3UploadService;
import com.project.baggu.service.TradeRequestService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/baggu/item")
@Slf4j
public class ItemController {

  private final ItemRepository itemRepository;

  private final ItemService itemService;
  private final TradeRequestService tradeRequestService;
  private final S3UploadService s3UploadService;
  private final String IMAGE_DIR_USER = "item";
  private final OptimisticLockRaceConditionFacade optimisticLockRaceConditionFacade;


  //GET baggu/item/{itemIdx}
  //아이템의 상세 정보(아이템 정보, 신청자 정보)를 받는다.
  @GetMapping("/{itemIdx}")
  public ItemDetailDto itemDetail (@PathVariable("itemIdx") Long itemIdx){

    return  itemService.itemDetail(itemIdx);
  }

  //POST baggu/item
  //새로운 아이템을 작성한다.
  @PostMapping
  public ItemRegistDto registItem(@ModelAttribute UserRegistItemDto u) throws Exception {

    Long authUserIdx = Long.parseLong(
        SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
    if (authUserIdx != u.getUserIdx()) {
      throw new BaseException(BaseResponseStatus.UNVALID_USER);
    }
    ItemRegistDto result = new ItemRegistDto();

    try{

      result.setItemIdx(itemService.registItem(u));
      result.setSuccess(true);

      return result;
    } catch(Exception e){
      result.setSuccess(false);
      return result;
    }

  }

  //PUT /baggu/item/{itemIdx}
  //게시글 정보를 갱신한다.
  @PutMapping("/{itemIdx}")
  public UpdateItemResponseDto updateItem(@PathVariable("itemIdx") Long itemIdx,
      @RequestBody UpdateItemDto updateItemDto){

    Long itemWriter = itemService.getUserIdxByItemIdx(itemIdx);
    Long authUserIdx = Long.parseLong(
        SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
    if(itemWriter==null || itemWriter!=authUserIdx ){
      throw new BaseException(BaseResponseStatus.UNVALID_USER);
    }
    return itemService.updateItem(itemIdx, updateItemDto);
  }

  //DELETE /baggu/item/{itemIdx}
  //게시글을 삭제한다.
  @DeleteMapping("/{itemIdx}")
  public void deleteItem(@PathVariable("itemIdx") Long itemIdx){

    itemService.deleteItem(itemIdx);
  }


  //POST baggu/item/{itemIdx}
  //유저가 신청메세지와 함께 바꾸신청을 보낸다.
  @PostMapping("/{itemIdx}")
  public ResponseEntity<Message> tradeRequest(@PathVariable("itemIdx") Long itemIdx, @RequestBody TradeRequestDto tradeRequestDto){

    TradeRequestNotifyDto tradeRequestNotifyDto = null;
    Message message = new Message();
    try{
      tradeRequestNotifyDto = optimisticLockRaceConditionFacade.tradeRequest(itemIdx, tradeRequestDto);
      if(tradeRequestNotifyDto==null){
        return new ResponseEntity<>(message, HttpStatus.OK);
      }
      else{
        message.setMessage("Success");
        message.setData(tradeRequestNotifyDto);
        return new ResponseEntity<>(message, HttpStatus.OK);
      }
    }
    catch (Exception e){
      message.setMessage("서버 오류");
      return new ResponseEntity<>(message, HttpStatus.OK);
    }
  }


  //GET baggu/item?dong={dong}&userIdx={userIdx}&keyword={keyword}
  //유저의 동네에 최근 등록된 물품 리스트를 받는다.
  //유저가 등록한 아이템 리스트를 받는다.
  //유저가 입력한 검색어를 기반으로 아이템 리스트를 받는다. pathvariable로 하면 한글 안넘어와
  //페이지가 있을 경우
  @GetMapping()
  public List<?> getItemList(@RequestParam(name = "dong", required = false) String dong,
      @RequestParam(name="userIdx", required=false) Long userIdx,
      @RequestParam(name="keyword", required=false) String keyword,
      @RequestParam(name="page", required=false) Integer page){

    if(page==null){
      page = 0;
    }

    if(dong!=null){
      return itemService.itemListOrderByNeighbor(dong,page);
    } else if(userIdx!=null){
      return itemService.getUserItemList(userIdx, page);
    } else if(keyword!=null){
      return itemService.itemListByItemName(keyword);
    } else{
      throw new BaseException(BaseResponseStatus.UNVALID_PARAMETER);
    }
  }

  @PostMapping("/images")
  public UploadImagesDto uploadImages(@RequestParam("itemImges") List<MultipartFile> itemImages)
      throws Exception {

    return new UploadImagesDto(s3UploadService.upload(itemImages, IMAGE_DIR_USER));
  }

//
//  @GetMapping(params = {"userIdx"})
//  public List<UserItemDto> userItemList (@RequestParam(name = "userIdx") Long userIdx){
//
//
//  }
//
//  @GetMapping(params = {"keyword"})
//  public List<ItemListDto> itemListByItemName(@RequestParam(name = "keyword") String keyword){
//
//
//  }
//
//
//



}
