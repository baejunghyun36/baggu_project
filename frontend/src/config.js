const BASE_URL = 'http://baggu.shop:3000';

export const API = {
  // 카카오로 시작하기 : /auth/login?code={code}&state={state}
  KAKAO: `${BASE_URL}/auth/login?`,

  // 유저 회원가입
  SIGNUP: `${BASE_URL}/baggu/user`,

  // 유저 정보 가져오기 : /baggu/user/{useridx}
  GETUSER: `${BASE_URL}/baggu/user/`,

  // 동네의 최근 등록된 물품 목록 : /baggu/item?dong={dong}
  GETITEM: `${BASE_URL}/baggu/item?`,

  // 최근 성사된 바꾸 목록
  GETTRADE: `${BASE_URL}/baggu/tradeFin`,

  //피드 좋아요 : /baggu/tradeFin/{tradeFinIdx}/like (method: POST)
  //피드 좋아요 취소 : /baggu/tradeFin/{tradeFinIdx}/like (method: DELETE)
  FEEDLIKE: `${BASE_URL}/baggu/tradeFin/`,

  // 유저의 모든 아이템 : /baggu/item?userIdx={userIdx}
  GETUSERITEM: `${BASE_URL}/baggu/item?`,

  // 유저가 보낸 바꾸신청 : /baggu/tradeRequest?userIdx={userIdx}
  GETREQUEST: `${BASE_URL}/baggu/tradeRequest?`,

  // 바꾸신청 취소 : /baggu/tradeRequest/{tradeRequestIdx} (method: DELETE)
  DELETEREQUEST: `${BASE_URL}/baggu/tradeRequest/`,

  // 바꾸신청 승낙 : /baggu/tradeDetail/{tradeDetailIdx}
  CHOOSEREQUEST: `${BASE_URL}/baggu/tradeDetail/`,

  // 특정 바꾸신청 하나 삭제

  // 유저의 채팅방 목록

  // 채팅 상세 정보

  // 유저의 바꾸 내역
  GETUSERTRADE: `${BASE_URL}/baggu/`,

  // 유저 동네 설정 : /baggu/user/{userIdx}/location
  PUTUSERDONG: `${BASE_URL}/baggu/user/`,

  // 게시글 작성 : /baggu/item (method : POST)
  // 게시글 상세 : /baggu/item/{itemIdx} (method : GET)
  // 게시글 수정 : /baggu/item/{itemIdx} (method : PUT)
  // 게시글  삭제 : /baggu/item/{itemIdx} (method : DELETE)
  ITEM: `${BASE_URL}/baggu/item/`,

  // 유저 상세 중 등록 아이템 : /baggu/user/{userIdx}/item
  USERDETAILITEM: `${BASE_URL}/baggu/user/`,

  // 유저 프로필 수정 : /baggu/user/{userIdx}/detail
  PUTUSERDETAIL: `${BASE_URL}/baggu/user/`,

  TRADEREQUEST: `${BASE_URL}/baggu/`,
  TRADEREQUEST: `${BASE_URL}/baggu/`,
};
