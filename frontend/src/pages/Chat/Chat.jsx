import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

// components
import ChatListItem from 'components/common/ChatListItem';
import HeadingBar from 'components/common/HeadingBar';

// react-query
import { useQuery } from 'react-query';
import axios from 'axios';
import { chatStore } from 'store/chat';

// API
import requests from 'api/config';
import { get_chatrooms } from 'api/apis/chat';

// styled components
const Wrapper = styled.div`
  ${tw`w-full relative`}
  ${css`
    height: calc(100% - 300px);
  `}
`;

const ChatList = styled.div`
  ${tw`relative top-[60px] overflow-scroll overflow-x-hidden`}
  ${css`
    height: calc(100vh - 158px);
  `}
`;

// Main Component
function Chat() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userIdx = localStorage.getItem('userIdx');

  // 채팅방리스트 전역 저장소
  const { chatRoomList, addChatRoom, clearChatRoom } = chatStore(
    state => state
  );
  // 채팅방리스트 state
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    setChatList(chatRoomList);
  }, [chatRoomList]);

  return (
    <Wrapper id="chat-wrapper">
      <HeadingBar title="채팅" />
      <ChatList>
        {chatList ? (
          chatList.map(chatRoom => (
            <ChatListItem key={chatRoom.roomId} info={chatRoom} />
          ))
        ) : (
          <span>채팅기록이 없습니다.</span>
        )}
      </ChatList>
    </Wrapper>
  );
}

export default Chat;
