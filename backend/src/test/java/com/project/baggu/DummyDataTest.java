package com.project.baggu;

import com.project.baggu.domain.Category;
import com.project.baggu.domain.Item;
import com.project.baggu.domain.TradeRequest;
import com.project.baggu.domain.User;
import com.project.baggu.domain.enumType.CategoryType;
import com.project.baggu.domain.enumType.Role;
import com.project.baggu.dto.UserSignUpDto;
import com.project.baggu.repository.ItemRepository;
import com.project.baggu.repository.UserRepository;
import com.project.baggu.sample.user.SampleUserService;
import com.project.baggu.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.project.baggu.domain.enumType.CategoryType.TYPE0;
import static com.project.baggu.domain.enumType.CategoryType.TYPE1;
import static org.junit.jupiter.api.Assertions.assertEquals;

@Transactional
@SpringBootTest
@Slf4j
class DummyDataTest {

  @Autowired
  SampleUserService sampleUserService;

  @Autowired
  UserService userService;

  @Autowired
  UserRepository userRepository;

  @Autowired
  ItemRepository itemRepository;

  @BeforeEach
  public void beforeEach() {
    log.info("============beforeEach===========");
  }

  @AfterEach
  public void afterEach() {
    log.info("============afterEach===========");
  }

  @Test
  @DisplayName("dummy users")
  @Rollback(false)
  @Order(1)
  public void saveUser() throws Exception {

    String name = "test";
    String email = "@test.com";
    String nickname = "nickname";
    String info = "hello I'm test";
    String kakaoId = "kakao";
    String si = "서울시";
    String gu = "강남구";
    String dong = "역삼동";
    String lng= "37.5666";
    String lat = "126.9784";

    for(int i=1; i<11; i++){
      User testU = User.builder()
                    .name(name+i)
                    .email(name+i+email)
                    .nickname(nickname+i)
                    .info(info+i)
                    .kakaoId(kakaoId+i)
                    .si(si)
                    .gu(gu)
                    .dong(dong)
                    .lng(lng)
                    .lat(lat)
                    .role(Role.TYPE1)
                    .profileImg("https://i.pinimg.com/236x/6f/f0/83/6ff083374ce2118f4ea1c35a4593a070.jpg")
                    .build();

      userRepository.save(testU);
    }
  }

  @Test
  @DisplayName("dummy users")
  @Rollback(false)
  @Order(2)
  public void saveItem() throws Exception {

    String content = "물건";
    String si = "서울시";
    String gu = "강남구";
    String dong = "역삼동";
    String title = "번 교환구해요";

    for(long i=1; i<11; i++){
      User u = userRepository.findById(i).orElseThrow();

      for(int j=1; j<4; j++){
        int ran =(int)(Math.random()*13+1);

        Item testI = Item.builder()
                .content(content+i+j)
                .si(si)
                .gu(gu)
                .dong(dong)
                .title(i+j+title)
                .user(u)
                .category(CategoryType.valueOf("TYPE"+ran))
                .firstImg("https://i1.sndcdn.com/avatars-IsvhjlUsarXgDHFQ-dSTRxw-t240x240.jpg")
                .build();

        itemRepository.save(testI);
      }
    }
  }

}