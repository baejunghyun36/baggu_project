import React from 'react';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar2 from '../../components/common/TopBar2';
import FormSubmitBtn from 'components/common/FormSubmitBtn';
import tw, { styled, css } from 'twin.macro';
import { authInstance } from 'api/axios';
import requests from 'api/config';
import ImageAddButton from 'pages/Item/ImageAddButton';
const Avatar = styled.div`
  ${tw`bg-primary rounded-full w-10 h-10 bg-cover bg-center mr-2`}
  ${props => css`
    background-image: url(${props.img});
  `}
`;
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

function MyProfileEdit() {
  const [nickname, setNickname] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isNicknameTouched, setIsNicknameTouched] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [introduction, setIntroduction] = useState('');
  const [introductionMessage, setIntroductionMessage] = useState('');
  const [isIntroductionTouched, setIsIntroductionTouched] = useState(false);
  const [isIntroductionValid, setIsIntroductionValid] = useState(false);
  const [userImage, setUserImage] = useState([]);
  const navigate = useNavigate();
  const onChangeNicknameInput = useCallback(e => {
    // setIsTouched(true);
    setNickname(e.target.value);
    setIsNicknameTouched(true);

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
  const onChangeIntroductionInput = useCallback(e => {
    setIntroduction(e.target.value);
    setIsIntroductionTouched(true);

    if (e.target.value.trim().length > 20) {
      setIsIntroductionValid(false);
      setIntroductionMessage('20글자 미만으로 입력해주세요.');
      return;
    } else {
      setIntroductionMessage('');
      setIsIntroductionValid(true);
    }
  }, []);
  const handleClickAddImage = () => {
    document.getElementById('imageInput').click();
  };
  // const handleUserImage = event => {
  //   const image = event.target.files;
  //   formData.append('profileImg', image);
  //   setUserImage(formData.file);
  //   console.log(formData);
  // };
  const handleUserImage = event => {
    const files = Array.from(event.target.files);
    setUserImage([...files]);
  };
  const submitHandler = () => {
    if (isValidName && isValidIntroduction) {
      const formData = new FormData();
      formData.append('username', nickname);
      formData.append('info', introduction);
      userImage.forEach((userImage, index) => {
        formData.append('profileImg', userImage);
      });
      const put_user_detail = async () => {
        try {
          const response = await authInstance.put(requests.PUT_USER_DETAIL, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          return response.data;
        } catch (error) {
          throw error;
        }
      };
      put_user_detail();

      // navigate('/myprofile');
    }
  };

  const isValidName = isNicknameTouched && isNicknameValid;
  const isValidIntroduction = isIntroductionTouched && isIntroductionValid;
  // const [user, setUser] = useState([]);
  useEffect(() => {
    const get_user = async () => {
      try {
        const { data } = await authInstance.get(requests.GET_USER(1));

        console.log(data);
        setNickname(data.nickname);
        setIntroduction(data.info);
        setUserImage(data.profileImgUrl);
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    get_user();
  }, []);
  return (
    <div>
      <TopBar2 title="프로필수정" />
      <Avatar img={userImage} />
      <ImageAddButton clickFunction={handleClickAddImage} />
      <input
        id="imageInput"
        type="file"
        accept="img/*"
        onChange={handleUserImage}
        className="display: hidden"
      />

      {/* 유저 프로필 이미지 컴포넌트 (클릭시 앨범에서 이미지 파일 선택받기) */}

      <form action="submit">
        <InputContainer disabled={isValidName ? false : true}>
          <label htmlFor="Username">닉네임</label>
          {/* placeholder에는 유저 본인 닉네임, 한줄소개를 기본으로 넣을지 아닐지 고민중 */}
          <input
            type="text"
            onChange={onChangeNicknameInput}
            placeholder={nickname}
            name="Username"
          />
          <p>{nicknameMessage}</p>
        </InputContainer>
        <InputContainer disabled={isValidIntroduction ? false : true}>
          <label htmlFor="UserIntroduction">한줄소개</label>
          <input
            type="text"
            onChange={onChangeIntroductionInput}
            name="UserIntroduction"
            placeholder={introduction}
          />
          <p>{introductionMessage}</p>
        </InputContainer>
      </form>
      <FormSubmitBtn onClick={submitHandler} />
    </div>
  );
}

export default MyProfileEdit;
