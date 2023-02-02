import React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const { saveKakaoId } = signUpStore(state => state);
  const { saveToken, saveUserIdx, saveDong } = userStore(state => state);

  useEffect(() => {
    // 3. 가입된 사용자인지 확인
    check_is_signed(AUTHORIZE_CODE)
      .then(response => {
        console.log('data', response.data);
        console.log('headers', response.headers);
        console.log('token', response.headers['authorization']);
        console.log('userIdx', response.data.user.userIdx);
        console.log('kakaoId', response.data.kakaoId);

        // access-token, isLoggedIn localStorage에 저장
        const access_token = response.headers['authorization'];
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('token', access_token);
        localStorage.setItem('kakaoId', response.data.kakaoId);
        localStorage.setItem('userIdx', response.data.user.userIdx);

        // kakaoId 저장
        // saveToken(access_token);
        // saveKakaoId(response.kakaoId);
        // saveUserIdx(response.data.user.userIdx);

        // 리다이렉트
        if (response.data.signed) {
          // 가입된 사용자
          // token, kakaoId, userIdx, dong 모두 저장
          localStorage.setItem('dong', response.data.user.dong);
          // saveDong(response.data.user.dong);
          navigate('/');
        } else {
          // 가입되지 않은 사용자
          // token, kakaoId, userIdx 저장
          navigate('/start/nickname');
        }
      })
      .catch(error => {
        throw error;
      });
  }, []);
  return <div>KakaoLogin</div>;
}

export default KakaoLogin;
