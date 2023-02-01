import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';

// components
import TopBar2 from 'components/common/TopBar2';
import FormSubmitBtn from 'components/common/FormSubmitBtn';
import axios from 'axios';

// styled component
const Wrapper = styled.div`
  ${tw`w-full h-full border-0 flex flex-col text-[26px]`}
`;

const TextContainer = styled.div`
  ${tw`flex-col p-4 pb-2`}

  & {
    span {
      ${tw`font-extrabold text-primary`}
    }
  }
`;

const ContentContainer = styled.div`
  ${tw`flex flex-wrap pt-2 pb-2 px-4`}
`;

const BtnContainer = styled.div`
  ${tw`flex pt-2 pb-2 px-4 fixed bottom-0 w-full h-[98px]`}
`;
function StartReady() {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('/start/introduce');
  };
  return (
    <Wrapper>
      <TopBar2 pageTitle="" />
      <TextContainer>
        <p>
          반갑습니다!
          <br /> <span>바꾸바꾸</span>와 함께할 준비가
          <br /> 완료되었습니다.
        </p>
      </TextContainer>

      <FormSubmitBtn
        //   disabled={clickedCount >= 2 ? false : true}
        onClick={clickHandler}
        title="바꾸바꾸 시작하기"
      />
    </Wrapper>
  );
}

export default StartReady;
