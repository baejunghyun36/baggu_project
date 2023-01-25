package com.project.baggu.controller;

import com.project.baggu.dto.ItemDetailDto;
import com.project.baggu.dto.ItemOrderByNeighborDto;
import com.project.baggu.dto.ItemListDto;
import com.project.baggu.dto.UpdateItemDto;
import com.project.baggu.dto.UpdatedItemDto;
import com.project.baggu.dto.UserItemDto;
import com.project.baggu.dto.UserRegistItemDto;
import com.project.baggu.service.ItemService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/baggu/item")
@Slf4j
public class ItemController {

  private final ItemService itemService;

  //유저의 관심목록을 받는다.
  @GetMapping("/keep/{userIdx}")
  public List<ItemListDto> userKeepItemList(@PathVariable("userIdx") Long userIdx){

    return itemService.userKeepItemList(userIdx);
  }

  //유저가 입력한 검색어를 기반으로 아이템 리스트를 받는다. pathvariable로 하면 한글 안넘어와
  @GetMapping
  public List<ItemListDto> itemListByItemName(@RequestParam String itemName){

    return itemService.itemListByItemName(itemName);
  }

  //아이템의 상세 정보(아이템 정보, 신청자 정보)를 받는다. 진행 중..
  @GetMapping("/{itemIdx}")
  public ItemDetailDto itemDetail (@PathVariable("itemIdx") Long itemIdx){

    return  itemService.itemDetail(itemIdx);
  }

  //새로운 게시글을 작성한다.
  @PostMapping("/regist")
  public void registItem(@RequestBody UserRegistItemDto u){

    itemService.registItem(u);
  }

  //게시글을 수정한다.
  @PutMapping("/{itemIdx}")
  public UpdateItemDto updateItem(@PathVariable("itemIdx") Long itemIdx, @RequestBody UpdatedItemDto item){

    itemService.updateItem(itemIdx, item);
    return new UpdateItemDto(item.getTitle(), item.getContent());
  }

  //게시글을 삭제한다.
  @DeleteMapping("/{itemIdx}")
  public void deleteItem(@PathVariable("itemIdx") Long itemIdx){

    itemService.deleteItem(itemIdx);
  }

  //유저의 동네에 최근 등록된 물품 리스트를 받는다.
  @GetMapping("/list/{dong}")
  public List<ItemOrderByNeighborDto> itemListOrderByNeighbor(@PathVariable("dong") String dong){

    return itemService.itemListOrderByNeighbor(dong);
  }

  //유저가 등록한 아이템 리스트를 받는다.
  @GetMapping("/userItem/{userIdx}")
  public List<UserItemDto> userItemList (@PathVariable("userIdx") Long userIdx){

    return itemService.userItemList(userIdx);
  }
}
