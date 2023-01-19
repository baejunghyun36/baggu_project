import React, { useState } from 'react';
import Button from './Button';

// icons
import heart_unliked from '../../assets/icons/heart_unliked.svg';
import heart_liked from '../../assets/icons/heart_liked.svg';

function BottomBar() {
  const [liked, setLiked] = useState(false);

  // 좋아요 API 요청
  const likeHandler = () => {
    setLiked(!liked);
  };

  return (
    <div className="flex flex-wrap justify-between gap-2 fixed bottom-0 bg-white border-t w-full h-[98px] px-4 py-2">
      <div onClick={likeHandler}>
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
      <Button title="바꾸신청" className="default" />
    </div>
  );
}

export default BottomBar;
