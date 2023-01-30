import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styled component
const Wrapper = styled.div`
  ${tw`w-full h-full border-0 flex flex-col text-[26px]`}
`;
const BtnContainer = styled.div`
  ${tw`flex-row-reverse pt-2 pb-2 px-4 fixed bottom-0 w-full h-[98px]`}

  & {
    p {
      ${tw`text-main text-grey2 h-5`}
    }
  }
`;

function StartIntroduce() {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate('/');
  };
  return (
    <Wrapper>
      <BtnContainer>
        <p onClick={onClickHandler}>건너뛰기</p>
      </BtnContainer>
    </Wrapper>
  );
}

export default StartIntroduce;
