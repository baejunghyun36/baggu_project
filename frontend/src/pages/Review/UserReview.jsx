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
import { reviewStore } from 'store/reviewStore';
import { post_user_review } from 'api/apis/review';
import {
  get_updated_chatroom,
  put_review_status,
  put_trade_status,
} from 'api/apis/chat';
import { chatStore } from 'store/chat';

// Styled Component
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
  // 리뷰 작성용 중앙 저장소
  const { yourIdx, yourNickname, roomId } = reviewStore(state => state);
  // 모든 채팅방 정보 중앙저장소
  const { updateChatRoom } = chatStore(state => state);
  const userIdx = localStorage.getItem('userIdx');

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

  // 제출 클릭시
  const navigate = useNavigate();
  const submitHandler = async () => {
    // 유저가 선택한 리뷰 태그 인덱스 필터링
    const clickedReviewsIndex = Object.keys(clickedReviews)
      .map(Number)
      .filter(x => clickedReviews[x] === true);
    const reviewTagTypes = [];
    clickedReviewsIndex.forEach(idx => reviewTagTypes.push(`TYPE${idx}`));
    const data = { userIdx: yourIdx, reviewTagTypes: reviewTagTypes };

    // 유저 리뷰 POST
    await post_user_review(data)
      .then(res => {
        // 채팅 서버 PUT
        const data1 = {
          roomId: roomId,
          userIdx: userIdx,
          reviewNumber: 1,
        };
        put_review_status(userIdx, data1).then(res => {
          const roomInfo = res.data;
          updateChatRoom(roomId, roomInfo);
        });
        navigate('/bagguReview');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <TopBar2 title="유저 후기 남기기" useCheckBtn={false} />
      <Container>
        <p>
          <span>{yourNickname}</span>님에 대한 후기를 남겨주세요.
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
