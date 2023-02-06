import React from 'react';
import icon_exchange from 'assets/icons/exchange.svg';
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

function BagguListItem({ baggu }) {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <Avatar img={baggu.requestProfileImgUrl}></Avatar>
        <Avatar img={baggu.receiveProfileImgUrl}></Avatar>
        <Info>
          <section>
            <Nickname>{baggu.requestNickname}</Nickname>
            <Nickname>{baggu.requestNickname}</Nickname>
          </section>
          <Notifycation />
        </Info>
      </Wrapper>
      <div className="p-2 flex w-full justify-center hover:bg-primary-hover border-b gap-2 relative">
        <Product img={baggu.requestItemImgUrl}></Product>
        <img src={icon_exchange} alt="" />
        <Product img={baggu.receiveItemImgUrl}></Product>
      </div>
    </Container>
  );
}

export default BagguListItem;
