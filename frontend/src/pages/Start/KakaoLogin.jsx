import React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// API
import { defaultInstance, authInstance } from 'api/axios';
import requests from 'api/config';

function KakaoLogin() {
  // 2. Redirect URI로 받은 인가코드 저장
  const location = useLocation();
  const navigate = useNavigate();
  // 인가코드
  const AUTHORIZE_CODE = location.search.split('=')[1];
  console.log(AUTHORIZE_CODE);
  const REST_API_KEY = 'dcea227af64fcf0366810e14b850e4d6';
  const REDIRECT_URI = 'http://localhost:8080/auth/callback/kakao';

  // 4. 토큰 발급 후 서버로 가입된 사용자인지 아닌지 get 요청
  const check_is_signed = async code => {
    try {
      const { data } = await defaultInstance.get(
        requests.CHECK_IS_SIGNED(code, 'jijj123kl2jlkhjfkuhddfnhh22')
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  // 3. 토큰 받기
  const getKakaoToken = () => {
    fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
    })
      .then(res => res.json())
      .then(data => {
        const code = data.access_token;
        check_is_signed(code).then(data => {
          // 가입된 사용자라면 홈으로
          if (data.isSigned) navigate('/');
          // 가입되지 않은 사용자라면 온보딩 페이지로
          else navigate('/start/nickname');
        });
      });
  };

  useEffect(() => {
    if (!location.search) return;
    // 2. 토큰 받기
    getKakaoToken();
  }, []);
  return <div>KakaoLogin</div>;
}

export default KakaoLogin;
