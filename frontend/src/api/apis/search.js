import requests from 'api/config';
import { authInstance, defaultInstance } from '../axios';

// 검색어 키워드 POST
export const post_search = async ({ pageParam, searchKey }) => {
  /*
  < request data >
  {
    "title": String,
    "page" : int
  }
  */
  try {
    const { data } = await authInstance.post(
      requests.GET_SEARCH_RESULT,
      searchKey
    );
    const { items, isLast } = data;

    return { items, nextPage: pageParam + 1, isLast };
  } catch (error) {
    throw error;
  }
};
