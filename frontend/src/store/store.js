import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// 유저 정보 전역 상태
export const userStore = create(
  devtools(set => ({
    email: localStorage.getItem('email') || '',
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    token: localStorage.getItem('token') || '',
    kakaoId: localStorage.getItem('kakaoId') || '',
    userIdx: localStorage.getItem('userIdx') || '',
    dong: localStorage.getItem('dong') || '',
    saveToken: token => set({ token: token }),
    saveUserIdx: userIdx => set({ userIdx: userIdx }),
    saveDong: dong => set({ dong: dong }),
  }))
);

// 회원가입시 사용할 스토어
export const signUpStore = create(
  devtools(set => ({
    // 회원가입 서버로 보낼 데이터
    // email, userIdx, kakaoId = 회원가입 안된 사용자의 경우 KakaoLogin에서 응답으로 받음
    email: '',
    userIdx: '',
    kakaoId: '',
    // nickname, category, si, gu, dong, lng, lat는 온보딩 페이지에서 저장함
    nickname: '',
    si: '',
    gu: '',
    dong: '',
    lng: '',
    lat: '',

    // set 메소드
    saveEmail: email => set({ email: email }),
    saveNickname: nickname => set({ nickname: nickname }),
    saveUserIdx: userIdx => set({ userIdx: userIdx }),
    saveTown: (si, gu, dong, lng, lat) =>
      set({ si: si, gu: gu, dong: dong, lng: lng, lat: lat }),
    saveKakaoId: kakaoId => set({ kakaoId: kakaoId }),
    empryStore: () =>
      set({
        nickname: '',
        category: [],
        si: '',
        gu: '',
        dong: '',
        lng: '',
        lat: '',
        kakaoId: '',
      }),
  }))
);
