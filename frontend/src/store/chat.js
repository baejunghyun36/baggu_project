import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const chatStore = create(
  devtools(set => ({
    // 채팅방 목록
    chatRoomList: [],
    chatMessageList: [],

    addChatRoom: chatRoom =>
      set(state => ({ chatRoomList: [...state.chatRoomList], chatRoom })),
    updateChatRoom: roomId => set(state => ({})),

    addChatMessage: newmessage =>
      set(state => ({
        chatMessageList: [...state.chatMessageList],
        newmessage,
      })),
  }))
);
