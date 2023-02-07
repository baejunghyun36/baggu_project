package com.project.baggu.Security;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.baggu.domain.User;
import com.project.baggu.dto.UserUpdateDetailDto;
import com.project.baggu.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
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
public class SampleSecurityTest{

  @Autowired
  private MockMvc mockMvc;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  ObjectMapper objectMapper;

  @Test
  @DisplayName("인증 테스트")
  @WithMockCustomTokenAccount(userIdx = "1")
  public void getItemTest() throws Exception{
    mockMvc.perform(get("/baggu/item/1"))
        .andDo(print())
        .andExpect(status().isOk());
  }

  @Test
  @DisplayName("인가 테스트")
  @WithMockCustomTokenAccount(userIdx="1")
  public void putUserTest() throws Exception{
    User testU = User.builder()
            .info("before test")
            .nickname("test nickname")
            .dong("test dong")
            .email("test email")
            .build();

    userRepository.save(testU);

    UserUpdateDetailDto uudd = UserUpdateDetailDto.builder()
            .info("after test").build();

    Long testUIdx = testU.getUserIdx();

    mockMvc.perform(put("/baggu/user/"+testUIdx+"/detail")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objToJson(uudd)))
            .andExpect(status().isUnauthorized())
            .andReturn();

  }

  private <T> String objToJson(T data) throws JsonProcessingException {
    return objectMapper.writeValueAsString(data);
  }

}
