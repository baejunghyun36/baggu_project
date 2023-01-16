package com.project.baggu.sample;

import static org.junit.jupiter.api.Assertions.*;
import com.project.baggu.domain.Item;
import com.project.baggu.sample.item.SampleItemRepository;
import com.project.baggu.sample.item.SampleItemService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
@Slf4j
class SampleItemServiceTest {

  @Autowired
  SampleItemRepository sampleItemRepository;

  @Autowired
  SampleItemService sampleItemService;

  @BeforeEach
  public void beforeEach(){
    log.info("============beforeEach===========");
  }

  @AfterEach
  public void afterEach(){
    log.info("============afterEach===========");
  }


  @Test
  @DisplayName("아이템 저장 테스트")
  //롤백 처리 하기 싫으면 @Rollback(false) 설정.
  @Rollback(false)
  public void saveUserTest() throws Exception{
    //given
    Item item = new Item();
    item.setTitle("에어팟");
    //when
    log.info("{}", item.getItemIdx());
    sampleItemService.save(item);
    log.info("{}", item.getItemIdx());
    //then
    //assertEquals(user, userPersistRepository.findOne(saveId));
    assertEquals("에어팟", item.getTitle(), sampleItemRepository.findOne(item.getItemIdx()).getTitle());
    //Assertions.assertThat(user.getUserName()).isEqualTo(user.getUserName());
  }

  @Test
  @DisplayName("아이템 교환 신청 테스트")
  @Rollback(false)
  public void requestItemTest () throws Exception{
    //given

    //when

    //then
  }



  @Test
  @Rollback(false)
  public void saveNotifyTest() throws Exception{
    //given

    //when

    //then
  }


}