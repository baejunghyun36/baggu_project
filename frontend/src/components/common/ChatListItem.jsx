import React from 'react';
import { useNavigate } from 'react-router';
// import styled from 'styled-components';
import tw, { styled, css } from 'twin.macro';

const Container = styled.div`
  ${tw`w-full`}
`;

const Wrapper = tw.div`flex p-2 border-b justify-between hover:bg-primary-hover`;

const Avatar = styled.div`
  ${tw`bg-primary rounded-full w-6 h-6 bg-cover bg-center mr-2`}
  ${props => css`
    background-image: url(${props.img});
  `}
`;

const Info = styled.div`
  ${tw`relative flex mr-2 overflow-hidden box-content whitespace-nowrap text-ellipsis`}
  ${css`
    width: calc(100% - 112px);
  `}

  & {
    section {
      ${tw`flex-col`}
    }
  }
`;
const Nickname = tw.p`text-main-bold `;
const Message = tw.span`text-sub`;
const Notifycation = tw.div`w-1 h-1 rounded-full bg-secondary absolute right-0`;
const Product = styled.div`
  ${tw`w-6 h-6 rounded bg-cover bg-center`}
  ${props =>
    css`
      background-image: url(${props.img});
    `}
`;

const SendReviewBtn = styled.div`
  ${tw`w-full bg-white h-4 flex justify-center items-center text-black  hover:bg-primary-hover hover:text-primary border-b `}
  & {
    p {
      ${tw`text-tiny-bold `}
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
  id,
}) {
  const navigate = useNavigate();

  const goChatDetail = () => {
    navigate(`/chat/${id}`);
  };
  return (
    <Container>
      <Wrapper onClick={goChatDetail}>
        <Avatar img={userProfile}></Avatar>
        <Info>
          <section>
            <Nickname>{nickname}</Nickname>
            <Message>{recentMessage}</Message>
          </section>
          <Notifycation />
        </Info>
        <Product img={itemImg}></Product>
      </Wrapper>
      <SendReviewBtn>
        <p>후기 보내기</p>
      </SendReviewBtn>
    </Container>
  );
}

export default ChatListItem;
