import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const chatStore = create(
  devtools(set => ({
    // 채팅방 목록
    chatRoomList: [],
    // 채팅방의 모든 메세지
    chatMessageList: [],
    totalUnreadMsg: 0,

    // 채팅방 정보 저장
    addChatRoom: chatRoom =>
      set(state => ({ chatRoomList: [...state.chatRoomList, chatRoom] })),
    updateChatRoom: (roomId, info) =>
      set(state => {
        const targetIdx = state.chatRoomList.findIndex(
          chatRoom => chatRoom.roomId === roomId
        );

        state.chatRoomList[targetIdx] = info;
        console.log(
          'chatStore에서 updateChatroom 함수 내부에서 콘솔',
          state.chatRoomList
        );
        return { chatRoomList: [...state.chatRoomList] };
      }),
    clearChatRoom: () => set(state => ({ chatRoomList: [] })),

    // 메세지 저장
    addChatMessage: newmessage =>
      set(state => ({
        chatMessageList: [...state.chatMessageList],
        newmessage,
      })),
  }))
);
