import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

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

function FormSubmitBtn({ disabled, onClick }) {
  return (
    <Btn disabled={disabled} onClick={onClick}>
      <span>입력완료</span>
    </Btn>
  );
}

export default FormSubmitBtn;
