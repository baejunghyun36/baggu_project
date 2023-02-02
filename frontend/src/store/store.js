import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// 유저 정보 전역 상태
export const userStore = create(
  devtools(set => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    token: localStorage.getItem('token') || '',
    userIdx: '',
    dong: '',
    saveToken: token => set({ token: token }),
    saveUserIdx: userIdx => set({ userIdx: userIdx }),
    saveDong: dong => set({ dong: dong }),
  }))
);

// 회원가입시 사용할 스토어
export const signUpStore = create(
  devtools(set => ({
    // 회원가입 서버로 보낼 데이터
    nickname: '',
    category: [],
    si: '',
    gu: '',
    dong: '',
    lng: '',
    lat: '',
    kakaoId: '',

    // set 메소드
    saveEmail: email => set({ email: email }),
    saveKakaoId: kakaoId => set({ kakaoId: kakaoId }),
    saveNickname: nickname => set({ nickname: nickname }),
    saveTown: (si, gu, dong, lng, lat) =>
      set({ si: si, gu: gu, dong: dong, lng: lng, lat: lat }),
    saveCategory: catetory => set({ category: catetory }),
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
