package com.project.baggu.UnitTest;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.baggu.domain.enumType.Role;
import com.project.baggu.utils.JwtTokenUtils;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/*
테스트 내용
1. 헤더가 없는 요청에 대해 401 에러
2. 헤더가 존재하지만 인가 거절시 401 에러
3. 헤더가 존재하고 인가 승인시 200 승인
 */


@SpringBootTest
@Slf4j
@AutoConfigureMockMvc
@Transactional
public class SecurityTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  ObjectMapper objectMapper;

  @Test
  @DisplayName("토큰 없는 요청에 대해 401 에러")
  public void authenticateFailTest() throws Exception{

    mockMvc.perform(get("/baggu/item/1"))
        .andExpect(status().isUnauthorized());
  }

  @Test
  @DisplayName("헤더가 존재하지만 인가 거절시 500 에러")
  public void authorizationFailTest() throws Exception{
    String accessToken = JwtTokenUtils.allocateToken(2L, Role.TYPE1.getKey()).getAccessToken();

    //테스트
    mockMvc.perform(put("/baggu/user/1/detail")
              .param("info","this is test info")
              .header("Authorization", accessToken))
            .andExpect(status().isInternalServerError());
  }

  @Test
  @DisplayName("헤더가 존재하고 인가 승인시 200 승인")
  public void authorizationSuccessTest() throws Exception{
    String accessToken = JwtTokenUtils.allocateToken(1L, Role.TYPE1.getKey()).getAccessToken();

    //테스트
    mockMvc.perform(put("/baggu/user/1/detail")
              .param("info","this is test info")
              .header("Authorization", accessToken))
        .andExpect(status().isOk());
  }


}
