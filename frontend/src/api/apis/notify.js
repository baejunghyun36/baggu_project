import requests from 'api/config';
import { authInstance, defaultInstance } from '../axios';

// 알림서버로 post (새로운 알림을 등록)
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

// 알림서버로 put (알림 읽음 처리)
export const put_notify = async data => {
  /*
    < data 예시 >
    data = {
            "notifyIdx" : "63db19e5df5ed84275f9d436"
          }
    */
  try {
    console.log('send request : put notify');
    await authInstance.put('/baggu/notify', data);
    console.log('success request : put notify');
  } catch (error) {
    throw error;
  }
};

// 알림 서버와 연결
export const get_notify = async userIdx => {
  try {
    // 42는 임시 userIdx
    const { data } = await authInstance.get(requests.GET_NOTIFY(42));
    return data;
  } catch (error) {
    throw error;
  }
};
