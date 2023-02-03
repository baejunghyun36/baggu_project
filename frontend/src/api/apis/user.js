import requests from 'api/config';
import { authInstance, defaultInstance } from '../axios';

// 유저의 모든 아이템
export const get_user_item = async userIdx => {
  try {
    const { data } = await authInstance.get(requests.GET_USER_ITEM(userIdx));
    return data;
  } catch (error) {
    throw error;
  }
};
