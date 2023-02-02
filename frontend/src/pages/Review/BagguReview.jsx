import FormSubmitBtn from 'components/common/FormSubmitBtn';
import TopBar2 from 'components/common/TopBar2';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

// API
import { defaultInstance, authInstance } from 'api/axios';
import requests from 'api/config';

// React query
import { useMutation } from '@tanstack/react-query';

// styled component
const Wrapper = tw.div`w-full h-full`;
const Container = styled.div`
  ${tw`p-3`}
  & {
    p {
      ${tw`mb-3`}
    }
    span {
    }
  }
`;

const BtnContainer = styled.div`
  ${tw`flex flex-col pt-2 pb-4 px-4 fixed bottom-0 w-full h-fit gap-1`}
`;

const CancelBtn = styled.div`
  ${tw`w-full rounded-full flex justify-center items-center h-6 text-negative hover:text-white hover:bg-negative border-1 border-negative`}
  & {
    span {
      ${tw`text-main-bold`}
    }
  }
`;

const SubmitBtn = styled.div`
  ${tw`w-full rounded-full flex justify-center items-center h-6`}
  ${props =>
    props.disabled ? tw`bg-grey1 text-grey2` : tw`bg-primary text-white`}

  & {
    span {
      ${tw`text-main-bold`}
    }
  }
`;

// Main Component
function BagguReview() {
  // 테스트용 토큰
  const [token, setToken] = useState(null);

  useEffect(() => {
    const get_token = async () => {
      try {
        const { data } = await defaultInstance.post(requests.TEST_TOKEN, {
          data: { userIdx: 1 },
        });
        setToken(data);
      } catch (error) {
        console.log(error);
      }
    };

    get_token();
  }, []);

  // 유저 남긴 리뷰
  const [textReview, setTextReview] = useState('');

  const you = '유저1';

  // text value 받기
  const textChangeHandler = e => {
    setTextReview(e.target.value);
  };
  const navigate = useNavigate();

  // 나중에 하기 클릭 시
  const cancelHandler = () => {
    navigate('/chat');
  };

  // 제출 버튼 클릭 시
  const submitHandler = () => {
    console.log(textReview);
    // 거래 후기 post 요청보내는 함수
    // clickedReviewsIndex를 인자로 사용
    const post_trade_review = async () => {
      try {
        const response = await authInstance.post(requests.POST_TRADE_REVIEW, {
          data: {
            targetItemIdx: 13,
            writeUserIdx: 3,
            reviewText: textReview,
          },
          headers: {
            'access-token': `${token}`,
          },
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        throw error;
      }
    };

    post_trade_review()
      .then(() => {
        navigate('/chat');
      })
      .catch(error => {
        console.log(error);
        // 테스트용
        navigate('/chat');
      });
  };
  return (
    <Wrapper>
      <TopBar2 title="거래 후기 남기기" useCheckBtn={false} />
      <Container>
        <p>
          <span>{you}</span>님과의 거래에 대한 후기를 남겨주세요.
        </p>
        <div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="입력"
            onChange={textChangeHandler}
            value={textReview}
          ></textarea>
        </div>
      </Container>
      <BtnContainer>
        <CancelBtn onClick={cancelHandler}>
          <span>나중에 하기</span>
        </CancelBtn>
        <SubmitBtn
          disabled={textReview.length ? false : true}
          onClick={submitHandler}
        >
          <span>작성 완료</span>
        </SubmitBtn>
      </BtnContainer>
    </Wrapper>
  );
}

export default BagguReview;
