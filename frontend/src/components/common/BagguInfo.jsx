import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function BagguInfo({ feed }) {
  return (
    <div>
      {/* <img src={feed.user1.profileImage} alt="user1_profileImage" />
      <img src={feed.user2.profileImage} alt="user2_profileImage" />
      <h4>
        {feed.user1.nickname}님과 {feed.user2.nickname}님의 바꾸입니다.
      </h4>
      <h4>{feed.createdtime}</h4> */}
      <h3>{feed.title}</h3>
    </div>
  );
}

export default BagguInfo;
