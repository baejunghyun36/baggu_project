import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const notificationStore = create(
  devtools(set => ({
    // 알림 목록
    notifyList: [],
    saveNotify: list => set(state => ({ notifyList: list })),
    addNotify: notify =>
      set(state => ({ notifyList: [...state.notifyList, notify] })),
  }))
);
