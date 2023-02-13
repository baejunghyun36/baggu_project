import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { useState } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// store
import { signUpStore, userStore } from '../../store/store.js';

// components
import TopBar2 from 'components/common/TopBar2';
import FormSubmitBtn from 'components/common/FormSubmitBtn';

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

const InputStyles = {
  0: tw``,
  1: tw``,
};
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

const BtnContainer = styled.div`
  ${tw`flex pt-2 pb-2 px-4 fixed bottom-0 w-full h-[98px]`}
`;

// Main Component
function StartNickname() {
  const [nickname, setNickname] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  // store
  const { saveNickname } = signUpStore(state => state);

  // input이 입력될 때마다 유효성 검사를 진행
  // 입력 중간에 유효성이 통과되면 제출버튼 활성화
  const onChangeInput = useCallback(e => {
    // setIsTouched(true);
    setNickname(e.target.value);
    setIsTouched(true);

    if (e.target.value.trim() === '') {
      setIsNicknameValid(false);
      setNicknameMessage('닉네임을 입력해주세요.');
      return;
    } else if (
      e.target.value.trim().length < 2 ||
      e.target.value.trim().length > 10
    ) {
      setIsNicknameValid(false);
      setNicknameMessage('2글자 이상 10글자 미만으로 입력해주세요.');
      return;
    } else {
      setNicknameMessage('');
      setIsNicknameValid(true);
    }
  }, []);

  const navigate = useNavigate();
  const submitHandler = () => {
    // {nickname : nickname}으로 중앙저장소에 저장
    if (isValid) {
      saveNickname(nickname);
      navigate('/start/town');
    }
  };

  const isValid = isTouched && isNicknameValid;
  /*
  
  */
  return (
    <Wrapper id="startNickname">
      <TopBar2 pageTitle="" />
      <TextContainer>
        <p>
          <span>바꾸바꾸</span>에서 사용할 <br /> 닉네임을 입력해주세요.
        </p>
      </TextContainer>
      <InputContainer disabled={isValid ? false : true}>
        <input type="text" onChange={onChangeInput} onBlur={onChangeInput} />
        <p>{nicknameMessage}</p>
      </InputContainer>

      <FormSubmitBtn
        disabled={isValid ? false : true}
        onClick={submitHandler}
      />
    </Wrapper>
  );
}

export default StartNickname;
