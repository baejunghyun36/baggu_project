import requests from 'api/config';
import { authInstance, defaultInstance } from '../axios';
import { chatAuthApi } from '../axios';

// 거래상태 변경
export const post_trade_status = async data => {
  /*
  < request data >
  {
	"tradeDetailIdx": 1,
	"itemIdx" : [1,2],
	"userNickname" : ["정현", "웅렬"],
  "userIdx" : [1,2], 
	"userImg" : ["유저A 이미지 링크", "유저B 이미지 링크"]
  }
  */
  try {
    await authInstance.post(requests.POST_TRADE_STATUS, data);
  } catch (error) {
    throw error;
  }
};
