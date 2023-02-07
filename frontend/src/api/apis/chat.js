import requests from 'api/config';
import { chatAuthApi } from '../axios';

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
