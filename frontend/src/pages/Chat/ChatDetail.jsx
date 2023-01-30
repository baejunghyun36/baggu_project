import React from 'react';
import { useNavigate, useParams } from 'react-router';
import tw, { styled, css } from 'twin.macro';

// icon
import icon_exchange from 'assets/icons/exchange.svg';
import icon_send from 'assets/icons/send.svg';

// components
import TopBar2 from 'components/common/TopBar2';

// react-query
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

// styled components
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

const Button = styled.div`
  ${tw`text-tiny-bold rounded flex justify-center items-center h-[60px] w-[60px] p-1`}
  ${props =>
    props.status === '바꾸중'
      ? tw`bg-white border-1 border-secondary text-secondary`
      : tw`bg-secondary text-white`}
`;

const ChatContent = styled.div`
  ${css`
    height: calc(100vh - 60px - 92.5px - 72px);
  `}
  ${tw`overflow-scroll`}
`;

const MessageForm = styled.form`
  ${tw`h-9 bg-grey1 flex justify-center items-center gap-2`}

  & {
    img {
      ${tw`h-4 w-4`}
    }
  }
`;

const TextInput = tw.input`w-[320px] h-[44px] p-1 rounded`;

// Chat Detail component
function ChatDetail() {
  const navigate = useNavigate();

  // state
  const [message, setMessage] = useState('');

  // API
  const { id } = useParams();
  const API_URL = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;
  const queryFn = () => {
    return axios.get(API_URL);
  };

  const { isLoading, isError, data, error } = useQuery(
    'getChatDetail',
    queryFn
  );
  if (isLoading) {
    return <span>Loading...</span>;
  }

  const movie = data.data.data.movie;
  const status = '바꾸중';

  // 상단 버튼 클릭 시 실행될 함수들
  const changeStatusHandler = () => {};
  const sendReviewHandler = () => {
    navigate('/review');
  };

  // 메시지 전송 함수
  const sendMessageHandler = () => {
    console.log();
  };
  return (
    <div>
      <TopBar2 title={movie.title} isCheck={false} />
      <Summary>
        <div>
          <Product img={movie.background_image}></Product>
          <img src={icon_exchange} alt="" />
          <Product img={movie.background_image}></Product>
        </div>
        <Button
          status="바꾸중"
          onClick={
            status === '바꾸중' ? changeStatusHandler : sendReviewHandler
          }
        >
          {status === '바꾸중' ? (
            <span>
              거래
              <br />
              상태
              <br />
              변경
            </span>
          ) : (
            <span>
              후기 <br />
              남기기
            </span>
          )}
        </Button>
      </Summary>
      <ChatContent></ChatContent>
      <MessageForm action="">
        <TextInput type="text" value={message} />
        <img src={icon_send} onClick={sendMessageHandler} />
      </MessageForm>
    </div>
  );
}

export default ChatDetail;
