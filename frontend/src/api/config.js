export const API = {
  // 카카오로 시작하기 : /auth/login?code={code}&state={state}
  KAKAO: `/auth/login?`,

  // 유저 회원가입 (method : POST)
  SIGNUP: `/baggu/user`,

  // 유저 정보 가져오기 : /baggu/user/{useridx}
  GET_USER: `/baggu/user/`,

  // 동네의 최근 등록된 물품 목록 : /baggu/item?dong={dong}
  GET_MAIN_ITEM: `/baggu/item?`,

  // 최근 성사된 바꾸 목록
  GET_MAIN_TRADE: `/baggu/tradeFin`,

  //피드 좋아요 : /baggu/tradeFin/{tradeFinIdx}/like (method: POST)
  //피드 좋아요 취소 : /baggu/tradeFin/{tradeFinIdx}/like (method: DELETE)
  FEED_LIKE: `/baggu/tradeFin/`,

  // 유저의 모든 아이템 : /baggu/item?userIdx={userIdx}
  GET_USER_ITEM: `/baggu/item?`,

  // 유저가 보낸 바꾸신청 : /baggu/tradeRequest?userIdx={userIdx}
  GET_MY_REQUEST: `/baggu/tradeRequest?`,

  // 바꾸신청 취소 : /baggu/tradeRequest/{tradeRequestIdx} (method: DELETE)
  DELETE_MY_REQUEST: `/baggu/tradeRequest/`,

  // 바꾸신청 승낙 : /baggu/tradeDetail/{tradeDetailIdx}
  CHOOSE_REQUEST: `/baggu/tradeDetail/`,

  // 특정 바꾸신청 하나 삭제 : /baggu/tradeDetail/{tradeDetailIdx}
  DELETE_REQUEST: `/baggu/tradeDetail/`,

  // 유저의 채팅방 목록

  // 채팅 상세 정보

  // 유저의 바꾸 내역 : /baggu/tradeFin?userIdx={userIdx}
  GET_USER_TRADE: `/baggu/tradeFin?`,

  // 유저 동네 설정 : /baggu/user/{userIdx}/location
  PUT_USER_TOWN: `/baggu/user/`,

  // 게시글 작성 : /baggu/item (method : POST)
  // 게시글 상세 : /baggu/item/{itemIdx} (method : GET)
  // 게시글 수정 : /baggu/item/{itemIdx} (method : PUT)
  // 게시글  삭제 : /baggu/item/{itemIdx} (method : DELETE)
  ITEM: `/baggu/item/`,

  // 유저 상세 중 등록 아이템 : /baggu/user/{userIdx}/item
  GET_USER_DETAIL: `/baggu/user/`,

  // 유저 프로필 수정 : /baggu/user/{userIdx}/detail
  PUT_USER_DETAIL: `/baggu/user/`,

  // 바꾸 신청 삭제 : /baggu/tradeRequest/{tradeRequestIdx}
  DELETE_REQUEST: `/baggu/`,

  // 유저 상세 중 거래후기 : /baggu/user/{userIdx}/review
  GET_REVIEWS: `/baggu/`,

  // 교환신청 : /baggu/item/{itemIdx}
  POST_REQUEST: `/baggu/`,

  // 검색어 기반 아이템 리스트 : /baggu/item?keyword={keyword}
  GET_SEARCH_RESULT: `/baggu/`,

  // 거래 완료 후 유저에 대한 후기 작성
  POST_USER_REVIEW: `/baggu/tradeFin/reviewTag`,

  // 거래 완료 후 거래에 대한 후기 작성
  POST_TRADE_REVIEW: `/baggu/tradeFin/reviewText`,

  // 유저의 관심목록 : /baggu/user/{userIdx}/keep
  GET_USER_KEEP: `/baggu/user/{userIdx}/keep`,
};
