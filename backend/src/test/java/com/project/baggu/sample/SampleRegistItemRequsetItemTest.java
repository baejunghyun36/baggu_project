package com.project.baggu.sample;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.project.baggu.domain.Item;
import com.project.baggu.domain.TradeRequest;
import com.project.baggu.domain.User;
import com.project.baggu.domain.enumType.TradeState;
import com.project.baggu.sample.item.SampleItemService;
import com.project.baggu.sample.tradeRequest.SampleTradeRequestService;
import com.project.baggu.sample.user.SampleUserService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Slf4j
@Transactional
@DisplayName("가입 -> 아이템 등록 -> 교환 신청")
@TestMethodOrder(OrderAnnotation.class)
public class SampleRegistItemRequsetItemTest {

  @Autowired
  SampleUserService sampleUserService;
  @Autowired
  SampleItemService sampleItemService;
  @Autowired
  SampleTradeRequestService sampleTradeRequestService;

  static User user;
  static Item item;
  static Item receiveItem;
  static User receiveUser;

  @BeforeAll
  @DisplayName("회원 가입")
  @Rollback(false)
  static void BeforeAll() {

    log.info("============BeforeAll===========");

  }

  @Test
  @Order(1)
  @DisplayName("회원 가입")
  @Rollback(false)
  void registUser(){
    //given
    user = new User();
    user.setName("배정현");
    user.setNickname("코딩왕");
    user.setInfo("안녕하세요. 배정현입니다.");
    receiveUser = new User();
    receiveUser.setInfo("받는 사람이에요");
    receiveUser.setName("최교수");
    //when
    sampleUserService.save(user);
    sampleUserService.save(receiveUser);
    //then
  }


  @Test
  @Order(2)
  @DisplayName("현재 유저가 아이템 등록")
  @Rollback(false)
  void registItem() {

    //given
    log.info("start 1");
    item = new Item();
    item.setTitle("에어팟");
    item.setContent("버즈랑 바꾸고 싶어요.");
    item.setUser(user);

    //when
    sampleItemService.registItem(item);

    //then
    assertEquals(sampleItemService.findOne(item.getItemIdx()).getTitle(), item.getTitle());
  }

  @Test
  @Order(3)
  @DisplayName("신청할 아이템 세팅")
  @Rollback(false)
  public void requestedItemSetting() throws Exception{
    //given
    log.info("start 2");
    receiveItem = new Item();

    receiveItem.setTitle("버즈");
    receiveItem.setContent("에어팟이랑 바꾸고 싶어요.");
    receiveItem.setUser(receiveUser);
    //when

    sampleItemService.registItem(receiveItem);
    //then
    assertEquals(sampleItemService.findOne(receiveItem.getItemIdx()).getTitle(), receiveItem.getTitle());
  }


  @Test
  @Order(4)
  @DisplayName("현재 유저가 아이템 교환 신청")
  @Rollback(false)
  public void requestItem() throws Exception{
    //given
    log.info("start 3");
    TradeRequest request = new TradeRequest();
    request.setComment("저 에어팟인데 버즈랑 바꾸고 싶어요.");
    request.setReceiveItemIdx(receiveItem);
    log.info("receiveItem : {} ", receiveItem.getItemIdx());
    request.setRequestUserIdx(user);
    request.setTradeRequestState(TradeState.TYPE0.ordinal());
    //when
    sampleTradeRequestService.regist(request);

    //then
    assertEquals(sampleTradeRequestService.findOne(request.getTradeRequestIdx()).getComment(), request.getComment());

  }





  @AfterAll
  static void AfterAll() {

    log.info("============afterEach===========");
  }
}
