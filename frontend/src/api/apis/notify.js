import requests from 'api/config';
import { authInstance, defaultInstance } from '../axios';

// 알림서버로 post
export const post_notify = async data => {
  /*
    < data 예시 >
    data = {
        "title" : "새로운 거래 요청이 왔습니다." ,
      "content" : "서울사람님과의 거래를 시작해보세요 ",  
      "type" : 0, //type0 일 때 거래요청 알림
      "typeIdx" : 2, 
      "receiveUserIdx" : 1
    }
    */
  try {
    await authInstance.post('/baggu/notify', data);
  } catch (error) {
    throw error;
  }
};
