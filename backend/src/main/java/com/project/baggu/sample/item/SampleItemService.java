package com.project.baggu.sample.item;

import com.project.baggu.domain.Item;
import com.project.baggu.domain.User;
import com.project.baggu.dto.SampleItemDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SampleItemService {

  private final SampleItemRepository sampleItemRepository;

  @Transactional
  public void save(Item item){

    User user = new User();

    sampleItemRepository.save(item);
  }

  @Transactional
  public void update(Long itemIdx, SampleItemDto sampleItemDto) {

    Item item = sampleItemRepository.findOne(itemIdx);
    item.setTitle(sampleItemDto.getTitle());
    item.setContent(sampleItemDto.getContent());
  }

  public Item findOne(Long itemIdx){

    return sampleItemRepository.findOne(itemIdx);
  }

  public List<Item> findItems() {

    return sampleItemRepository.findAll();
  }

  public List<Item> findItemList(Long userIdx) {

    return sampleItemRepository.findItemList(userIdx);
  }

  public void registItem(Item item) {
    sampleItemRepository.regist(item);
  }
}
