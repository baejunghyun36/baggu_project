package com.project.baggu;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.baggu.Security.WithMockCustomTokenAccount;
import com.project.baggu.domain.User;
import com.project.baggu.domain.enumType.CategoryType;
import com.project.baggu.domain.enumType.Role;
import com.project.baggu.dto.UserProfileDto;
import com.project.baggu.dto.UserSignUpDto;
import com.project.baggu.repository.UserRepository;
import com.project.baggu.service.JwtTokenService;
import com.project.baggu.service.S3UploadService;
import java.io.InputStream;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;

@SpringBootTest
@Slf4j
@AutoConfigureMockMvc
@Transactional
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserControllerTest {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private JwtTokenService jwtTokenService;
  @Autowired
  private S3UploadService s3UploadService;

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @BeforeEach
  void init(TestInfo info) {
    if (info.getDisplayName().equals("signup")) {
      return;
    }

    //기본 유저를 생성해 저장한다.
    userRepository.save(
        User.builder()
            .email("testEmail@test.com")
            .name("testName")
            .si("testSi")
            .gu("testGu")
            .dong("testDong")
            .lat("37")
            .lng("127")
            .role(Role.TYPE1)
            .kakaoId("testKakaoId")
            .build());
  }


  @Test
  @DisplayName("signup")
  @Order(1)
  public void signup() throws Exception {

    User kakaoUser = User.builder()
        .nickname("testNickname")
        .kakaoId("testKakao")
        .email("testEmail@test.com")
        .role(Role.TYPE3)
        .build();

    userRepository.save(kakaoUser);

    UserSignUpDto usd = UserSignUpDto.builder()
        .email(kakaoUser.getEmail())
        .category(new ArrayList<>(
            Arrays.asList(new CategoryType[]{CategoryType.TYPE1, CategoryType.TYPE2})))
        .si("서울시")
        .gu("강남구")
        .dong("역삼동")
        .lng("127")
        .lat("37")
        .kakaoId(kakaoUser.getKakaoId()).build();

    mockMvc.perform(post("/baggu/user")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(usd)))
        .andExpect(status().isOk())
        .andExpect(header().exists("Authorization"))
        .andExpect(jsonPath("role").value("TYPE1"));

    //refresh 토큰 삭제
    jwtTokenService.deleteRefreshToken(kakaoUser.getUserIdx().toString());
  }


  @Test
  @DisplayName("modifyUserDetail")
  @Order(2)
  @WithMockCustomTokenAccount(userIdx = "1")
  public void modifyUserDetail() throws Exception {

    InputStream input = getClass().getResourceAsStream("/profileImg.png");
    MockMultipartFile testProfileImg = new MockMultipartFile("profileImg", "profileImg.png", "png", input);

    MockMultipartHttpServletRequestBuilder builder =
        MockMvcRequestBuilders.multipart("/baggu/user/1/detail");
    builder.with(new RequestPostProcessor() {
      @Override
      public MockHttpServletRequest postProcessRequest(MockHttpServletRequest request) {
        request.setMethod("PUT");
        return request;
      }
    });

    //테스트
    mockMvc.perform(builder
            .file(testProfileImg)
            .param("info","testInfo")
            .param("nickname", "testNickname")
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .accept(MediaType.ALL))
        .andDo(print())
        .andExpect(status().isOk());

    MvcResult result = mockMvc.perform(get("/baggu/user/1"))
        .andExpect(jsonPath("nickname").value("testNickname"))
        .andReturn();

    String responseJson = result.getResponse().getContentAsString();
    ObjectMapper objectMapper = new ObjectMapper();

    //이미지 삭제해주기
    s3UploadService.delete(objectMapper.readValue(responseJson, UserProfileDto.class).getProfileImgUrl());
  }

}