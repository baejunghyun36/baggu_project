import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// store
import { signUpStore } from 'store/store';

// API
import { defaultInstance, authInstance } from 'api/axios';
import requests from 'api/config';

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

const ContentContainer = styled.div`
  ${tw`flex flex-wrap pt-2 pb-2 px-4`}
`;

const BtnContainer = styled.div`
  ${tw`flex pt-2 pb-2 px-4 fixed bottom-0 w-full h-[98px]`}
`;

const CategoryBtn = styled.div`
  ${props => (props.isClicked ? tw`bg-success` : tw`bg-white`)}
  ${tw`flex justify-center items-center rounded-full w-fit h-5 border border-grey2 mb-2 mr-[4px] p-2`}

  & {
    span {
      ${tw`text-main`}
    }
  }
`;

function StartCategory() {
  const [clickedCategories, setClickedCategories] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
  });

  // 카테고리 목록
  const categories = [
    '디지털기기',
    '생활가전',
    '가구/인테리어',
    '생활/주방',
    '여성의류',
    '여성잡화',
    '남성패션/잡화',
    '뷰티/미용',
    '스포츠/레저',
    '취미/게임/음반',
    '도서',
    '가공식품',
    '반려동물용품',
    '기타',
  ];

  // store
  const {
    email,
    nickname,
    category,
    si,
    gu,
    dong,
    lng,
    lat,
    kakaoId,
    saveCategory,
  } = signUpStore(state => state);

  // 클릭된 카테고리 수,
  const clickedCount = Object.values(clickedCategories).filter(
    x => x === true
  ).length;

  // signup API 요청 함수
  const sign_up = async category_types => {
    try {
      const response = await defaultInstance.post(requests.SIGNUP, {
        data: {
          nickname: nickname,
          category: category_types,
          si: si,
          gu: gu,
          dong: dong,
          lng: lng,
          lat: lat,
          kakaoId: '12',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const navigate = useNavigate();
  const submitHandler = () => {
    // {clickedCategories : clickedCategories}으로 중앙저장소에 저장
    // 카테고리 번호로 저장해야함
    if (clickedCount >= 2) {
      // store에 저장
      const category_types = Object.keys(clickedCategories)
        .map(Number)
        .filter(x => clickedCategories[x])
        .map(x => `TYPE${x}`);
      console.log(nickname, si, gu, dong, lat, lng, category_types);
      // API 요청
      sign_up(category_types)
        .then(res => {
          console.log('sign up success', res);
          navigate('/start/ready');
        })
        .catch(error => {
          navigate('/start/ready');
          console.log(error);
        });
    }
  };

  return (
    <Wrapper>
      <TopBar2 pageTitle="" />
      <TextContainer>
        <p>
          관심있는 카테고리를
          <br /> 2개 이상 선택해주세요.
        </p>
      </TextContainer>
      <ContentContainer>
        {categories.map((name, index) => (
          <CategoryBtn
            isClicked={clickedCategories[index]}
            key={index}
            onClick={e => {
              setClickedCategories(prev => {
                return { ...prev, [index]: !prev[index] };
              });
            }}
          >
            <span>{name}</span>
          </CategoryBtn>
        ))}
      </ContentContainer>
      <FormSubmitBtn
        disabled={clickedCount >= 2 ? false : true}
        onClick={submitHandler}
        title="회원가입 완료하기"
      />
    </Wrapper>
  );
}

export default StartCategory;
