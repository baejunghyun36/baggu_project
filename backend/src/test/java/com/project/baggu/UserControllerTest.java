//package com.project.baggu;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.project.baggu.Security.WithMockCustomTokenAccount;
//import com.project.baggu.domain.User;
//import com.project.baggu.domain.enumType.CategoryType;
//import com.project.baggu.domain.enumType.Role;
//import com.project.baggu.dto.UserProfileDto;
//import com.project.baggu.dto.UserSignUpDto;
//import com.project.baggu.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.MethodOrderer;
//import org.junit.jupiter.api.Order;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.TestMethodOrder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//
///*
//시나리오
//1. 가입 안한 유저에 대해 회원가입 진행 -> 헤더 authorization, 쿠키 refresh-token 존재 여부 확인
//2. 사용자 정보 가져오는것 -> Mock으로 repository로 요청 가는지 정도만
//3. 유저 정보 수정 test유저 save해놓고 location 바꾸기 & detail 바꾸기
//    -> s3의 경우 롤백 안되니까 delete 메소드로 사진 삭제까지
//4.
// */
//
//@SpringBootTest
//@Slf4j
//@AutoConfigureMockMvc
//@Transactional
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//public class UserControllerTest {
//    @Autowired
//  private UserRepository userRepository;
//
//    @Autowired
//  private  MockMvc mockMvc;
//
//    @Autowired
//  private ObjectMapper objectMapper;
//
////  @BeforeAll
//
//
//  @Test
//  @DisplayName("1. 아직 가입이 되지 않은 유저라면 회원가입을 진행한다.")
//  @Order(1)
//  public void signup () throws Exception{
//
//      User kakaoUser = User.builder()
//              .nickname("testNickname")
//              .kakaoId("testKakao")
//              .email("testEmail@test.com")
//              .role(Role.TYPE3)
//              .build();
//
//      userRepository.save(
//            kakaoUser);
//
//      UserSignUpDto usd = UserSignUpDto.builder()
//              .email(kakaoUser.getEmail())
//              .category(new ArrayList<>(Arrays.asList(new CategoryType[] {CategoryType.TYPE1, CategoryType.TYPE2})))
//              .si("서울시")
//              .gu("강남구")
//              .dong("역삼동")
//              .lng("127")
//              .lat("37")
//              .kakaoId(kakaoUser.getKakaoId()).build();
//
//    mockMvc.perform(post("/baggu/user")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(usd)))
//            .andDo(print()).andExpectAll(header().exists("Authorization"),
//                    cookie().exists("refresh-token"),
//                    status().isOk());
//
//  }
//}
//
////
////package com.project.baggu.test;
////
////
//
////
////@SpringBootTest
////@Slf4j
////@AutoConfigureMockMvc
////@Transactional
////@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
////public class ItemControllerTest {
////
////  @Mock
////  private Item item;
////  @Mock
////  private User user;
////  @Mock
////  private UserRegistItemDto userRegistItemDto;
////  @Mock
////  private ItemImage itemImage;
////  @Mock
////  private TradeRequestDto tradeRequestDto;
////  @Mock
////  private UpdateItemDto updateItemDto;
////  @Autowired
////  private MockMvc mockMvc;
////
////  @Autowired
////  ObjectMapper objectMapper;
////  @Autowired
////  ItemRepository itemRepository;
////
////  int initSize = 0;
////
////  @Test
////  @DisplayName("현재 아이템 리스트 목록과 데이터 수를 체크한다 (dong)")
////  @WithMockCustomTokenAccount(userIdx = "1")
////  @Order(1)
////  public void itemList () throws Exception{
////
////    MultiValueMap<String, String> info = new LinkedMultiValueMap<>();
////    info.add("dong", "당산동");
////    mockMvc.perform(get("/baggu/item").params(info)).andDo(print()).andExpect(status().isOk());
////  }
////
////  @Test
////  @DisplayName("1. 아이템 등록")
////  @WithMockCustomTokenAccount(userIdx = "1")
////  @Order(2)
////  public void saveItem() throws Exception {
////
////    List<MultipartFile> list = new ArrayList<>();
////    UserRegistItemDto data = new UserRegistItemDto();
////    mockMvc.perform(post("/baggu/item")
////                .param("userIdx", "1")
////                .param("category", "TYPE0")
////                .param("itemFirstImgIdx", "0")
////                .param("content", "교환하자")
////                .param("title", "에어팟")
////            //  .header("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4IjoxLCJyb2xlIjoiVFlQRTUiLCJpYXQiOjE2NzU3NDA0MjgsImV4cCI6MTY3ODMzMjQyOH0.R5SW4a-MDv4CwHM1EBWJ1IfYi97cl6pzlqDsFjjcmSI")
////        )
////        .andDo(print())
////        .andExpect(status().isOk());
////  }
////  @Test
////  @DisplayName("아이템 상세 테스트")
////  @WithMockCustomTokenAccount(userIdx = "1")
////  @Order(3)
////  public void itemDetail () throws Exception{
////
////    mockMvc.perform(get("/baggu/item/1")
////        ) .andDo(print())
////        .andExpect(status().isOk())
////        .andReturn()
////        .getResponse();
////  }
////
////  @Test
////  @DisplayName("트레이드 요청")
////  @WithMockCustomTokenAccount(userIdx = "1")
////  @Order(4)
////  public void tradeRequest() throws Exception{
////
////    mockMvc.perform(post("/baggu/item/1")
////            //.header("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4IjoxLCJyb2xlIjoiVFlQRTUiLCJpYXQiOjE2NzU3NDA0MjgsImV4cCI6MTY3ODMzMjQyOH0.R5SW4a-MDv4CwHM1EBWJ1IfYi97cl6pzlqDsFjjcmSI")
////            .contentType(MediaType.APPLICATION_JSON)
////            .content(objectMapper.writeValueAsString(tradeRequestDto))
////        ) .andDo(print())
////        .andExpect(status().isOk());
////  }
////
////  @Test
////  @DisplayName("아이템 업데이트")
////  @WithMockCustomTokenAccount(userIdx = "1")
////  @Order(5)
////  public void update() throws Exception{
////
////    mockMvc.perform(put("/baggu/item/1")
////            //.header("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4IjoxLCJyb2xlIjoiVFlQRTUiLCJpYXQiOjE2NzU3NDA0MjgsImV4cCI6MTY3ODMzMjQyOH0.R5SW4a-MDv4CwHM1EBWJ1IfYi97cl6pzlqDsFjjcmSI")
////            .contentType(MediaType.APPLICATION_JSON)
////            .content(objectMapper.writeValueAsString(updateItemDto))
////        ) .andDo(print())
////        .andExpect(status().isOk());
////
////    Assertions.assertThat("변경").isEqualTo(itemRepository.findById(1L).get().getTitle());
////  }
////
////  @Test
////  @DisplayName("아이템 삭제")
////  @WithMockCustomTokenAccount(userIdx = "1")
////  @Order(6)
////  public void deleteItem() throws Exception{
////
////    mockMvc.perform(delete("/baggu/item/1"))
////        .andDo(print())
////        .andExpect(status().isOk());
////
////    Assertions.assertThat(false).isEqualTo(itemRepository.findById(1L).get().isValid());
////  }
////
////  @BeforeEach
////  @DisplayName("BeforeEach")
////  public void beforeEach() {
////
////    user = User.builder().userIdx(1L).build();
////
////    item = Item.builder()
////        .title("에어팟").content("교환하자").itemImages(new ArrayList<>()).itemKeeps(new ArrayList<>())
////        .dong("당산동").firstImg("img").category(CategoryType.TYPE1).si("시")
////        .dong("동").gu("구").itemIdx(1L).build();
////
////    userRegistItemDto = UserRegistItemDto.builder()
////        .content("안녕").title("에어팟").userIdx(1L).category(CategoryType.TYPE1).itemImgs(new ArrayList<>()).build();
////
////    ArrayList <Long> list = new ArrayList();
////    list.add(2L);
////    list.add(3L);
////    tradeRequestDto = TradeRequestDto.builder()
////        .comment("안녕").requestItemIdxList(list)
////        .requestUserIdx(2L).build();
////
////    ArrayList <String> list2 = new ArrayList<>();
////    updateItemDto = UpdateItemDto.builder()
////        .category(CategoryType.TYPE1)
////        .content("변경")
////        .itemFirstImgIdx(0)
////        .title("변경")
////        .uploadImgUrls(list2)
////        .build();
////
////  }
////
////  @AfterEach
////  @DisplayName("테스트 종료")
////  public void afterEach() {
////    log.info("테스트 종료");
////  }
////}