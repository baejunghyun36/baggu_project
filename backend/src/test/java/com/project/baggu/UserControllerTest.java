//package com.project.baggu;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//import com.project.baggu.Security.WithMockCustomTokenAccount;
//import com.project.baggu.domain.User;
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
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//
///*
//시나리오
//1. 특정 유저가 카카오 로그인을 완료한다.
//  1) 해당 유저가 이미 가입이 완료된 유저라면 토큰을 발급한다.
//    -> 해당 토큰으로 getUser 해보기
//  2) 해당 유저가 가입이 완료되지 않은 유저라면 회원가입 절차를 시작하도록 값을 반환한다.
//2. 유저가 회원가입을 완료한다.
//  -> 토큰이 발급되면 해당 토큰의 유효성을 판단
//3. 유저가
// */
//
//@SpringBootTest
//@Slf4j
//@AutoConfigureMockMvc
//@Transactional
//@RequiredArgsConstructor
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//public class UserControllerTest {
//
//  private final UserRepository userRepository;
//
//
//
//  @BeforeAll
//
//
//  @Test
//  @DisplayName("회원가입 후 유효한 토큰이 발급되는지 검사한다.")
//  @WithMockCustomTokenAccount(userIdx = "1")
//  @Order(1)
//  public void signup () throws Exception{
//
//    userRepository.save()
//    User testUser = User.builder()
//        .nickname("")
//        .kakaoId(kakaoUser.getKakaoId())
//        .email(kakaoUser.getEmail())
//        .role(isUserHasEmail(kakaoUser)? Role.TYPE3 : Role.TYPE4)
//        .build();
//
//    UserSignUpDto usd = UserSignUpDto.builder()
//            .email()
//
//
//        UserProfileDto.builder()
//        .ema
//        .build()
//
//
//    MultiValueMap<String, String> info = new LinkedMultiValueMap<>();
//    info.add("dong", "당산동");
//    mockMvc.perform(get("/baggu/item").params(info)).andDo(print()).andExpect(status().isOk());
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