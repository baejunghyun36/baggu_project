import requests from 'api/config';
import { authInstance, defaultInstance } from '../axios';

// 검색결과 GET
export const get_search = async keyword => {
  try {
    const { data } = await authInstance.get(
      requests.GET_SEARCH_RESULT(keyword)
    );
    console.log('search result :', data);
    return data;
  } catch (error) {
    throw error;
  }
};
