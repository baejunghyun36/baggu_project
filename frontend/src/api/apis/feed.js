import requests from 'api/config';
import { authInstance, defaultInstance } from '../axios';

// 홈 피드 GET
export const get_main_feeds = async () => {
  try {
    const { data } = await authInstance.get(
      requests.GET_MAIN_ITEM(localStorage.getItem('dong'), {
        dong: localStorage.getItem('dong'),
      })
    );
    return data;
  } catch (error) {
    throw error;
  }
};
