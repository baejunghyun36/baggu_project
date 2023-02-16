import requests from 'api/config';
import { authInstance, defaultInstance } from '../axios';

// 검색어 키워드 POST
export const post_search = async ({ keyword, pageParam }) => {
  /*
  < request data >
  {
    "title": String,
  }
  */
  try {
    const { data } = await authInstance.post(requests.GET_SEARCH_RESULT, data);
    const { items, isLast } = data;

    return { items, nextPage: pageParam + 1, isLast };
  } catch (error) {
    throw error;
  }
};
