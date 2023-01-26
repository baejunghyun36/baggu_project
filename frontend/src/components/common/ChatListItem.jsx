import Avatar from 'pages/Chat/Chat';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`flex w-full`}
  & {
    div {
      ${tw`flex-col`}
    }
  }
`;

function ChatListItem({
  userProfile,
  nickname,
  recentMessage,
  isAlert,
  itemImg,
  bagguStatus,
}) {
  return (
    <Container>
      {/* <Avatar img={userProfile} /> */}
      <div>
        <p>{nickname}</p>
        <p>{recentMessage}</p>
        <p>{userProfile}</p>
        <p>{isAlert}</p>
        <p>{itemImg}</p>
        <p>{bagguStatus}</p>
      </div>
    </Container>
  );
}

export default ChatListItem;
