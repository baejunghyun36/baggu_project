import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// icons
import home from '../../assets/icons/nav_home.svg';
import home_active from '../../assets/icons/nav_home_active.svg';
import myBaggu from '../../assets/icons/nav_myBaggu.svg';
import myBaggu_active from '../../assets/icons/nav_mybaggu_active.svg';
import itemCreate from '../../assets/icons/itemCreate.svg';
import chat from '../../assets/icons/nav_chat.svg';
import chat_active from '../../assets/icons/nav_chat_active.svg';
import myProfile from '../../assets/icons/nav_myProfile.svg';
import myProfile_active from '../../assets/icons/nav_myprofile_active.svg';

function BottomNav() {
  // 온보딩 페이지에서 하단바 숨기기
  const location = useLocation().pathname;
  if (
    location.startsWith('/start') ||
    location.startsWith('/item') ||
    location.startsWith('/chat/')
  ) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 fixed bottom-0 bg-white border-t w-full h-[98px] p-1">
      <Link to="/" className="h-fit">
        <div className="flex flex-col items-center">
          <img
            src={home}
            alt="nav button to home"
            className={`${location === '/' ? 'hidden' : ''}`}
          />
          <img
            src={home_active}
            alt="nav button to home"
            className={`${location === '/' ? '' : 'hidden'}`}
          />
          <span
            className={`${
              location === '/' ? 'text-primary' : 'text-grey3'
            } font-pretendard text-sub-bold `}
          >
            홈
          </span>
        </div>
      </Link>
      <Link to="/mybaggu" className="h-fit">
        <div className="flex flex-col items-center">
          <img
            src={myBaggu}
            alt="nav button to my baggu"
            className={`${location === '/mybaggu' ? 'hidden' : ''}`}
          />
          <img
            src={myBaggu_active}
            alt="nav button to my baggu"
            className={`${location === '/mybaggu' ? '' : 'hidden'}`}
          />
          <span
            className={`${
              location === '/mybaggu' ? 'text-primary' : 'text-grey3'
            } font-pretendard text-sub-bold `}
          >
            바꾸관리
          </span>
        </div>
      </Link>
      <Link to="/item/create" className="h-fit">
        <div className="flex flex-col items-center">
          <img src={itemCreate} alt="button to create article" />
        </div>
      </Link>
      <Link to="/chat" className="h-fit">
        <div className="flex flex-col items-center">
          <img
            src={chat}
            alt="nav button to chat"
            className={`${location === '/chat' ? 'hidden' : ''}`}
          />
          <img
            src={chat_active}
            alt="nav button to chat"
            className={`${location === '/chat' ? '' : 'hidden'}`}
          />
          <span
            className={`${
              location === '/chat' ? 'text-primary' : 'text-grey3'
            } font-pretendard text-sub-bold `}
          >
            채팅
          </span>
        </div>
      </Link>
      {/* 유저 id 받아온 이후 수정 */}
      {/* <Link to={`/myprofile/${user.id}`} className="h-fit"> */}
      <Link to="/myprofile" className="h-fit">
        <div className="flex flex-col items-center">
          <img
            src={myProfile}
            alt="nav button to my profile"
            className={`${location === '/myprofile' ? 'hidden' : ''}`}
          />
          <img
            src={myProfile_active}
            alt="nav button to my profile"
            className={`${location === '/myprofile' ? '' : 'hidden'}`}
          />
          <span
            className={`${
              location === '/myprofile' ? 'text-primary' : 'text-grey3'
            } font-pretendard text-sub-bold `}
          >
            내프로필
          </span>
        </div>
      </Link>
    </div>
  );
}

export default BottomNav;
