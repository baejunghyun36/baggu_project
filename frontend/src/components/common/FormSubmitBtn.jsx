import React from 'react';
// import styled from 'styled-components';
import tw, { styled } from 'twin.macro';

const Btn = styled.div`
  ${tw`w-full rounded-full flex justify-center items-center h-6`}
  ${props =>
    props.disabled ? tw`bg-grey1 text-grey2` : tw`bg-primary text-white`}

  & {
    span {
      ${tw`text-main-bold`}
    }
  }
`;

const BtnContainer = styled.div`
  ${tw`flex pt-2 pb-2 px-4 fixed bottom-0 w-full h-[98px] cursor-pointer`}
`;

function FormSubmitBtn({ disabled, onClick, title }) {
  return (
    <BtnContainer>
      <Btn disabled={disabled} onClick={onClick}>
        <span>{title ? title : '다음'}</span>
      </Btn>
    </BtnContainer>
  );
}

export default FormSubmitBtn;
