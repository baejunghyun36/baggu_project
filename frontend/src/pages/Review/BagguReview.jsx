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
import { post_trade_review } from 'api/apis/review';
import { put_review_status } from 'api/apis/chat';
import { chatStore } from 'store/chat';

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
  // 모든 채팅방 정보 중앙저장소
  const { updateChatRoom } = chatStore(state => state);
  // 리뷰 작성용 중앙 저장소
  const { yourIdx, yourNickname, roomId, targetItemIdx, writeUserIdx } =
    reviewStore(state => state);
  // 로그인한 사용자 정보
  const userIdx = localStorage.getItem('userIdx');

  // 유저 남긴 리뷰
  const [textReview, setTextReview] = useState('');

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
  const submitHandler = async () => {
    if (textReview) {
      const data = {
        targetItemIdx: targetItemIdx,
        writeUserIdx: writeUserIdx,
        reviewText: textReview,
      };

      // 거래 리뷰 POST
      await post_trade_review(data)
        .then(() => {
          const data1 = {
            roomId: roomId,
            userIdx: userIdx,
            reviewNumber: 2,
          };
          put_review_status(userIdx, data1).then(res => {
            const roomInfo = res.data;
            updateChatRoom(roomId, roomInfo);
          });
        })
        .then(() => {
          navigate('/chat');
        });
    }
  };
  return (
    <Wrapper>
      <TopBar2 title="거래 후기 남기기" useCheckBtn={false} BackStep={2} />
      <Container>
        <p>
          <span>{yourNickname}</span>님과의 거래에 대한 후기를 남겨주세요.
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
          />
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
