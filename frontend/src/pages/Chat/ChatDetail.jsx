import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import tw, { styled, css } from 'twin.macro';

// icon, image
import icon_exchange from 'assets/icons/exchange.svg';
import icon_send from 'assets/icons/send.svg';
import img_avatar from 'assets/images/avatar_1x.png';

// components
import TopBar2 from 'components/common/TopBar2';

// API
import { useQuery } from 'react-query';
import axios from 'axios';
import { get_chatroom_detail, get_chatroom_message } from 'api/apis/chat';
import { chatStore } from 'store/chat';

// Styled Components
const Summary = styled.div`
  ${tw`flex justify-center p-2 gap-3 border-b`}
  & {
    div {
      ${tw`flex gap-2`}
    }
  }
`;

const Product = styled.div`
  ${props =>
    css`
      background-image: url(${props.img});
    `}
  ${tw`bg-cover bg-center w-[60px] h-[60px] rounded`}
`;

const Button = styled.div`
  ${tw`text-tiny-bold rounded flex justify-center items-center h-[60px] w-[60px] p-1`}
  ${props =>
    props.status === '바꾸중'
      ? tw`bg-white border-1 border-secondary text-secondary`
      : tw`bg-secondary text-white`}
`;

const ChatContent = styled.div`
  ${css`
    height: calc(100vh - 60px - 92.5px - 72px);
  `}
  ${tw`overflow-scroll`}
`;

const MessageForm = styled.form`
  ${tw`h-9 bg-grey1 flex justify-center items-center gap-2`}

  & {
    img {
      ${tw`h-4 w-4`}
    }
  }
`;

const TextInput = tw.input`w-[320px] h-[44px] p-1 rounded`;

const MessageSection = styled.section`
  ${tw`flex p-2 w-full gap-1`}
`;

const Avatar = styled.div`
  ${props => (props.type === 'send' ? tw`hidden` : '')}
  ${tw`bg-primary rounded-full w-6 min-w-[48px] h-6 bg-cover bg-center`}
  ${props => css`
    background-image: url(${props.img});
  `}
`;

const MessageColumn = styled.div`
  ${tw`flex flex-col gap-1`}
  ${css`
    width: calc(100vw - 48px - 8px);
  `}
  span {
    ${tw`text-tiny text-grey3`}
  }
  & {
    div {
      ${props => (props.type === 'send' ? tw`flex-row-reverse` : '')}
      ${tw`flex items-end gap-1`}
    }
  }
`;

const MessageStyles = {
  receive: tw`bg-grey1`,
  send: tw`bg-primary`,
};
const Bubble = styled.p`
  ${tw`px-2 py-1 text-main text-black rounded-[20px] w-fit max-w-[80%]`}
  ${props => MessageStyles[props.type]}
`;

// Main Component
function ChatDetail() {
  // 현재 페이지의 파라미터
  const { roomId } = useParams();
  // 현재 로그인된 사용자
  const userIdx = localStorage.getItem('userIdx');

  // 모든 채팅방 정보
  const { chatRoomList } = chatStore(state => state);
  // 현재 채팅방에 대한 정보
  const chatRoomInfo = chatRoomList.find(
    chatRoom => chatRoom.roomId === roomId
  );

  // 사용자가 입력한 메세지
  const [messageInput, setMessageInput] = useState();

  // 응답 상태에 따른 content
  let content = undefined;

  const { data, isLoading, isError } = useQuery(
    ['getChatDetail', { roomId: roomId }],
    () => get_chatroom_detail(roomId)
  );

  // 로딩시
  if (isLoading) {
    content = <span>Loading...</span>;
  }

  const status = '바꾸중';

  // 상단 버튼 클릭 시 실행될 함수들
  const navigate = useNavigate();
  const changeStatusHandler = () => {};
  const sendReviewHandler = () => {
    navigate('/review');
  };

  // 메시지 전송 함수
  const sendMessageHandler = () => {
    console.log();
  };
  return (
    <div>
      <TopBar2 title="" isCheck={false} />
      <Summary>
        <div>
          <Product img="" alt="" />
          <img src={icon_exchange} alt="" />
          <Product img="" alt="" />
        </div>
        <Button
          status="바꾸중"
          onClick={
            status === '바꾸중' ? changeStatusHandler : sendReviewHandler
          }
        >
          {status === '바꾸중' ? (
            <span>
              거래
              <br />
              상태
              <br />
              변경
            </span>
          ) : (
            <span>
              후기 <br />
              남기기
            </span>
          )}
        </Button>
      </Summary>
      <ChatContent>
        <MessageSection type="send">
          <Avatar img="" type="send" />
          <MessageColumn type="send">
            <div>
              <Bubble type="send">안녕하세요.</Bubble>
              <span>12:40 PM</span>
            </div>
            <div>
              <Bubble type="send">물물교환 하실래요?</Bubble>
              <span>12:40 PM</span>
            </div>
          </MessageColumn>
        </MessageSection>
        <MessageSection type="receive">
          <Avatar img={img_avatar} type="receive" />
          <MessageColumn type="receive">
            <div>
              <Bubble type="receive">안녕하세요.</Bubble>
              <span>12:40 PM</span>
            </div>
            <div>
              <Bubble type="receive">
                물물교환 하실래요? 물물교환 하실래요? 물물교환 하실래요?
                물물교환 하실래요? 물물교환 하실래요? 물물교환 하실래요?
              </Bubble>
              <span>12:40 PM</span>
            </div>
          </MessageColumn>
        </MessageSection>
      </ChatContent>
      <MessageForm action="">
        <TextInput type="text" value={messageInput} />
        <img src={icon_send} onClick={sendMessageHandler} alt="" />
      </MessageForm>
    </div>
  );
}

export default ChatDetail;
