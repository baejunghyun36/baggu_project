import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

// components
import ChatListItem from 'components/common/ChatListItem';
import HeadingBar from 'components/common/HeadingBar';

// react-query
import { useQuery } from 'react-query';
import axios from 'axios';

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
    height: calc(100vh - 98px - 60px);
  `}
`;

function Chat() {
  const API_URL = `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`;
  const getChat = () => {
    return axios.get(API_URL);
  };

  const { isLoading, isError, data, error } = useQuery('getChat', getChat, {
    staleTime: 10000,
  });
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error : {error.message}</span>;
  }
  const movies = data.data.data.movies;

  return (
    <Wrapper id="chat-wrapper">
      <HeadingBar title="채팅" />
      <ChatList>
        {movies.map(chat => (
          <ChatListItem
            key={chat.id}
            userProfile={chat.background_image}
            nickname={chat.title}
            recentMessage={chat.title}
            isAlert={true}
            itemImg={chat.background_image}
            bagguStatus="바꾸중"
            id={chat.id}
          />
        ))}
      </ChatList>
    </Wrapper>
  );
}

export default Chat;
