import React from 'react';
import { useState } from 'react';
import icon_exchange from 'assets/icons/exchange.svg';
import { useNavigate } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { authInstance } from 'api/axios';
import requests from 'api/config';
// import styled from 'styled-components';
import tw, { styled, css } from 'twin.macro';
import heart_unliked from '../../assets/icons/heart_unliked.svg';
import heart_liked from '../../assets/icons/heart_liked.svg';
import FormatDate from 'hooks/FormatDate';
import GetRelativeTime from 'hooks/GetRelativeTime';

const Container = styled.div`
  ${tw`w-full`}
`;

const Wrapper = tw.div`flex p-2 border-b justify-between hover:bg-primary-hover`;

const Avatar = styled.div`
  ${tw`bg-primary rounded-full w-5 h-5 bg-cover bg-center mr-2`}
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

const Product = styled.div`
  ${tw`w-10 h-10 rounded bg-cover bg-center`}
  ${props =>
    css`
      background-image: url(${props.img});
    `}
`;

function BagguListItem({ baggu }) {
  const { year, month, day, hour, minute } = FormatDate(baggu.createdAt);

  // 상대적인 날짜 계산
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const feed_like = async () => {
    try {
      const { data } = await authInstance.post(
        requests.FEED_LIKE(baggu.tradeFinIdx)
      );

      console.log(data);
      return setLiked(!liked);
    } catch (error) {
      console.log(error);
    }
  };
  const feed_like_delete = async () => {
    try {
      const { data } = await authInstance.delete(
        requests.FEED_LIKE(baggu.tradeFinIdx)
      );

      console.log(data);
      return setLiked(!liked);
    } catch (error) {
      console.log(error);
    }
  };
  const location = useLocation().pathname;
  return (
    <Container>
      <Wrapper>
        <Avatar img={baggu.requestUserImgUrl} />
        <Avatar img={baggu.receiveUserImgUrl} />
        <Info>
          <section>
            <Link to={`/user/${baggu.requestUserIdx}`}>
              <span className=" text-primary">{baggu.requestNickname}</span>
            </Link>
            님과
            <Link to={`/user/${baggu.receiveUserIdx}`}>
              <span className=" text-primary">{baggu.receiveNickname}</span>
            </Link>
            님의 바꾸
            <br />
            <span>{GetRelativeTime(year, month, day, hour, minute)}</span>
          </section>
        </Info>
      </Wrapper>
      <div className="p-2 flex w-full justify-center hover:bg-primary-hover border-b gap-2 relative">
        <Link to={`/item/${baggu.requestItemImgUrl}`}>
          <Product img={baggu.requestItemImgUrl} />
        </Link>
        <img src={icon_exchange} alt="" />
        <Link to={`/item/${baggu.receiveItemImgUrl}`}>
          <Product img={baggu.receiveItemImgUrl} />
        </Link>
      </div>
      <div className="flex flex-wrap justify-between gap-2 bg-white border-t w-full h-[60px] px-4 py-2">
        <div className={`${location.startsWith('/myprofile') ? 'hidden' : ''}`}>
          <img
            onClick={feed_like}
            src={heart_unliked}
            alt="like button"
            className={`${liked ? 'hidden' : ''}`}
          />
          <img
            onClick={feed_like_delete}
            src={heart_liked}
            alt="like button"
            className={`${liked ? '' : 'hidden'}`}
          />
        </div>
        {/* 사용자와 게시글 작성자 정보를 비교하여 title 변경 */}
      </div>
    </Container>
  );
}

export default BagguListItem;
