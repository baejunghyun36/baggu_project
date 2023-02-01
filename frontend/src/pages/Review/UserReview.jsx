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

const Wrapper = tw.div`w-full h-full`;
const Container = styled.div`
  ${tw`p-3`}
  & {
    p {
      ${tw`mb-3`}
    }
  }
`;

const ReviewBtn = styled.div`
  ${tw`h-4 py-1 px-[12px] w-fit rounded-full flex justify-center items-center mb-1 text-main`}
  ${props =>
    props.isClicked
      ? tw`bg-secondary text-white`
      : tw`bg-white text-secondary border-1 border-secondary`}
`;

// Main Component
function UserReview() {
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

  // 유저가 클릭한 리뷰
  const [clickedReviews, setClickedReviews] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const userReviews = [
    '시간 약속을 잘 지켜요.',
    '친절하고 매너가 좋아요.',
    '답장이 빨라요.',
    '상품설명과 상품상태가 같아요.',
  ];

  const you = '유저1';
  const navigate = useNavigate();
  const submitHandler = () => {
    // 유저가 선택한 리뷰 태그 인덱스 필터링
    const clickedReviewsIndex = Object.keys(clickedReviews)
      .map(Number)
      .filter(x => clickedReviews[x] === true);

    // 유저 후기 post 요청보내는 함수
    // clickedReviewsIndex를 인자로 사용
    const post_user_review = async clickedReviewsIndex => {
      try {
        const response = await authInstance.post(requests.POST_USER_REVIEW, {
          data: {
            userIdx: 1,
            review_tag: clickedReviewsIndex,
          },
          headers: {
            'access-token': `${token}`,
          },
        });

        return response.data;
      } catch (error) {
        throw error;
      }
    };

    post_user_review(clickedReviewsIndex)
      .then(() => {
        navigate('/bagguReview');
      })
      .catch(error => {
        console.log(error);
        // 테스트용
        navigate('/bagguReview');
      });
  };
  return (
    <Wrapper>
      <TopBar2 title="유저 후기 남기기" useCheckBtn={false} />
      <Container>
        <p>
          <span>{you}</span>님에 대한 후기를 남겨주세요.
        </p>
        <div>
          {userReviews.map((review, idx) => (
            <ReviewBtn
              isClicked={clickedReviews[idx]}
              key={idx}
              onClick={e => {
                setClickedReviews(prev => {
                  return { ...prev, [idx]: !prev[idx] };
                });
              }}
            >
              <span>{review}</span>
            </ReviewBtn>
          ))}
        </div>
      </Container>
      <FormSubmitBtn
        disabled={
          Object.values(clickedReviews).filter(x => x === true).length
            ? false
            : true
        }
        onClick={submitHandler}
        title="선택 완료"
      />
    </Wrapper>
  );
}

export default UserReview;
