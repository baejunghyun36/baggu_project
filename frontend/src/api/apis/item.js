import requests from 'api/config';
import { authInstance, defaultInstance } from '../axios';

// 게시글 GET
export const get_item = async ItemIdx => {
  try {
    const { data } = await authInstance.get(requests.ITEM(ItemIdx));
    console.log('get item', data);
    return data;
  } catch (error) {
    throw error;
  }
};

// 게시글 POST
export const post_item = async data => {
  try {
    const response = await authInstance.post(requests.POST_ITEM, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('post item', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 게시글 PUT
export const put_item = async (ItemIdx, data) => {
  /*
  < request data >
  {
    "category": "TYPE0",
    "title": "최종수정",
    "content": "최종수정",
    "uploadImgUrls":[
      "url","url","url"
    ],
    "itemFirstImgIdx":1 // 0부터 시작하는 인덱스
  }  
  */
  try {
    const { data } = await authInstance.put(requests.ITEM(ItemIdx));
    console.log('put item', data);
    return data;
  } catch (error) {
    throw error;
  }
  /*
  < response data >
  {
    "category": 3,
    "title": "수정된제목입니다.",
    "content": "수정된내용입니다.",
    "itemFirstImgUrl": "...",
    "itemImgUrls": [
        "...",
        "..."
    ]
  }
  */
};

// 게시글 DELETE
export const delete_item = async ItemIdx => {
  try {
    const { data } = await authInstance.delete(requests.ITEM(ItemIdx));
    console.log('delete item', data);
    return data;
  } catch (error) {
    throw error;
  }
};
