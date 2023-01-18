import React from 'react';
import { Link } from 'react-router-dom';

import home from '../../assets/icons/nav_home.svg';
import myBaggu from '../../assets/icons/nav_myBaggu.svg';
import itemCreate from '../../assets/icons/itemCreate.svg';
import chat from '../../assets/icons/nav_chat.svg';
import myProfile from '../../assets/icons/nav_myProfile.svg';

function BottomNav() {
  return (
    <div className="flex flex-wrap justify-center gap-2 fixed bottom-0 bg-white border-t w-full h-[98px] p-1">
      <Link className="h-fit">
        <div className="flex flex-col items-center">
          <img src={home} alt="nav button to home" />
          <span className="font-pretendard text-tiny-bold">홈</span>
        </div>
      </Link>
      <Link className="h-fit">
        <div className="flex flex-col items-center">
          <img src={myBaggu} alt="nav button to my baggu" />
          <span className="font-pretendard text-tiny-bold">바꾸관리</span>
        </div>
      </Link>
      <Link className="h-fit">
        <div className="flex flex-col items-center">
          <img src={itemCreate} alt="button to create article" />
        </div>
      </Link>
      <Link className="h-fit">
        <div className="flex flex-col items-center">
          <img src={chat} alt="nav button to chat" />
          <span className="font-pretendard text-tiny-bold">채팅</span>
        </div>
      </Link>
      <Link className="h-fit">
        <div className="flex flex-col items-center">
          <img src={myProfile} alt="nav button to my profile" />
          <span className="font-pretendard text-tiny-bold">내프로필</span>
        </div>
      </Link>
    </div>
  );
}

export default BottomNav;
