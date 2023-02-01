// API
import { defaultInstance, authInstance } from 'api/axios';
import requests from 'api/config';

// 개발 테스트용 토큰 발급
const get_token = async () => {
  const { data } = await defaultInstance.post(requests.TEST_TOKEN, {
    data: { userIdx: 1 },
  });
  console.log(data);
};
useEffect(() => {
  get_token();
}, []);
