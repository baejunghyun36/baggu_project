package com.project.baggu.IntegrationTest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.baggu.Security.WithMockCustomTokenAccount;
import com.project.baggu.dto.ItemListDto;
import com.project.baggu.dto.ItemTitleDto;
import com.project.baggu.dto.ScrollResponseDto;
import com.project.baggu.repository.ItemDocumentRepository;
import com.project.baggu.repository.ItemRepository;
import com.project.baggu.service.ItemService;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;


@SpringBootTest
@Slf4j
@AutoConfigureMockMvc
@Transactional
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ElasticTest {

  @Autowired
  private MockMvc mockMvc;
  @Autowired
  ObjectMapper objectMapper;
  @Autowired
  ItemService itemService;
  @Autowired
  ItemRepository itemRepository;
  @Autowired
  ItemDocumentRepository itemDocumentRepository;

  static int currentElasticDatasize;
  static int currentItemListSize;
  static String title = "에어팟 버즈";
  static String subTitle = "에어";

  @Test
  @DisplayName("서비스 :: 현재 엘라스틱 데이터 개수 세팅 테스트")
  @Order(0)
  void elasticDataSizeTest(){
    //현재 subtitle로 검색했을 때 엘라스틱에 저장된 데이터의 개수 초기화
    ScrollResponseDto<ItemListDto> data = itemService.getItemListByItemtitle(subTitle, 0);
    currentElasticDatasize = data.getItems().size();
  }

  @Test
  @DisplayName("컨트롤러 :: 아이템 저장 테스트")
  @WithMockCustomTokenAccount(userIdx = "1")
  @Order(1)
  @Rollback(false)
  void saveItem_ElasticDataAndSizeCheck() throws Exception {
    //현재 아이템의 개수
    currentItemListSize = itemRepository.findAll().size();

    mockMvc.perform(post("/baggu/item")
            .param("userIdx", "1")
            .param("category", "TYPE0")
            .param("itemFirstImgIdx", "0")
            .param("content", "교환하자")
            .param("title", title)
    )
    .andDo(print())
    .andExpect(status().isOk());
    //"아이템 버즈" 데이터 저장 시 사이즈 +1 체크 -> 테스트 성공 시 정상적으로 아이템 저장됨
    Assertions.assertThat(itemRepository.findAll().size()).isEqualTo(currentItemListSize + 1);
  }

  @Test
  @DisplayName("서비스 :: 엘라스틱 데이터 조회 테스트")
  @WithMockCustomTokenAccount(userIdx = "1")
  @Order(2)
  void ElasticDataAndSizeCheck() throws Exception {
    //이전 테스트에서 "아이템 버즈" 데이터가 저장되면 동시에 엘라스틱 데이터도 하나 추가됨을 체크한다.
    //currentElasticDatasize+1을 기댓값으로 가진다.
    ScrollResponseDto<ItemListDto> data = itemService.getItemListByItemtitle(subTitle, 0);
    currentElasticDatasize++;
    Assertions.assertThat(data.getItems().size()).isEqualTo(currentElasticDatasize);
  }

  @Test
  @DisplayName("서비스 :: 엘라스틱 데이터에 존재하지 않는 단어 검색 테스트")
  @WithMockCustomTokenAccount(userIdx = "1")
  @Order(3)
  void ElasticWrongDataCheck() throws Exception {
    //엘라스틱 데이터에 존재하지않는 데이터 조회
    ScrollResponseDto<ItemListDto> data = itemService.getItemListByItemtitle("notExistTitle", 0);
    Assertions.assertThat(data.getItems().size()).isEqualTo(0);
  }

  @Test
  @DisplayName("컨트롤러 :: 엘라스틱 데이터 조회 테스트")
  @WithMockCustomTokenAccount(userIdx = "1")
  @Order(4)
  void findElasticDataByKeyword() throws Exception {

    //엘라스틱 서비스 restAPI로 처리 되는지 확인하는 테스트.
    ItemTitleDto itemTitleDto = new ItemTitleDto();
    itemTitleDto.setTitle(subTitle);

    mockMvc.perform(post("/baggu/item/keyword")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(itemTitleDto))
        )
        .andDo(print())
        .andExpect(status().isOk());
  }

  @Test
  @DisplayName("엘라스틱 초기화")
  @Order(5)
  void initElastic(){
    itemDocumentRepository.deleteAll();
  }

}