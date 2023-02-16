import TopBar2 from 'components/common/TopBar2';
import React, { useEffect, useState } from 'react';
import { notificationStore } from 'store/notication';
import NotificationListItem from './NotificationListItem';

// twin.macro
import tw, { styled, css } from 'twin.macro';
import { useMutation } from 'react-query';
import { put_notify } from 'api/apis/notify';

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
  const { notifyList, readNotify } = notificationStore(state => state);
  // 중앙 저장소에 저장된 값으로 알림 데이터의 초기값 설정
  const [notifications, setNotifications] = useState(notifyList);
  // 안 읽은 알림 수
  const [unreadNotify, setUnreadNotify] = useState(0);

  // 일림 클릭시 put nofity로 mutate
  const { data, isLoading, mutate, isSuccess } = useMutation(put_notify, {
    // API 요청 성공시 프론트의 중앙저장소에 저장된 해당 알림을 읽음 처리
    onSuccess: data => {
      readNotify(data);
    },
  });

  // 모두 읽음 처리
  const readAllNotify = () => {
    notifications.forEach(item => mutate({ nofityIdx: item.notifyIdx }));
  };

  // 종속성 설정 안 해주니 중앙저장소에 변화된 notifyList값을 받아오지 못함
  useEffect(() => {
    setNotifications(notifyList);
    setUnreadNotify(notifyList.filter(notify => !notify.readState).length);
  }, [notifyList]);

  return (
    <div>
      <TopBar2 title="알림" />
      {/* <div className="p-2" onClick={readAllNotify}>
        모두 읽음
      </div> */}
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
