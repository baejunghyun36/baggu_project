package com.project.baggu.sample;

import static com.project.baggu.domain.enumType.CategoryType.TYPE0;
import static org.junit.jupiter.api.Assertions.*;
import com.project.baggu.domain.Category;
import com.project.baggu.domain.Item;
import com.project.baggu.domain.User;
import com.project.baggu.sample.user.SampleUserService;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
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
class SampleUserServiceTest {

  @Autowired
  SampleUserService sampleUserService;

  @BeforeEach
  public void beforeEach() {
    log.info("============beforeEach===========");
  }

  @AfterEach
  public void afterEach() {
    log.info("============afterEach===========");
  }

  @Test
  @DisplayName("사용자 가입")
  @Rollback(false)
  public void saveUser() throws Exception {

    //given
    User user = new User();
    user.setName("최교수");

    //when
    sampleUserService.save(user);

    //then
    assertEquals(sampleUserService.find(user.getUserIdx()).getName(), user.getName());

  }

  @Test
  public void NullPointException() {
    Assertions.assertThrows(NullPointerException.class, () -> {
      List<String> list = null;
      list.get(0);
    });
  }

  @Test
  @DisplayName("사용자 예외 처리")
  public void saveUserException() throws Exception {

    //given
    User user = new User();
    user.setName("최교수");
    user.setTradeCount(10);

    Item item = new Item();
    item.setTitle("에어팟");

    //when
    Assertions.assertThrows(IllegalStateException.class, () -> {
      sampleUserService.requestTradeRequest(user, item);
    });

    //then
  }


  @Test
  @DisplayName("카테고리 테스트")
  public void saveUserCategory() throws Exception {

    //given
    User findUser = sampleUserService.find(8L);
    Category category = new Category();
    category.setType(TYPE0);
    category.setUser(findUser);

    //when
    sampleUserService.saveCategory(category);
    sampleUserService.findCategory(category.getCategoryIdx());

    //then
    List<Category> list = findUser.getCategories();

    for (Category c : list) {
      log.info("{} {}", c.getCategoryIdx(), c.getType());
    }

    assertEquals(TYPE0, findUser.getCategories().get(0).getType());
  }

  @Test
  @DisplayName("카테고리 조인 테스트")
  @Rollback(false)
  public void savedUserCategroyJoinTest() {
    //given

    //when
    List<Category> list = sampleUserService.getListCategoryWithJoin();

    //then
    for (Category c : list) {
      log.info("{} {} {} {}", c.getUser().getUserIdx(), c.getType().ordinal(),
          c.getUser().getName());
    }
  }

  @Test
  @DisplayName("사용자 정보 수정")
  @Rollback(false)
  public void updateUserInfo(){

    //given
    Long idx = 1L;
    String changeName = "변경이름";
    //when
    sampleUserService.updateUser(idx, changeName);
    //then
    assertEquals(changeName, sampleUserService.find(idx).getName());
  }


}