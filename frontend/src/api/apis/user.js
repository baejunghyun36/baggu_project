import requests from 'api/config';
import { authInstance, defaultInstance } from '../axios';

// 유저의 모든 아이템
export const get_user_item = async userIdx => {
  try {
    const { data } = await authInstance.get(requests.GET_USER_ITEM(userIdx));
    return data;
  } catch (error) {
    throw error;
  }
};

// 유저 동네 설정
export const put_user_dong = async ({ userIdx, data }) => {
  /*
  data = {
	"si": "서울시",
	"gu": "종로구",
	"dong": "혜화동",
	"lat": "37.3827",
	"lng": "126.9271" 
}
  */
  try {
    console.log('userIdx', userIdx);
    console.log('data', data);
    const response = await authInstance.put(
      requests.PUT_USER_TOWN(userIdx),
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
