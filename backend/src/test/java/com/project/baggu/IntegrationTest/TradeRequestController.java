package com.project.baggu.IntegrationTest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.baggu.Security.WithMockCustomTokenAccount;
import com.project.baggu.repository.TradeRequestRepository;
import com.project.baggu.service.TradeRequestService;
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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;


@SpringBootTest
@Slf4j
@AutoConfigureMockMvc
@Transactional
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TradeRequestController {

  @Autowired
  private MockMvc mockMvc;
  @Autowired
  ObjectMapper objectMapper;
  @Autowired
  TradeRequestRepository tradeRequestRepository;

  @Test
  @DisplayName("거래 요청 조회")
  @WithMockCustomTokenAccount(userIdx = "1")
  @Order(1)
  public void getTradeRequest() throws Exception{
    MultiValueMap<String, String> info = new LinkedMultiValueMap<>();
    info.add("userIdx", "1");
    mockMvc.perform(get("/baggu/tradeRequest")
        .params(info)).andDo(print())
        .andExpect(status().isOk());
  }
  @Test
  @DisplayName("거래 요청 삭제")
  @WithMockCustomTokenAccount(userIdx = "1")
  @Order(2)
  public void deleteTradeRequest () throws Exception{
    mockMvc.perform(delete("/baggu/tradeRequest/1"))
        .andDo(print())
        .andExpect(status().isOk());

    Assertions.assertThat(tradeRequestRepository.findById(1L).get().isValid())
        .isEqualTo(false);

  }
}
