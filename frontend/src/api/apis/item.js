import requests from 'api/config';
import { authInstance, defaultInstance } from '../axios';

// 홈 게시글 GET
export const get_main_items = async ({ pageParam = 0 }) => {
  try {
    const dong = localStorage.getItem('dong');
    const { data } = await authInstance.get(
      requests.GET_MAIN_ITEM(dong, pageParam)
    );
    return data;
  } catch (error) {
    throw error;
  }
};

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
  /*
  < request data >
  {
    "userIdx" : 2,
	  "category" : "TYPE0",
    "title" : "마우스",
    "content" : "마우스랑 교환하실분"
		"itemImgs" : [] //file 배열,
		"itemFirstImgIdx" : 0 //file 배열에서 대표 이미지의 인덱스
  }

  */
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
export const put_item = async ({ ItemIdx, data }) => {
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
  console.log('mutate 변수 잘 전달되는지 확인', ItemIdx, data);
  try {
    const response = await authInstance.put(requests.ITEM(ItemIdx), data);
    console.log('put item', response.data);
    return response.data;
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

// 이미지 업로드
export const post_image = async data => {
  /*
  < request data >
  { uploadImgs:[파일 리스트] }
  */
  try {
    const response = await authInstance.post(requests.POST_IMAGE, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('post images', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
