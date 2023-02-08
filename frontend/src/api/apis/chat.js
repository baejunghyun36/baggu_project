import requests from 'api/config';
import { chatAuthApi } from '../axios';

// 채팅방 리스트 GET
export const get_chatrooms = async userIdx => {
  try {
    const { data } = await chatAuthApi.get(requests.GET_CHATROOMS(userIdx));
    console.log('get chatrooms success', data);
    return data;
  } catch (error) {
    throw error;
  }
};

// 새로운 채팅 메세지 수신시 변경사항이 발생한 채팅방의 정보를 GET
export const get_updated_chatroom = async roomId => {
  try {
    const { data } = await chatAuthApi.get(
      requests.GET_UPDATED_CHATROOM(roomId)
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// 특정 채팅방의 메세지 GET
export const get_chatroom_detail = async roomId => {
  try {
    const { data } = await chatAuthApi.get(requests.GET_CHAT_DETAIL(roomId));
    return data;
  } catch (error) {
    throw error;
  }
};

// 채팅방 focusState POST
export const post_chatroom_focus = async (userIdx, roomId, focusOn) => {
  try {
    await chatAuthApi.post(requests.POST_CHATROOM_FOCUS, {
      userIdx: userIdx,
      roomId: roomId,
      focusOn: focusOn,
    });
  } catch (error) {
    throw error;
  }
};

// 채팅 보내기
// {
//   "senderIdx" : 1,
//   "receiverIdx" : 2,
//   "senderNickname" : "senderNickname",
//   "receiverNickname" : "receiverNickname",
//   "roomId" : "63e353a7882921148a52480c",
//   "msg": "안녕"
// }

export const post_message = async data => {
  try {
    await chatAuthApi.post(requests.POST_MESSAGE, data);
  } catch (error) {
    throw error;
  }
};
