import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

// components
import ChatListItem from 'components/common/ChatListItem';

// react-query
import { useQuery } from 'react-query';
import axios from 'axios';

// styled components
const Wrapper = styled.div`
  ${tw`w-full h-full`}
`;

function Chat() {
  const queryFn = () => {
    return axios.get(API_URL);
  };

  const API_URL = `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`;

  const { isLoading, isError, data, error } = useQuery('getChat', queryFn, {
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
    <Wrapper>
      {movies.map(chat => (
        <ChatListItem
          key={chat.id}
          userProfile={chat.background_image}
          nickname={chat.title}
          recentMessage={chat.title}
          isAlert={true}
          itemImg={chat.background_image}
          bagguStatus="바꾸중"
        />
      ))}
    </Wrapper>
  );
}

export default Chat;
