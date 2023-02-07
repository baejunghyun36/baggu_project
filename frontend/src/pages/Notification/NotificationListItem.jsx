import React from 'react';
import { useNavigate } from 'react-router-dom';

// API
import { useMutation } from 'react-query';
import { put_notify } from 'api/apis/notify';

// twin.macro
import tw, { styled } from 'twin.macro';
import { notificationStore } from 'store/notication';

// Styled Component
const Container = styled.div`
  ${tw`w-full p-2 flex gap-2 border-b `}
  ${props =>
    props.readState
      ? tw`bg-grey1 text-grey2`
      : tw`bg-white hover:bg-primary-hover`}
`;
const TextContainer = styled.div`
  ${tw`flex flex-col gap-1  text-main-bold`}
  span {
    ${props => (props.readState ? tw`text-grey2` : tw`text-primary`)}
  }
  p {
    ${tw`text-grey3 text-sub`}
  }
`;

// Main Component
function NotificationListItem({
  type,
  title,
  content,
  typeIdx,
  readState,
  notifyIdx,
}) {
  /*
  < props >
  1. type : 알림유형
    - 0 : 새로운 바꾸신청
    - 1 : 새로운 채팅방 개설
  2. title : 알림의 제목
  3. content : 알림의 내용
  4. typeIdx : 알림유형이 0일 때 이동할 URL에 필요한 아이템 pk값 (/item/:itemIdx)
  5. readstate : 해당 알림이 이미 읽은 알람이라면 true, 읽지 않은 알람이라면 false
  */
  // 현재 로그인한 유저의 idx
  const userIdx = window.localStorage.getItem('userIdx');

  // 일림 클릭시 put nofity로 mutate
  const { data, isLoading, mutate, isSuccess } = useMutation(put_notify, {
    // API 요청 성공시 프론트의 중앙저장소에 저장된 해당 알림을 읽음 처리
    onSuccess: data => {
      readNotify(data);
    },
  });

  // 알림 중앙저장소
  const { readNotify } = notificationStore(state => state);

  // 알림 클릭시 실행될 함수
  const navigate = useNavigate();
  const onClickHandler = (type, notifyIdx) => {
    // 알림 서버에 읽음 처리
    mutate({ notifyIdx: notifyIdx });

    // url 이동
    if (type === 0) navigate(`/item/${typeIdx}`);
    else if (type === 1) navigate(`/chat`);
  };

  return (
    <Container
      onClick={() => onClickHandler(type, notifyIdx)}
      readState={readState}
    >
      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.2902 17.04L18.0002 15.75V10.75C18.0002 7.68 16.3602 5.11 13.5002 4.43V3.75C13.5002 2.92 12.8302 2.25 12.0002 2.25C11.1702 2.25 10.5002 2.92 10.5002 3.75V4.43C7.63017 5.11 6.00017 7.67 6.00017 10.75V15.75L4.71017 17.04C4.08017 17.67 4.52017 18.75 5.41017 18.75H18.5802C19.4802 18.75 19.9202 17.67 19.2902 17.04ZM16.0002 16.75H8.00017V10.75C8.00017 8.27 9.51017 6.25 12.0002 6.25C14.4902 6.25 16.0002 8.27 16.0002 10.75V16.75ZM12.0002 21.75C13.1002 21.75 14.0002 20.85 14.0002 19.75H10.0002C10.0002 20.85 10.8902 21.75 12.0002 21.75Z"
            className={readState ? 'fill-grey2' : 'fill-primary'}
          />
        </svg>
      </div>
      <TextContainer readState={readState}>
        <span>{title}</span>
        <p>{content}</p>
      </TextContainer>
    </Container>
  );
}

export default NotificationListItem;
