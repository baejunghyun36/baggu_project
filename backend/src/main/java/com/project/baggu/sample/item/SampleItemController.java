package com.project.baggu.sample.item;

import com.project.baggu.domain.Item;
import com.project.baggu.dto.SampleItemDto;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sampleItem")
@RequiredArgsConstructor
public class SampleItemController {

  private final SampleItemService sampleItemService;

  //Get Method
  @GetMapping("/getMappingTest")
  public String getMappingTest() {

    return "getMappingTest";
  }

  //Post Method Parameter Mapping
  @PostMapping("/postMappingParameterTest")
  public String postMappingTest(String title, String content) {

    return "postMappingParameterTest";
  }

  //Post Method Object Mapping
  @PostMapping("/postMappingObjectTest")
  public SampleItemDto postMappingObjectTest(@RequestBody SampleItemDto sampleItemDto) {

    return sampleItemDto;
  }

  //Post Method Object Mapping (Path id)
  @PutMapping("/putMappingObjectTest/{itemIdx}")
  public Item postMappingObjectTest(@PathVariable("itemIdx") Long itemIdx,
      @RequestBody SampleItemDto sampleItemDto) {

    sampleItemService.update(itemIdx, sampleItemDto);
    Item findItem = sampleItemService.findOne(itemIdx);

    return findItem;
  }

  //GetMapping itemList version1
  @GetMapping("/getMappingItemList/v1")
  public List getMappingItemListV1(){

    List<Item> findItems = sampleItemService.findItems();
    List<SampleItemDto> list = new ArrayList<>();
    for (Item i : findItems) {
      SampleItemDto sampleItemDto = new SampleItemDto(i.getTitle(), i.getContent());
      list.add(sampleItemDto);
    }
    return list;
  }

  //GetMapping itemList version2
  @GetMapping("/getMappingItemList/v2")
  public Result getMappingItemListV2(){

    List<Item> findItems = sampleItemService.findItems();
    List<SampleItemDto> collect = findItems.stream()
        .map(i -> new SampleItemDto(i.getTitle(), i.getContent()))
        .collect(Collectors.toList());

    return new Result(collect);
  }

  @Data
  @AllArgsConstructor
  static class Result<T> {
    private T data;
  }

}
