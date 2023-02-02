import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// 회원가입시 사용할 스토어
const signUpStore = create(set => ({
  // 회원가입 서버로 보낼 데이터
  email: '',
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
      email: '',
      nickname: '',
      category: [],
      si: '',
      gu: '',
      dong: '',
      lng: '',
      lat: '',
      kakaoId: '',
    }),
}));

// const useStore = create(devtools(signUpStore));

export default signUpStore;
