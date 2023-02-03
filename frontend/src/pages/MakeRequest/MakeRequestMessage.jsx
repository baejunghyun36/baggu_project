import React from 'react';
import { useParams } from 'react-router-dom';

// component
import FormSubmitBtn from 'components/common/FormSubmitBtn';
import TopBar2 from 'components/common/TopBar2';

// twin.macro
import tw, { styled, css } from 'twin.macro';
import { useState } from 'react';

// Styled Component
const Wrapper = styled.div``;

const TextContainer = styled.div`
  ${tw`p-2`}
  h3 {
    ${tw`text-h3 text-black`}
  }
  span {
    ${tw`text-tiny text-grey2`}
  }
`;

// Main Component
const InputContainer = styled.div`
  ${tw`flex-col pt-2 pb-2 px-4`}

  & {
    input {
      ${tw`w-full rounded-lg mb-1 p-1 box-border h-6 text-main`}
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

// api
import { get_user_item } from 'api/apis/user';
// store
import { makeRequestStore } from '../../store/makeRequest';

function MakeRequestMessage() {
  // API 요청시 파라미터로 전송
  const { itemIdx } = useParams();

  const [message, setMessage] = useState('');

  const onChangeInput = e => {
    setMessage(e.currenTarget);
  };
  const onClickHandler = () => {};

  return (
    <div>
      <TopBar2 title="바꾸 신청" />
      <TextContainer>
        <h3>신청메세지를 작성해주세요.</h3>
        <span>생략할 수 있습니다.</span>
      </TextContainer>
      <InputContainer>
        <input type="text" onChange={onChangeInput} />
        <p>10자 이하로 작성해주세요.</p>
      </InputContainer>
      <FormSubmitBtn
        title="선택 완료"
        onClick={onClickHandler}
        disabled={false}
      />
    </div>
  );
}

export default MakeRequestMessage;
