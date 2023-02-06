// import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

// images
import logo from '../../assets/images/brand/logo_1x.png';
import kakaoButton from '../../assets/images/kakao_sync_login/kakao_sync_edited.svg';

// styled component
const Wrapper = styled.div`
  ${tw`flex flex-col items-center h-full w-full p-4`}

  & {
    div {
      ${tw`h-[90%] flex justify-center items-center`}

      .logo {
        ${tw`h-5`}
      }
    }

    .kakao {
      ${tw`w-[240px]`}
    }
  }
`;

function StartLogin() {
  const navigate = useNavigate();
  const REST_API_KEY = 'dcea227af64fcf0366810e14b850e4d6';
  const REDIRECT_URI = `${window.location.href.replace(
    window.location.pathname,
    ''
  )}/kakaoLogin`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&state=jijj123kl2jlkhjfkuhddfnhh22`;

  // 1. 인가 코드 받기
  const kakaoHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Wrapper>
      <div>
        <img className="logo" src={logo} alt="" />
      </div>
      <img className="kakao" src={kakaoButton} alt="" onClick={kakaoHandler} />
    </Wrapper>
  );
}

export default StartLogin;
