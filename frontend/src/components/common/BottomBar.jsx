import React, { useState } from 'react';
import Button from './Button';
import { useLocation } from 'react-router-dom';

// icons
import heart_unliked from '../../assets/icons/heart_unliked.svg';
import heart_liked from '../../assets/icons/heart_liked.svg';

function BottomBar({ showHeart, btnTitle, btnClickHandler, canOffer }) {
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
      <Button
        title={btnTitle ? btnTitle : '선택완료'}
        className="default"
        onClick={btnClickHandler}
      />
    </div>
  );
}

export default BottomBar;
