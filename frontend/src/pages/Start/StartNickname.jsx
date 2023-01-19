import React from 'react';
import tw from 'twin.macro';

// components
import TopBar2 from 'components/common/TopBar2';
import styled from 'styled-components';
import { useState } from 'react';
import FormSubmitBtn from 'components/common/FormSubmitBtn';

const Wrapper = styled.div`
  ${tw`w-full h-full border-0 flex flex-col text-[26px]`}
`;

function StartNickname() {
  const [nickname, setNickname] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // input이 입력될 때마다 유효성 검사를 진행
  // 입력 중간에 유효성이 통과되면 제출버튼 활성화
  const changeInputHandler = e => {
    setIsTouched(true);
    setNickname(e.target.value);

    if (nickname.trim() === '') {
      setIsValid(false);
      return;
    } else {
      setIsValid(true);
    }
  };

  const nicknameIsValid = isTouched && isValid;

  let message = '올바른 닉네임 형식에 대한 설명입니다.';

  return (
    <Wrapper>
      <TopBar2 pageTitle="" />
      <div>
        <p>
          <span>바꾸바꾸</span>에서 사용할 <br /> 닉네임을 입력해주세요.
        </p>
      </div>
      <div>
        <input type="text" onChange={changeInputHandler} />
        <p>{message}</p>
      </div>
      <FormSubmitBtn btnType="disabled" />
    </Wrapper>
  );
}

export default StartNickname;
