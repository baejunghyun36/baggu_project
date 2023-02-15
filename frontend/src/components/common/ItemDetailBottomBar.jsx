import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// icons
import heart_unliked from '../../assets/icons/heart_unliked.svg';
import heart_liked from '../../assets/icons/heart_liked.svg';

// twin.macro
import tw, { styled } from 'twin.macro';

// Styled Component
const ButtonStyles = {
  바꾸신청: tw`bg-secondary text-white hover:bg-white hover:text-secondary hover:border-1 hover:border-secondary`,
  선택하기: tw`bg-secondary text-white hover:bg-white hover:text-secondary hover:border-1 hover:border-secondary`,
  신청취소: tw`bg-negative text-white hover:bg-white hover:text-negative hover:border-1 hover:border-negative`,
};
const Button = styled.div`
  ${tw`w-fit h-5 flex text-main rounded-full items-center justify-center p-2 cursor-pointer`}
  ${props => ButtonStyles[props.title]}
  ${props =>
    props.disabled
      ? tw`bg-grey1 text-grey2 hover:bg-grey1 hover:text-grey2 hover:border-none cursor-default`
      : tw``}
`;

function ItemDetailBottomBar({
  showHeart,
  btnTitle,
  disabled,
  btnClickHandler,
}) {
  const [liked, setLiked] = useState(false);
  // 좋아요 API 요청
  const likeHandler = () => {
    setLiked(!liked);
  };

  // 온보딩 페이지에서 하단바 숨기기
  const location = useLocation().pathname;
  if (location.startsWith('/start') || location.startsWith('/chat')) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-between gap-2 fixed bottom-0 bg-white border-t w-full h-[98px] px-4 py-2">
      <div
        onClick={likeHandler}
        className={`${showHeart === 'false' ? 'hidden' : ''}`}
      >
        <img
          src={heart_unliked}
          alt="like button"
          className={`${liked ? 'hidden' : ''}`}
        />
        <img
          src={heart_liked}
          alt="like button"
          className={`${liked ? '' : 'hidden'}`}
        />
      </div>
      {/* 사용자와 게시글 작성자 정보를 비교하여 title 변경 */}
      {/* <Button title={btnTitle} className="default" onClick={btnClickHandler} /> */}
      <Button
        title={btnTitle}
        onClick={disabled ? null : btnClickHandler}
        disabled={disabled}
      >
        <span>{btnTitle}</span>
      </Button>
    </div>
  );
}

export default ItemDetailBottomBar;
