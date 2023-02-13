import requests from 'api/config';
import { authInstance, defaultInstance } from '../axios';

// 교환 신청 + 아이템 선택
export const post_request = async (itemIdx, data) => {
  /*
    < request data 예시 >
    data = {
    "requestItemIdxList" : [1,2,3],
    "requestUserIdx" : 1, 
    "comment" : "바꾸자"
    }

    < response data 예시 >
    data ={
        "receiveUserIdx" : 1, //아이템을 등록한 사람
        "type" : 0, 
        "typeIdx" : 2, // 등록된 아이템 idx 
        "requestUserNickName" : "서울사람"
    }
    */
  try {
    const response = await authInstance.post(
      requests.POST_REQUEST(itemIdx),
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 거래 상태 변경
