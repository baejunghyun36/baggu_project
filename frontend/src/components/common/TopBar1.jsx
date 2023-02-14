import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// API
import requests from 'api/config';

// icon
import search from '../../assets/icons/search.svg';
import notification from '../../assets/icons/notification.svg';
import locationIcon from '../../assets/icons/location.svg';
import tw, { styled } from 'twin.macro';
import { notificationStore } from 'store/notication';

// Styled Component
const Container = tw.div`flex fixed justify-between p-2 border-b bg-white border-grey1 h-[60px] w-full z-10`;

const Notify = styled.div`
  ${tw`absolute right-0 rounded-full bg-secondary w-[12px] h-[12px]`}
  ${props => (props.notifyCount > 0 ? tw`` : tw`hidden`)}
`;

// Main Component
function TopBar1() {
  // 유저의 동네 정보
  const dong = localStorage.getItem('dong');

  // 알림 리스트 전역 저장소
  const { notifyList, unread, countUnread } = notificationStore(state => state);

  // 읽지 않은 알림 수에 대한 state
  const [notifyCount, setNotifyCount] = useState(0);

  useEffect(() => {
    const unreadNotifyCount = notifyList.filter(
      x => x.readState === false
    ).length;
    setNotifyCount(unreadNotifyCount);
  }, [notifyList]);

  // 온보딩 페이지에서 상단바 숨기기
  const location = useLocation().pathname;
  if (
    location.startsWith('/start') ||
    location.startsWith('/chat') ||
    location.startsWith('/bagguReview') ||
    location.startsWith('/makeRequest') ||
    location.startsWith('/makeRequest') ||
    location.startsWith('/myprofile') ||
    location.startsWith('/notification') ||
    location.startsWith('/search') ||
    location.startsWith('/item') ||
    location.startsWith('/kakaoLogin') ||
    location.startsWith('/userReview') ||
    location.startsWith('/item')
  ) {
    return null;
  }
  if (location.startsWith('/user')) {
    return null;
  }
  return (
    <Container
      id="top-bar-1"
      className="flex flex-wrap justify-between p-2 border-b border-grey1 h-[60px]"
    >
      <div>
        {/* 동네설정 url은 임시 */}
        <Link to="/dong" className="flex items-center">
          <img
            src={locationIcon}
            alt="icon-search"
            className="w-[40px] h-[40px]"
          />
          <span className="font-pretendard text-h3 text-primary">{dong}</span>
        </Link>
      </div>
      <div className="flex">
        <Link to="/search">
          <img src={search} alt="icon-search" className="w-[40px] h-[40px]" />
        </Link>
        <Link to="/notification" className="relative w-[40px] h-[40px]">
          <img
            src={notification}
            alt="icon-notification"
            className="absolute w-[40px] h-[40px]"
          />
          <Notify notifyCount={notifyCount}></Notify>
        </Link>
      </div>
    </Container>
  );
}

export default TopBar1;
