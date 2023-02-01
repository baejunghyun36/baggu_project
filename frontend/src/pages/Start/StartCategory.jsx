import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import TopBar2 from 'components/common/TopBar2';
import FormSubmitBtn from 'components/common/FormSubmitBtn';
// import axios from 'axios';

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
    디지털기기: false,
    생활가전: false,
    '가구/인테리어': false,
    '생활/주방': false,
    여성의류: false,
    여성잡화: false,
    '남성패션/잡화': false,
    '뷰티/미용': false,
    '스포츠/레저': false,
    '취미/게임/음반': false,
    도서: false,
    가공식품: false,
    반려동물용품: false,
    기타: false,
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

  // 클릭된 카테고리 수
  const clickedCount = Object.values(clickedCategories).filter(
    x => x === true
  ).length;

  const navigate = useNavigate();
  const submitHandler = () => {
    // {clickedCategories : clickedCategories}으로 중앙저장소에 저장
    // 카테고리 번호로 저장해야함
    if (clickedCount >= 2) {
      console.log({
        clickedCategories: Object.keys(clickedCategories).filter(
          x => clickedCategories[x]
        ),
      });
      navigate('/start/ready');
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
            isClicked={clickedCategories[name]}
            key={index}
            onClick={e => {
              const name = e.currentTarget.querySelector('span').innerText;
              setClickedCategories(prev => {
                const value = !clickedCategories[name];
                return { ...prev, [name]: value };
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
