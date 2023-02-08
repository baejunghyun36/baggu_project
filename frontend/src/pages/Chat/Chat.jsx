import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

// components
import ChatListItem from 'components/common/ChatListItem';
import HeadingBar from 'components/common/HeadingBar';

// react-query
import { useQuery } from 'react-query';
import axios from 'axios';
import { chatStore } from 'store/chat';

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

function Chat() {
  // 중앙에 저장된 채팅방 리스트
  // const { chatRoomList } = chatStore(state => state);

  // 채팅방 정보 예시
  const chatRoomList = [
    {
      roomId: '63da08172a56c42cc9b85a61',
      userIdx: [5, 6],
      readNotCnt: [3, 0],
      userActive: [false, false],
      nickname: ['서울사람', '당산사람'],
      userImg: ['유저A 이미지 링크', '유저B 이미지 링크'],
      itemImg: ['아이템A 이미지 링크', '아이템B 이미지 링크'],
      itemIdx: [5, 6],
      lastContent: '야야야야ㅑ',
      createdAt: '2023-02-01T15:35:03.381',
    },
    {
      roomId: '63da08172a56c42cc9b85a61',
      userIdx: [5, 6],
      readNotCnt: [3, 0],
      userActive: [false, false],
      nickname: ['서울사람', '당산사람'],
      userImg: ['유저A 이미지 링크', '유저B 이미지 링크'],
      itemImg: ['아이템A 이미지 링크', '아이템B 이미지 링크'],
      itemIdx: [5, 6],
      lastContent: '야야야야ㅑ',
      createdAt: '2023-02-01T15:35:03.381',
    },
    {
      roomId: '63da08172a56c42cc9b85a61',
      userIdx: [5, 6],
      readNotCnt: [3, 0],
      userActive: [false, false],
      nickname: ['서울사람', '당산사람'],
      userImg: ['유저A 이미지 링크', '유저B 이미지 링크'],
      itemImg: ['아이템A 이미지 링크', '아이템B 이미지 링크'],
      itemIdx: [5, 6],
      lastContent: '야야야야ㅑ',
      createdAt: '2023-02-01T15:35:03.381',
    },
    {
      roomId: '63da08172a56c42cc9b85a61',
      userIdx: [5, 6],
      readNotCnt: [3, 0],
      userActive: [false, false],
      nickname: ['서울사람', '당산사람'],
      userImg: ['유저A 이미지 링크', '유저B 이미지 링크'],
      itemImg: ['아이템A 이미지 링크', '아이템B 이미지 링크'],
      itemIdx: [5, 6],
      lastContent: '야야야야ㅑ',
      createdAt: '2023-02-01T15:35:03.381',
    },
    {
      roomId: '63da08172a56c42cc9b85a61',
      userIdx: [5, 6],
      readNotCnt: [3, 0],
      userActive: [false, false],
      nickname: ['서울사람', '당산사람'],
      userImg: ['유저A 이미지 링크', '유저B 이미지 링크'],
      itemImg: ['아이템A 이미지 링크', '아이템B 이미지 링크'],
      itemIdx: [5, 6],
      lastContent: '야야야야ㅑ',
      createdAt: '2023-02-01T15:35:03.381',
    },
    {
      roomId: '63da08172a56c42cc9b85a61',
      userIdx: [5, 6],
      readNotCnt: [3, 0],
      userActive: [false, false],
      nickname: ['서울사람', '당산사람'],
      userImg: ['유저A 이미지 링크', '유저B 이미지 링크'],
      itemImg: ['아이템A 이미지 링크', '아이템B 이미지 링크'],
      itemIdx: [5, 6],
      lastContent: '야야야야ㅑ',
      createdAt: '2023-02-01T15:35:03.381',
    },
    {
      roomId: '63da08172a56c42cc9b85a61',
      userIdx: [5, 6],
      readNotCnt: [3, 0],
      userActive: [false, false],
      nickname: ['서울사람', '당산사람'],
      userImg: ['유저A 이미지 링크', '유저B 이미지 링크'],
      itemImg: ['아이템A 이미지 링크', '아이템B 이미지 링크'],
      itemIdx: [5, 6],
      lastContent: '야야야야ㅑ',
      createdAt: '2023-02-01T15:35:03.381',
    },
    {
      roomId: '63da08172a56c42cc9b85a61',
      userIdx: [5, 6],
      readNotCnt: [3, 0],
      userActive: [false, false],
      nickname: ['서울사람', '당산사람'],
      userImg: ['유저A 이미지 링크', '유저B 이미지 링크'],
      itemImg: ['아이템A 이미지 링크', '아이템B 이미지 링크'],
      itemIdx: [5, 6],
      lastContent: '야야야야ㅑ',
      createdAt: '2023-02-01T15:35:03.381',
    },
    {
      roomId: '63da08172a56c42cc9b85a61',
      userIdx: [5, 6],
      readNotCnt: [3, 0],
      userActive: [false, false],
      nickname: ['서울사람', '당산사람'],
      userImg: ['유저A 이미지 링크', '유저B 이미지 링크'],
      itemImg: ['아이템A 이미지 링크', '아이템B 이미지 링크'],
      itemIdx: [5, 6],
      lastContent: '야야야야ㅑ',
      createdAt: '2023-02-01T15:35:03.381',
    },
  ];
  return (
    <Wrapper id="chat-wrapper">
      <HeadingBar title="채팅" />
      <ChatList>
        {chatRoomList.map(chatRoom => (
          <ChatListItem key={chatRoom.roomId} info={chatRoom} />
        ))}
      </ChatList>
    </Wrapper>
  );
}

export default Chat;
