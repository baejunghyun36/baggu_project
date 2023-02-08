import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const chatStore = create(
  devtools(set => ({
    // 채팅방 목록
    chatRoomList: [],
    // 채팅방의 모든 메세지
    chatMessageList: [],

    // 채팅방 정보 저장
    addChatRoom: chatRoom =>
      set(state => ({ chatRoomList: [...state.chatRoomList], chatRoom })),
    updateChatRoom: roomId => set(state => ({})),

    // 메세지 저장
    addChatMessage: newmessage =>
      set(state => ({
        chatMessageList: [...state.chatMessageList],
        newmessage,
      })),
  }))
);
