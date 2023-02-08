import React from 'react';
import { useNavigate } from 'react-router';
import tw, { styled, css } from 'twin.macro';

// Styled Component
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
const Nickname = tw.p`text-main-bold`;
const Message = tw.span`text-sub text-grey3`;
const Notification = styled.div`
  ${tw`w-2 h-2 rounded-full bg-secondary absolute right-0 text-tiny flex justify-center items-center text-white`}
  ${props => (props.unreadCnt ? tw`` : tw`hidden`)}
`;
const Product = styled.div`
  ${tw`w-6 h-6 rounded bg-cover bg-center`}
  ${props =>
    css`
      background-image: url(${props.img});
    `}
`;

const SendReviewBtn = styled.div`
  ${tw`w-full bg-white flex justify-center items-center text-black p-1 hover:bg-primary-hover hover:text-primary border-b `}
  & {
    p {
      ${tw`text-sub-bold `}
    }
  }
`;

// Main Component
function ChatListItem({ info }) {
  const navigate = useNavigate();

  const goChatDetail = () => {
    navigate(`/chat/${info.roomId}`);
  };

  // 현재 로그인하고 있는 사용자
  const userIdx = Number(window.localStorage.getItem('userIdx'));

  // 채팅방 정보의 userIdx 중 현재 로그인한 사용자의 인덱스
  // const targetIdx = info.userIdx.findIndex(idx => idx === userIdx);
  // console.log(info.userIdx.findIndex(idx => idx === userIdx));
  const targetIdx = 0;

  // 유저에게 보여줘야할 데이터 선택
  const userProfile = info.userImg[targetIdx];
  const nickname = info.nickname[targetIdx];
  const recentMessage = info.lastContent;
  const itemImg = info.itemImg[targetIdx];
  const unreadCnt = info.readNotCnt[targetIdx];

  return (
    <Container>
      <Wrapper onClick={goChatDetail}>
        <Avatar img={userProfile} />
        <Info>
          <section>
            <Nickname>{nickname}</Nickname>
            <Message>{recentMessage}</Message>
          </section>
          <Notification unreadCnt={unreadCnt}>
            <span>{unreadCnt ? unreadCnt : ''}</span>
          </Notification>
        </Info>
        <Product img={itemImg} />
      </Wrapper>
      <SendReviewBtn onClick={() => navigate('/userReview')}>
        <p>후기 보내기</p>
      </SendReviewBtn>
    </Container>
  );
}

export default ChatListItem;
