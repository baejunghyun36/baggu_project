import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const Btn = styled.div`
  ${tw`rounded-full fixed bottom-0`}
`;

function FormSubmitBtn({ btnType }) {
  return (
    <Btn>
      <span>입력완료</span>
    </Btn>
  );
}

export default FormSubmitBtn;
