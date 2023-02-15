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
    data = {
          "message": "Success",
          "data": {
            "receiveUserIdx": 1,
            "type": 0,
            "typeIdx": 1,
            "requestUserNickName": "test"
          }
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

// 바꾸신청 취소
export const delete_my_request = async tradeRequestIdx => {
  try {
    await authInstance.delete(requests.DELETE_MY_REQUEST(tradeRequestIdx));
  } catch (error) {
    throw error;
  }
};

// 교환신청 수락
export const choose_request = async tradeDetailIdx => {
  try {
    const { data } = await authInstance.get(
      requests.CHOOSE_REQUEST(tradeDetailIdx)
    );
    return data;
  } catch (error) {
    throw error;
  }
};
