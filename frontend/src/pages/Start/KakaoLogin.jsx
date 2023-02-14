import React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Cookie
import { getCookie, setCookie } from 'utils/cookie';
import { useCookies } from 'react-cookie';

// API
import { defaultInstance, authInstance } from 'api/axios';
import requests from 'api/config';

// Store
import { signUpStore, userStore } from 'store/store';

// Main Component
function KakaoLogin() {
  // 2. Redirect URI로 받은 인가코드 저장
  const location = useLocation();
  const navigate = useNavigate();
  const PARAMS = new URL(document.location).searchParams;
  // URI에서 받은 인가코드
  const AUTHORIZE_CODE = PARAMS.get('code');

  // 3. 토큰 발급 후 서버로 가입된 사용자인지 아닌지 get 요청
  // localstorage에 access-token 저장
  const check_is_signed = async code => {
    try {
      console.log('send request');
      const response = await defaultInstance.get(
        requests.CHECK_IS_SIGNED(code, 'jijj123kl2jlkhjfkuhddfnhh22')
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // store
  const { saveEmail, saveUserIdx, saveKakaoId } = signUpStore(state => state);

  useEffect(() => {
    // 3. 가입된 사용자인지 확인
    check_is_signed(AUTHORIZE_CODE)
      .then(response => {
        // 가입된 사용자와 가입되지 않은 사용자 모두 userIdx는 넘어옴
        localStorage.setItem('userIdx', response.data.user.userIdx);

        // 가입 여부에 따라 리다이렉트
        if (response.data.signed) {
          // 가입된 사용자
          // token, userIdx, dong 모두 로컬스토리지에 저장

          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('token', response.headers['authorization']);
          localStorage.setItem('dong', response.data.user.dong);
          // 쿠키에 저장
          setCookie('userIdx', response.data.user.userIdx);
          setCookie('token', response.headers['authorization']);
          setCookie('refresh-token', response.headers['refresh-token']);
          setCookie('isLoggedIn', true);

          navigate('/');
          return true;
        } else {
          // 가입되지 않은 사용자
          // SignUpStore에 정보 저장하고 온보딩 단계로 넘어감
          saveEmail(response.data.email);
          saveUserIdx(response.data.user.userIdx);
          saveKakaoId(response.data.kakaoId);

          navigate('/start/nickname');
          return false;
        }
      })
      // .then(data => {
      //   if (data) navigate('/');
      //   else navigate('/start/nickname');
      // })
      .catch(error => {
        throw error;
      });
  }, []);
  return <div></div>;
}

export default KakaoLogin;
