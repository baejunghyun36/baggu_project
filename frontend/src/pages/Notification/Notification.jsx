import TopBar2 from 'components/common/TopBar2';
import React, { useEffect, useState } from 'react';
import { notificationStore } from 'store/notication';
import NotificationListItem from './NotificationListItem';

// twin.macro
import tw, { styled, css } from 'twin.macro';

// Styled-component
const NotificationListWrapper = styled.div`
  ${css`
    height: calc(100vh - 158px);
  `}
  ${tw`overflow-scroll overflow-x-hidden`}
`;

// Main Component
function Notification() {
  // 중앙 저장소에 저장된 알림 리스트
  const { notifyList } = notificationStore(state => state);
  // 중앙 저장소에 저장된 값으로 알림 데이터의 초기값 설정
  const [notifications, setNotifications] = useState(notifyList);

  // 종속성 설정 안 해주니 중앙저장소에 변화된 notifyList값을 받아오지 못함
  useEffect(() => {
    setNotifications(notifyList);
  }, [notifyList]);

  return (
    <div>
      <TopBar2 title="알림" />
      <NotificationListWrapper>
        {[...notifications].reverse().map(notification => (
          <NotificationListItem
            key={notification.notifyIdx}
            title={notification.title}
            content={notification.content}
            type={notification.type}
            typeIdx={notification.typeIdx}
            readState={notification.readState}
            notifyIdx={notification.notifyIdx}
          />
        ))}
      </NotificationListWrapper>
    </div>
  );
}

export default Notification;
