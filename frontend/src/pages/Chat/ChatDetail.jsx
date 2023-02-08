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
import {
  get_chatroom_detail,
  get_chatroom_message,
  get_updated_chatroom,
  post_chatroom_focus,
  post_message,
} from 'api/apis/chat';
import { chatStore } from 'store/chat';
import requests from 'api/config';

// hooks
import FormatDate from 'hooks/FormatDate';

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
  const userIdx = Number(localStorage.getItem('userIdx'));
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // 모든 채팅방 정보
  const { chatRoomList } = chatStore(state => state);
  // 현재 채팅방에 대한 정보
  // 주의! /chat에서 채팅방을 눌러 들어갔을때만 정보를 가져올 수 있음
  /*
  {
    "roomId":"63da08172a56c42cc9b85a61",
    "userIdx":[5,6],
    "readNotCnt":[3,0],
    "userActive":[false,false],
    "nickname":["서울사람","당산사람"],
    "userImg":["유저A 이미지 링크","유저B 이미지 링크"],
    "itemImg":["아이템A 이미지 링크","아이템B 이미지 링크"],
    "itemIdx":[5,6],"lastContent":"야야야야ㅑ",
    "createdAt":"2023-02-01T15:35:03.381",
    "reviewState" : [false, true],
    "tradeCompleteStatus" : true
  } 
*/
  const chatRoomInfo = chatRoomList.find(
    chatRoom => chatRoom.roomId === roomId
  );

  // 상대 유저의 정보
  const targetIdx = chatRoomInfo.userIdx.findIndex(x => x !== userIdx);
  const yourNickname = chatRoomInfo.nickname[targetIdx];
  const yourIdx = chatRoomInfo.userIdx[targetIdx];
  const myNickname = chatRoomInfo.nickname[1 - targetIdx];

  // 채팅메세지 SSE 구독 상태
  const [isListeningToMessage, setIsListeningToMessage] = useState(false);
  // 이 채팅방에서 주고 받은 모든 메세지 state
  const [messageList, setMessageList] = useState([]);

  // 채팅방리스트 전역 저장소
  const { updateChatRoom } = chatStore(state => state);

  useEffect(() => {
    // focusState 변경 API 먼저 날리기
    post_chatroom_focus(userIdx, roomId, true).then(res => {
      console.log('post focusState success to true! roomId :', roomId);
    });

    let messageEvent = undefined;

    // 채팅메세지 SSE 연결
    if (isLoggedIn && !isListeningToMessage) {
      messageEvent = new EventSource(
        `${requests.chat_base_url + requests.GET_MESSAGES(roomId)}`
      );

      // 최초 연결
      messageEvent.onopen = event => {
        console.log('open : chat detail message');
      };

      // 새로운 메세지 수신
      messageEvent.onmessage = event => {
        const parsedData = JSON.parse(event.data);
        console.log('new message', parsedData);
        setMessageList(prev => {
          return [...prev, parsedData];
        });
      };

      // 에러 발생
      messageEvent.onerror = event => {
        messageEvent.close();
      };
    }

    return () => {
      messageEvent.close();
      post_chatroom_focus(userIdx, roomId, false).then(res => {
        console.log('post focusState success to false! roomId :', roomId);
      });
      // GET 요청으로 받은 데이터로 해당 채팅방 정보를 갈아끼움
      get_updated_chatroom(roomId).then(data => {
        console.log('get updated chatroom :', data);
        updateChatRoom(roomId, data);
      });
    };
  }, []);

  // 사용자가 입력한 메세지
  const [messageInput, setMessageInput] = useState();

  const status = '바꾸중';

  // 상단 버튼 클릭 시 실행될 함수들
  const navigate = useNavigate();
  const changeStatusHandler = () => {};
  const sendReviewHandler = () => {
    navigate('/review');
  };

  // 메시지 전송 함수
  const sendMessageHandler = async () => {
    const data = {
      senderIdx: userIdx,
      receiverIdx: yourIdx,
      senderNickname: myNickname,
      receiverNickname: yourNickname,
      roomId: roomId,
      msg: messageInput,
    };

    await post_message(data);
  };

  /*
  메세지 데이터 예시
  {
	"chatId":"63da269427abdd671795c90e",
	"msg":"ㅁㄴㅇ",
	"receiverIdx":6,
	"senderIdx":5,
	"receiverNickname":"배정현",
	"senderNickname":"김소정",
	"roomId":"63da08172a56c42cc9b85a61",
	"createdAt":"2023-02-01T17:45:08.865"
}
  */
  return (
    <div>
      <TopBar2 title={yourNickname} isCheck={false} />
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
        {messageList
          ? messageList.map(message => {
              const messageType =
                message.receiverIdx === userIdx ? 'receive' : 'send';
              const { year, month, day, hour, minute } = FormatDate(
                message.createdAt
              );
              return (
                <MessageSection type={messageType} key={message.chatId}>
                  <MessageColumn type={messageType}>
                    <div>
                      <Bubble type={messageType}>{message.msg}</Bubble>
                      <span>{`${hour} : ${minute} ${
                        hour >= 12 ? 'PM' : 'AM'
                      }`}</span>
                    </div>
                  </MessageColumn>
                </MessageSection>
              );
            })
          : ''}
      </ChatContent>
      <MessageForm action="">
        <TextInput type="text" value={messageInput} />
        <img src={icon_send} onClick={sendMessageHandler} alt="" />
      </MessageForm>
    </div>
  );
}

export default ChatDetail;
