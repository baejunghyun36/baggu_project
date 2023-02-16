import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import tw, { styled, css } from 'twin.macro';

// icon, image
import icon_exchange from 'assets/icons/exchange.svg';
import icon_send from 'assets/icons/send.svg';
import img_avatar from 'assets/images/avatar_1x.png';

// components
import TopBar2 from 'components/common/TopBar2';
import Modal from 'components/common/Modal';

// API
import { useQuery } from 'react-query';
import axios from 'axios';
import {
  get_chatroom_detail,
  get_chatroom_message,
  get_updated_chatroom,
  post_chatroom_focus,
  post_message,
  put_trade_status,
} from 'api/apis/chat';
import { chatStore } from 'store/chat';
import requests from 'api/config';

// hooks
import FormatDate from 'hooks/FormatDate';
import { post_trade_status } from 'api/apis/trade';
import { reviewStore } from 'store/reviewStore';
import FormatDateForChat from 'hooks/FormatDateForChat';

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

const ButtonStyles = {
  0: tw`bg-white text-secondary border-1 border-secondary hover:bg-secondary hover:text-white`,
  1: tw`bg-secondary text-white hover:bg-white hover:text-secondary hover:border-1 hover:border-secondary`,
  2: tw`bg-grey1 text-grey2`,
};
const Button = styled.div`
  ${tw`text-sub-bold rounded-full flex justify-center items-center h-5 w-fit p-2`}
  ${props => ButtonStyles[props.buttonType]}
`;
const ChatContentWrapper = styled.div`
  ${tw`relative`}
  ${css`
    height: calc(100vh - 225px);
  `}
`;

const ChatContent = styled.div`
  ${tw`p-2 absolute bottom-0 h-full overflow-y-auto`}
`;

const MessageForm = styled.div`
  ${tw`h-9 bg-grey1 flex justify-center items-center gap-2`}

  & {
    img {
      ${tw`h-4 w-4`}
    }
  }
`;

const TextInput = tw.input`w-[320px] h-[44px] p-1 rounded`;

