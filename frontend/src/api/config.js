const requests = {
  base_url: 'http://70.12.247.158:8080',

  // 개발 테스트용 토큰 발급
  TEST_TOKEN: '/baggu/auth/token/dev',

  // 카카오로 시작하기 (GET)
  CHECK_IS_SIGNED(code, state) {
    return `/auth/login?code=${code}&state=${state}`;
  },

  // 유저 회원가입 (POST)
  SIGNUP: `/baggu/user`,

  // 유저 정보 가져오기 (GET)
  GET_USER(userIdx) {
    return `/baggu/user/${userIdx}`;
  },

  // 동네의 최근 등록된 물품 목록 (GET)
  GET_MAIN_ITEM(dong) {
    return `/baggu/item?dong=${dong}`;
  },

  // 최근 성사된 바꾸 목록 (GET)
  GET_MAIN_TRADE: `/baggu/tradeFin`,

  //피드 좋아요 (POST), 피드 좋아요 취소 (DELETE)
  FEED_LIKE(tradeFinIdx) {
    return `/baggu/tradeFin/${tradeFinIdx}/like`;
  },

  // 유저의 모든 아이템 (GET)
  GET_USER_ITEM(userIdx) {
    return `/baggu/item?userIdx=${userIdx}`;
  },

  // 유저가 보낸 바꾸신청 (GET)
  GET_MY_REQUEST(userIdx) {
    return `/baggu/tradeRequest?userIdx=${userIdx}`;
  },

  // 바꾸신청 취소 (DELETE)
  DELETE_MY_REQUEST(tradeRequestIdx) {
    return `/baggu/tradeRequest/${tradeRequestIdx}`;
  },

  // 바꾸신청 승낙 (GET)
  CHOOSE_REQUEST(tradeDetailIdx) {
    return `/baggu/tradeDetail/${tradeDetailIdx}`;
  },

  // 특정 바꾸신청 하나 삭제 (DELETE)
  DELETE_REQUEST(tradeDetailIdx) {
    return `/baggu/tradeDetail/{tradeDetailIdx}`;
  },

  // 유저의 채팅방 목록

  // 채팅 상세 정보

  // 유저의 바꾸 내역 (GET)
  GET_USER_TRADE(userIdx) {
    return `/baggu/tradeFin?userIdx=${userIdx}`;
  },

  // 유저 동네 설정 (PUT)
  PUT_USER_TOWN(userIdx) {
    return `/baggu/user/${userIdx}/location`;
  },

  // 게시글 작성 (POST)
  POST_ITEM: `/baggu/item/`,

  // 게시글 상세 (GET)
  // 게시글 수정 (PUT)
  // 게시글 삭제 (DELETE)
  ITEM(itemIdx) {
    return `/baggu/item/${itemIdx}`;
  },

  // 유저 상세 중 등록 아이템 (GET)
  GET_USER_DETAIL(userIdx) {
    return `/baggu/user/${userIdx}/item`;
  },

  // 유저 프로필 수정 (PUT)
  PUT_USER_DETAIL: `/baggu/user/`,

  // 바꾸 신청 삭제 (DELETE)
  DELETE_REQUEST(tradeRequestIdx) {
    return `/baggu/tradeRequest/${tradeRequestIdx}`;
  },

  // 유저 상세 중 거래후기 (GET)
  GET_REVIEWS(userIdx) {
    return `/baggu/user/${userIdx}/review`;
  },

  // 교환신청 (POST)
  POST_REQUEST(itemIdx) {
    return `/baggu/item/${itemIdx}`;
  },

  // 검색어 기반 아이템 리스트 (GET)
  GET_SEARCH_RESULT(keyword) {
    return `/baggu/item?keyword=${keyword}`;
  },

  // 거래 완료 후 유저에 대한 후기 작성 (POST)
  POST_USER_REVIEW: `/baggu/tradeFin/reviewTag`,

  // 거래 완료 후 거래에 대한 후기 작성 (POST)
  POST_TRADE_REVIEW: `/baggu/tradeFin/reviewText`,
};

export default requests;
