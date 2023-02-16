import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// icons
import home from '../../assets/icons/nav_home.svg';
import home_active from '../../assets/icons/nav_home_active.svg';
import myBaggu from '../../assets/icons/nav_myBaggu.svg';
import myBaggu_active from '../../assets/icons/nav_mybaggu_active.svg';
import itemCreate from '../../assets/icons/itemCreate.svg';
import chat from '../../assets/icons/nav_chat.svg';
import chat_active from '../../assets/icons/nav_chat_active.svg';
import myProfile from '../../assets/icons/nav_myProfile.svg';
import myProfile_active from '../../assets/icons/nav_myprofile_active.svg';

// API
import requests from 'api/config';
import { get_chatrooms, get_updated_chatroom } from 'api/apis/chat';
import { chatStore } from 'store/chat';
import { useQuery } from 'react-query';

// twin.macro
import tw, { styled } from 'twin.macro';

// Styled Component
const Notification = styled.div`
  ${tw`h-1 w-1 flex justify-center items-center bg-secondary text-tiny text-white absolute rounded-full right-0`}
  ${props => (props.total ? tw`` : tw`hidden`)}
`;

// Main Component
function BottomNav() {
  const userIdx = localStorage.getItem('userIdx');

  /// 채팅방리스트 SSE 구독 상태
  const [isListeningToRoom, setIsListeningToRoom] = useState(false);
  // 채팅방 변경사항 SSE 구독 상태
  const [isListeningToRoomUpdate, setIsListeningToRoomUpdate] = useState(false);
  // 채팅방리스트 전역 저장소
  const {
    chatRoomList,
    totalUnreadMsg,
    addChatRoom,
    clearChatRoom,
    updateChatRoom,
  } = chatStore(state => state);

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem('isLoggedIn');
  //   const userIdx = localStorage.getItem('userIdx');

  //   // 채팅방리스트 SSE
  //   let chatRoomEvent = undefined;
  //   // 채팅방 변경사항 SSE
  //   let chatRoomUpdateEvent = undefined;

  //   // 채팅방리스트 SSE 연결
  //   if (isLoggedIn && !isListeningToRoom) {
  //     chatRoomEvent = new EventSource(
  //       `${requests.chat_base_url + requests.GET_CHATROOMS(userIdx)}`
  //     );

  //     // 최초 연결
  //     chatRoomEvent.onopen = event => {
  //       console.log('open : chatroom', event);
  //     };

  //     // 채팅방에 대한 새로운 변경사항 도착
  //     chatRoomEvent.onmessage = event => {
  //       const parsedData = JSON.parse(event.data);
  //       console.log('new chatroom sse', parsedData);
  //       addChatRoom(parsedData);
  //     };

  //     chatRoomEvent.onerror = event => {
  //       console.log('error and closed');
  //       chatRoomEvent.close();
  //     };

  //     setIsListeningToRoom(true);
  //   }

  //   // 채팅방 변경사항 SSE 연결
  //   if (isLoggedIn && !isListeningToRoomUpdate) {
  //     chatRoomUpdateEvent = new EventSource(
  //       `${requests.chat_base_url + requests.GET_CHATROOMS_UPDATE(userIdx)}`
  //     );

  //     // 최초 연결
  //     chatRoomUpdateEvent.onopen = event => {
  //       console.log('open : 채팅방 변경사항');
  //     };

  //     // 변경사항 수신
  //     chatRoomUpdateEvent.onmessage = async event => {
  //       // 변경사항이 발생한 채팅방의 roomId
  //       const roomId = JSON.parse(event.data).roomId;
  //       /*
  //       {
  //         "chatId":"63da0f656408703b4fae5d21",
  //         "msg":"뭐함?",
  //         "receiverIdx":5,
  //         "senderIdx":6,
  //         "roomId":"63da08172a56c42cc9b85a61",
  //         "createdAt":"2023-02-01T16:06:13.261"
  //       }
  //        */
  //       // GET 요청으로 받은 데이터로 해당 채팅방 정보를 갈아끼움
  //       await get_updated_chatroom(roomId).then(data => {
  //         console.log('get updated chatroom :', data);
  //         updateChatRoom(roomId, data);
  //       });
  //     };

  //     chatRoomUpdateEvent.onerror = event => {
  //       console.log('closed : 채팅방 변경사항');
  //       chatRoomUpdateEvent.close();
  //     };

  //     setIsListeningToRoomUpdate(true);
  //   }
  //   // clean up function!
  //   return () => {
  //     chatRoomEvent.close();
  //     console.log('close chatroom sse');
  //     // store는 전역이지만, SSE는 해당 컴포넌트를 떠나면 clean up 함수로 연결이 끊기기 때문에
  //     // 이후 컴포넌트가 다시 렌더링 됐을 때 중복되어 저장되는 것을 방지
  //     clearChatRoom();
  //   };
  // }, []);

  let targetIdx = undefined;
  let totalUnreadMessage = 0;

  if (chatRoomList.length) {
    targetIdx = chatRoomList[0].userIdx.findIndex(x => x === Number(userIdx));
    chatRoomList.forEach(chatRoom => {
      totalUnreadMessage += chatRoom.readNotCnt[targetIdx];
    });
  }

  // 온보딩 페이지에서 하단바 숨기기
  const location = useLocation().pathname;
  if (
    location.startsWith('/login') ||
    location.startsWith('/item') ||
    location.startsWith('/userReview') ||
    location.startsWith('/bagguReview') ||
    location.startsWith('/makeRequest') ||
    location.startsWith('/chooseRequest') ||
    location.startsWith('/myprofile') ||
    location.startsWith('/kakaoLogin') ||
    location.startsWith('/chat/')
  ) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 fixed bottom-0 bg-white border-t w-full h-[98px] p-1">
      <Link to="/" className="h-fit">
        <div className="flex flex-col items-center">
          <img
            src={home}
            alt="nav button to home"
            className={`${location === '/' ? 'hidden' : ''}`}
          />
          <img
            src={home_active}
            alt="nav button to home"
            className={`${location === '/' ? '' : 'hidden'}`}
          />
          <span
            className={`${
              location === '/' ? 'text-primary' : 'text-grey3'
            } font-pretendard text-sub-bold `}
          >
            홈
          </span>
        </div>
      </Link>
      <Link to="/mybaggu" className="h-fit">
        <div className="flex flex-col items-center">
          <img
            src={myBaggu}
            alt="nav button to my baggu"
            className={`${location === '/mybaggu' ? 'hidden' : ''}`}
          />
          <img
            src={myBaggu_active}
            alt="nav button to my baggu"
            className={`${location === '/mybaggu' ? '' : 'hidden'}`}
          />
          <span
            className={`${
              location === '/mybaggu' ? 'text-primary' : 'text-grey3'
            } font-pretendard text-sub-bold `}
          >
            바꾸관리
          </span>
        </div>
      </Link>
      <Link to="/item/create" className="h-fit">
        <div className="flex flex-col items-center">
          <img src={itemCreate} alt="button to create article" />
        </div>
      </Link>
      <Link to="/chat" className="h-fit">
        <div className="flex flex-col items-center relative">
          <img
            src={chat}
            alt="nav button to chat"
            className={`${location === '/chat' ? 'hidden' : ''}`}
          />
          <img
            src={chat_active}
            alt="nav button to chat"
            className={`${location === '/chat' ? '' : 'hidden'}`}
          />
          <span
            className={`${
              location === '/chat' ? 'text-primary' : 'text-grey3'
            } font-pretendard text-sub-bold `}
          >
            채팅
          </span>
          <Notification total={totalUnreadMessage} />
        </div>
      </Link>
      {/* 유저 id 받아온 이후 수정 */}
      {/* <Link to={`/myprofile/${user.id}`} className="h-fit"> */}
      <Link to="/myprofile" className="h-fit">
        <div className="flex flex-col items-center">
          <img
            src={myProfile}
            alt="nav button to my profile"
            className={`${location === '/myprofile' ? 'hidden' : ''}`}
          />
          <img
            src={myProfile_active}
            alt="nav button to my profile"
            className={`${location === '/myprofile' ? '' : 'hidden'}`}
          />
          <span
            className={`${
              location === '/myprofile' ? 'text-primary' : 'text-grey3'
            } font-pretendard text-sub-bold `}
          >
            내프로필
          </span>
        </div>
      </Link>
    </div>
  );
}

export default BottomNav;
