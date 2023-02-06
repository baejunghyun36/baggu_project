import TopBar2 from 'components/common/TopBar2';
import React, { useEffect, useState } from 'react';
import { notificationStore } from 'store/notication';
import NotificationListItem from './NotificationListItem';

function Notification() {
  // 중앙 저장소에 저장된 알림 리스트를 불러온다.
  const { notifyList } = notificationStore(state => state);
  // 중앙 저장소에 저장된 값으로 알림 데이터의 초기값 설정
  const [notifications, setNotifications] = useState(notifyList);
  useEffect(() => {
    setNotifications(notifyList);
  }, []);

  // data:{
  //   "notifyIdx":"63d3411297031e2f8cf9cbb8",
  //   "title":"아이템 신청이 왔어요",
  //   "content":"배정현님이 당신의 '에어팟'에 거래 요청을 하였습니다.",
  //   "type":0,
  //   "typeIdx" : 2,
  //   "receiveUserIdx":2,
  //   "readState":false,
  //   "createdAt":"2023-01-27T12:12:18.941"
  // }

  // setNotifications([
  //   {
  //     notifyIdx: '63d3411297031e2f8cf9cbb8',
  //     title: '아이템 신청이 왔어요',
  //     content: "배정현님이 당신의 '에어팟'에 거래 요청을 하였습니다.",
  //     type: 0,
  //     typeIdx: 2,
  //     receiveUserIdx: 2,
  //     readState: false,
  //     createdAt: '2023-01-27T12:12:18.941',
  //   },
  // ]);

  return (
    <div>
      <TopBar2 title="알림" />
      {notifications.map(notification => (
        <NotificationListItem
          key={notification.notifyIdx}
          title={notification.title}
          content={notification.content}
          type={notification.type}
          typeIdx={notification.typeIdx}
        />
      ))}
    </div>
  );
}

export default Notification;
