import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { useState } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import TopBar2 from 'components/common/TopBar2';
import FormSubmitBtn from 'components/common/FormSubmitBtn';

// hooks
import GetCurrentPosition from 'hooks/GetCurrentPosition';
import { useEffect } from 'react';

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

const InputContainer = styled.div`
  ${tw`flex-col pt-2 pb-2 px-4`}

  & {
    input {
      ${tw`w-full rounded-lg mb-1`}
      ${props =>
        props.isValid
          ? tw`focus:outline focus:outline-primary`
          : tw`focus:outline focus:outline-negative`}
    }
    p {
      ${tw`text-negative text-tiny`}
    }
  }
`;

const BtnContainer = styled.div`
  ${tw`flex pt-2 pb-2 px-4 fixed bottom-0 w-full`}
`;

function StartTown() {
  const [town, setTown] = useState('');

  const navigate = useNavigate();
  const clickHandler = () => {
    // {nickname : nickname}으로 중앙저장소에 저장
    // if (isValid) {
    //   console.log({ nickname: nickname });
    //   navigate('/start/town');
    // }
  };
  return (
    <Wrapper>
      <TopBar2 pageTitle="" />
      <TextContainer>
        <p>
          <span>'닉네임'</span>님의
          <br /> 동네를 설정해주세요.
        </p>
      </TextContainer>
      <InputContainer>
        <div>현재 위치로 동네 설정하기</div>
      </InputContainer>
      <BtnContainer>
        <FormSubmitBtn
          //   disabled={isValid ? false : true}
          onClick={clickHandler}
        />
      </BtnContainer>
    </Wrapper>
  );
}

export default StartTown;
