import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BagguInfo from './BagguInfo';
import heart_unliked from '../../assets/icons/heart_unliked.svg';
import heart_liked from '../../assets/icons/heart_liked.svg';

function FeedListItem({ feed }) {
  const [liked, setLiked] = useState(false);
  // 좋아요 API 요청
  const likeHandler = () => {
    setLiked(!liked);
  };
  const location = useLocation().pathname;

  return (
    <div>
      <BagguInfo feed={feed} />
      <img src={feed.medium_cover_image} alt="user1_profile_image" />
      <img src={feed.medium_cover_image} alt="user2_profile_image" />
      <div className="flex flex-wrap justify-between gap-2 bg-white border-t w-full h-[98px] px-4 py-2">
        <div
          onClick={likeHandler}
          className={`${location.startsWith('/myprofile') ? 'hidden' : ''}`}
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
      </div>
    </div>
  );
}

export default FeedListItem;
