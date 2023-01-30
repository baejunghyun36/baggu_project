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
      ${tw`w-[80%]`}
    }
  }
`;

function StartLogin() {
  const navigate = useNavigate();

  const kakaoHandler = () => {
    // 사용자가 회원가입한 사용자인지 아닌지
    let isSignedUp = false;

    // 백엔드로 카카오 로그인 요청 후 회원가입된 사용자인지 아닌지의 값을 boolean으로 응답받기

    // API URL
    // const API_URL = 'urlurlurl';

    //   axios.get(API_URL, {
    //     data: {
    //       //...
    //     },
    //   });
    // 구현용 임시 변경
    //   isSignedUp = true;

    if (isSignedUp) {
      // 가입된 사용자의 경우 home으로
      navigate('/');
    } else {
      // 가입되지 않은 사용자의 경우 nickname 설정 페이지로
      navigate('/start/nickname');
    }
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
