import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// component
import FormSubmitBtn from 'components/common/FormSubmitBtn';
import TopBar2 from 'components/common/TopBar2';

// twin.macro
import tw, { styled, css } from 'twin.macro';
import { useState } from 'react';

// api
import { post_request } from 'api/apis/request';
import { post_notify } from 'api/apis/notify';

// store
import { makeRequestStore } from '../../store/makeRequest';

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

function MakeRequestMessage() {
  // API 요청시 파라미터로 전송
  const { itemIdx } = useParams();

  const { requestItemIdxList, requestUserIdx, comment, saveComment } =
    makeRequestStore(state => state);
  const [message, setMessage] = useState(comment);

  const onChangeInput = e => {
    setMessage(e.target.value);
    saveComment(e.target.value);
  };
  const onClickHandler = () => {
    const data = {
      requestItemIdxList: requestItemIdxList,
      requestUserIdx: requestUserIdx,
      comment: comment,
    };
    console.log(data);
    // 즉시 실행 익명 함수
    (async () => {
      await post_request(itemIdx, data).then(data => {
        data = {
          ...data,
          title: '새로운 바꾸 신청이 도착했습니다.',
          content: `${data.receiveUserIdx}님과의 물물교환을 시작해보세요.`,
        };
        post_notify(data);
      });
    })();
  };

  return (
    <div>
      <TopBar2 title="바꾸 신청" />
      <TextContainer>
        <h3>신청메세지를 작성해주세요.</h3>
        <span>생략할 수 있습니다.</span>
      </TextContainer>
      <InputContainer>
        <input type="text" onChange={onChangeInput} value={message} />
        <p>{message.length ? message.length : '0'}/10</p>
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