const MessageSection = styled.section`
  ${tw`flex py-1 w-full gap-1`}
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
  // 모달 상태
  const [showModal, setShowModal] = useState(false);
  // 채팅메세지 SSE 구독 상태
  const [isListeningToMessage, setIsListeningToMessage] = useState(false);
  // 이 채팅방에서 주고 받은 모든 메세지 state
  const [messageList, setMessageList] = useState([]);
  // 사용자가 입력한 메세지
  const [messageInput, setMessageInput] = useState('');
  // 후기 남기기 버튼을 누르면 API 요청시 필요한 데이터를 저장
  const {
    saveYourIdx,
    saveYourNickname,
    saveTargetItemIdx,
    saveWriteUserIdx,
    saveReviewText,
    saveRoomId,
  } = reviewStore(state => state);

  // 현재 페이지의 파라미터
  const { roomId } = useParams();

  // 모든 채팅방 정보
  const { chatRoomList, updateChatRoom } = chatStore(state => state);
  // 주의! /chat에서 채팅방을 눌러 들어갔을때만 정보를 가져올 수 있음
  // 현재 채팅방에 대한 정보
  const chatRoomInfo = chatRoomList.find(
    chatRoom => chatRoom.roomId === roomId
  );
  console.log('chatRoomInfo :', chatRoomInfo);
  // 현재 로그인된 사용자
  const userIdx = Number(localStorage.getItem('userIdx'));
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // 상대 유저의 정보
  const targetIdx = chatRoomInfo.userIdx.findIndex(x => x !== userIdx);
  const yourNickname = chatRoomInfo.nickname[targetIdx];
  const yourIdx = chatRoomInfo.userIdx[targetIdx];
  // 내 닉네임
  const myNickname = chatRoomInfo.nickname[1 - targetIdx];

  // 거래 요약 정보
  // 1. 아이템 이미지
  const myItemImg = chatRoomInfo.itemImg[1 - targetIdx];
  const yourItemImg = chatRoomInfo.itemImg[targetIdx];
  // 2. 아이템 idx (이미지 클릭시 해당 아이템 디테일 페이지로 이동)
  const myItemIdx = chatRoomInfo.itemIdx[1 - targetIdx];
  const yourItemIdx = chatRoomInfo.itemIdx[targetIdx];
  // 3. 거래 상태 : true-거래완료, false-거래진행중
  const status = chatRoomInfo.tradeCompleteStatus;
  // 4. 리뷰 작성 상태 : 0-아무 후기도 작성하지 않음, 1-유저후기 작성함, 2-거래후기까지 모두 작성
  const myReviewStatus = chatRoomInfo.reviewState[1 - targetIdx];

  // 상태에 따라 거래요약에 보여질 버튼 타입 설정
  let buttonType = undefined;
  if (status === false) {
    buttonType = 0;
  } else if (
    status === true &&
    (myReviewStatus === 0 || myReviewStatus === 1)
  ) {
    buttonType = 1;
  } else {
    buttonType = 2;
  }
  // buttonType에 따라 버튼 텍스트
  let buttonText = '';
  switch (buttonType) {
    case 0:
      buttonText = '거래상태 변경';
      break;
    case 1:
      buttonText = '후기 남기기';
      break;
    case 2:
      buttonText = '후기 남기기';
      break;
    default:
      break;
  }

  // 새로운 메세지 올때마다 스크롤 Top 설정하기
  function handleScrollPosition() {
    const target = document.getElementById('ChatContent');
    target.scrollBottom = target.scrollHeight;
  }

  useEffect(() => {
    // focusState 변경 API 먼저 날리기
    post_chatroom_focus(userIdx, roomId, true).then(res => {
      // console.log('post focusState success to true! roomId :', roomId);
    });

    let messageEvent = undefined;

    // 채팅메세지 SSE 연결
    if (isLoggedIn && !isListeningToMessage) {
      messageEvent = new EventSource(
        `${requests.chat_base_url + requests.GET_MESSAGES(roomId)}`
      );

      // 최초 연결
      messageEvent.onopen = event => {
        // console.log('open : chat detail message');
      };

      // 새로운 메세지 수신
      messageEvent.onmessage = event => {
        const parsedData = JSON.parse(event.data);
        // console.log('new message', parsedData);
        setMessageList(prev => {
          return [...prev, parsedData];
        });
        document.getElementById('ChatContent').scrollTop =
          document.getElementById('ChatContent').scrollHeight;
      };

      // 에러 발생
      messageEvent.onerror = event => {
        messageEvent.close();
      };
    }

    return () => {
      messageEvent.close();
      post_chatroom_focus(userIdx, roomId, false).then(res => {
        // console.log('post focusState success to false! roomId :', roomId);
      });
      // GET 요청으로 받은 데이터로 해당 채팅방 정보를 갈아끼움
      get_updated_chatroom(roomId).then(data => {
        // console.log('get updated chatroom :', data);ㄴ
        updateChatRoom(roomId, data);
      });
    };
  }, []);

  // 모달창 열기, 닫기
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  // 거래상태 변경
  const changeStatusHandler = () => {
    const data1 = {
      tradeDetailIdx: chatRoomInfo.tradeDetailIdx,
      itemIdx: chatRoomInfo.itemIdx,
      userNickname: chatRoomInfo.nickname,
      userIdx: chatRoomInfo.userIdx,
      userImg: chatRoomInfo.userImg,
    };
    const data2 = {
      roomId: roomId,
    };

    // 메인서버에 POST
    post_trade_status(data1);
    // 채팅서버에 PUT
    put_trade_status(userIdx, data2);
    navigate(`/userReview`);
  };

  // 유저가 입력한 메세지 state에 저장
  const onChangeHandler = e => {
    setMessageInput(e.target.value);
  };

  // 메시지 전송 함수
  const sendMessageHandler = async () => {
    if (messageInput) {
      const data = {
        senderIdx: userIdx,
        receiverIdx: yourIdx,
        senderNickname: myNickname,
        receiverNickname: yourNickname,
        roomId: roomId,
        msg: messageInput,
      };
      console.log('send message data', data);
      await post_message(data);
      setMessageInput('');
    }
  };

  // 후기 남기기
  // 후기 남기기 버튼을 누르면 API 요청시 필요한 데이터를 저장
  // const {
  //   saveYourIdx,
  //   saveYourNickname,
  //   saveTargetItemIdx,
  //   saveWriteUserIdx,
  //   saveRoomId,
  // } = reviewStore(state => state);

  const navigate = useNavigate();
  const sendReviewHandler = () => {
    saveYourIdx(yourIdx);
    saveYourNickname(yourNickname);
    saveTargetItemIdx(yourItemIdx);
    saveWriteUserIdx(userIdx);
    saveRoomId(roomId);

    if (myReviewStatus === 0) {
      navigate('/userReview');
    } else if (myReviewStatus === 1) {
      navigate('/bagguReview');
    }
  };

  return (
    <div>
      {showModal ? (
        <Modal
          title="거래 상태 변경"
          content={`${yourNickname}님과의 거래가 완료되었나요?`}
          confirmText="확인"
          cancelText="취소"
          onConfirm={changeStatusHandler}
          onCancel={closeModal}
        />
      ) : (
        ''
      )}
      <TopBar2
        title={yourNickname}
        isCheck={false}
        onClickTitle={() => navigate(`/user/${yourIdx}`)}
      />
      <Summary>
        <div>
          <Product
            img={yourItemImg}
            alt=""
            onClick={() => navigate(`/item/${yourItemIdx}`)}
          />
          <img src={icon_exchange} alt="" />
          <Product
            img={myItemImg}
            alt=""
            onClick={() => navigate(`/item/${myItemIdx}`)}
          />
        </div>
        <Button
          buttonType={buttonType}
          onClick={!status ? openModal : sendReviewHandler}
        >
          <span>{buttonText}</span>
        </Button>
      </Summary>
      <ChatContentWrapper id="ChatContentWrapper">
        <ChatContent id="ChatContent">
          {messageList
            ? messageList.map(message => {
                const messageType =
                  message.receiverIdx === userIdx ? 'receive' : 'send';
                const { year, month, day, hour, minute } = FormatDateForChat(
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
      </ChatContentWrapper>
      <MessageForm>
        <TextInput
          type="text"
          value={messageInput}
          onChange={onChangeHandler}
          onKeyPress={e => (e.key === 'Enter' ? sendMessageHandler() : '')}
        />
        <img src={icon_send} onClick={sendMessageHandler} alt="" />
      </MessageForm>
    </div>
  );
}

export default ChatDetail;
