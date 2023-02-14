import requests from 'api/config';
import { authInstance, defaultInstance } from '../axios';

// 검색어 키워드 POST
export const post_search = async data => {
  /*
  < request data >
  {
    "title": String,
    "page" : int
  }
  */
  try {
    const response = await authInstance.post(requests.GET_SEARCH_RESULT, data);
    console.log('search result :', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
