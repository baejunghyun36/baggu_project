import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const notificationStore = create(
  devtools(set => ({
    // 알림 목록
    notifyList: [],
    unread: 0,
    // 최초 알림 리스트 저장
    saveNotify: list =>
      set({
        notifyList: list,
      }),
    // 리스트에 알림 추가
    addNotify: notify =>
      set(state => ({ notifyList: [...state.notifyList, notify] })),
    // 읽음 처리
    readNotify: notifyIdx => {
      set(state => {
        const targetIdx = state.notifyList.findIndex(
          notify => notify.notifyIdx === notifyIdx
        );
        // DOM에서 notifyList를 reverse하여 맵핑하였으므로 인덱스를 거꾸로
        state.notifyList[targetIdx].readState = 'hi';
        return { notifyList: [...state.notifyList] };
      });
    },
    // 읽지 않은 알림 세기
    countUnread: () =>
      set(state => ({
        unread: state.notifyList.filter(notify => notify.readState === false)
          .length,
      })),
  }))
);
