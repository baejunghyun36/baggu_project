import React, { useEffect } from 'react';
import { useState } from 'react';
import icon_exchange from 'assets/icons/exchange.svg';
import { useNavigate } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import heart_unliked from '../../assets/icons/heart_unliked.svg';
import heart_liked from '../../assets/icons/heart_liked.svg';
import FormatDate from 'hooks/FormatDate';
import GetRelativeTime from 'hooks/GetRelativeTime';

// API
import requests from 'api/config';
import { authInstance } from 'api/axios';

// twin.macro
import tw, { styled, css } from 'twin.macro';

// Styled Component
const Container = styled.div`
  ${tw`w-full`}
`;

const Wrapper = tw.div`flex p-2 border-b`;

const Avatar = styled.div`
  ${tw`bg-primary rounded-full w-5 h-5 bg-cover bg-center relative`}
  ${props => css`
    background-image: url(${props.img});
  `}
  ${props => (props.type === 'right' ? tw`left-[-20%] bottom-[-20%]` : tw``)}
`;

const Info = styled.div`
  ${tw`relative flex flex-col box-content whitespace-nowrap text-ellipsis`}
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
  ${tw`w-10 h-10 rounded bg-cover bg-center shadow-md`}
  ${props =>
    css`
      background-image: url(${props.img});
    `}
`;

// Main Component
function BagguListItem({ baggu }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(baggu.userHeart);
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

  // useEffect(() => {
  //   setLiked(baggu.userHeart);
  // }, [baggu.userHeart]);

  const location = useLocation().pathname;
  return (
    <Container>
      <Wrapper id="wrapper">
        <div className="flex relative w-fit">
          <Avatar img={baggu.requestUserImgUrl} type="left" />
          <Avatar img={baggu.receiveUserImgUrl} type="right" />
        </div>
        <Info>
          <div>
            <Link to={`/user/${baggu.requestUserIdx}`}>
              <span className=" text-primary text-main-bold">
                {baggu.requestNickname}
              </span>
            </Link>
            <span>님과 </span>
            <Link to={`/user/${baggu.receiveUserIdx}`}>
              <span className=" text-primary text-main-bold">
                {baggu.receiveNickname}
              </span>
            </Link>
            님의 바꾸
          </div>
          <span>{GetRelativeTime(FormatDate(baggu.createdAt))}</span>
        </Info>
      </Wrapper>
      <div className="p-2 py-4 flex w-full justify-evenly border-b gap-2 relative">
        <Link to={`/item/${baggu.requestItemIdx}`}>
          <Product img={baggu.requestItemImgUrl} />
        </Link>
        <img src={icon_exchange} alt="" />
        <Link to={`/item/${baggu.receiveItemIdx}`}>
          <Product img={baggu.receiveItemImgUrl} />
        </Link>
      </div>
      <div
        className={`${
          location.startsWith('/myprofile') ? 'hidden' : ''
        } flex flex-wrap justify-between gap-2 bg-white mb-3 w-full h-[60px] px-4 py-2`}
      >
        <div>
          <img
            onClick={feed_like}
            src={heart_unliked}
            alt="like button"
            className={`${liked ? 'hidden' : ''} w-4 h-4 relative top-[-3px]`}
          />
          <img
            onClick={feed_like_delete}
            src={heart_liked}
            alt="like button"
            className={`${liked ? '' : 'hidden'} w-4 h-4 relative top-[-3px]`}
          />
        </div>
        {/* 사용자와 게시글 작성자 정보를 비교하여 title 변경 */}
      </div>
    </Container>
  );
}

export default BagguListItem;
