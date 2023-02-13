import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'utils/cookie';
import { logout } from './apis/user';
import requests from './config';

const BASE_URL = requests.base_url;

// 인증이 필요없는 axios 인스턴스
const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

const token = localStorage.getItem('token');
// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4IjoyMSwicm9sZSI6IlJPTEVfUkVHVUxBUl9VU0VSIiwiaWF0IjoxNjc1OTkxNTY4LCJleHAiOjE2NzU5OTI0Njh9.9e0LszOrqv_7yo9KXKou1v6d24d0JLknTMyZmsaz7LQ`;
// const token = getCookie('token');

// 인증이 필요한 axios 인스턴스
const axiosAuthApi = (url, options) => {
  // 토큰 가져오는 코드 수정 필요
  // const token = localStorage.getItem('token');
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: token },
    ...options,
  });
  return instance;
};

// 알림서버로 요청 보내는 axios 인스턴스
const axiosNotifyApi = (url, options) => {
  const instance = axios.create({
    baseURL: requests.notify_base_url,
    headers: { Authorization: token },
    ...options,
  });
  return instance;
};

// 채팅서버로 요청 보내는 axios 인스턴스
const axiosChatApi = (url, options) => {
  const instance = axios.create({
    baseURL: requests.chat_base_url,
    headers: { Authorization: token },
    ...options,
  });
  return instance;
};

// 리프레시 토큰
const axiosRefreshApi = (url, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { 'refresh-token': getCookie('refresh-token') },
  });
  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
export const notifyAuthApi = axiosNotifyApi(BASE_URL);
export const chatAuthApi = axiosChatApi(BASE_URL);
export const refreshTokenInstance = axiosRefreshApi(BASE_URL);

// 토큰 만료시 리프레시 토큰으로 재발급 요청
authInstance.interceptors.response.use(
  response => response,
  error => {
    const {
      config,
      response: { status },
    } = error;

    // 401 : unauthorized 에러
    if (status === 401) {
      // access-token 재발급 요청
      return refreshTokenInstance.get('/baggu/auth/token').then(({ data }) => {
        console.log('get refresh response data :', data);
        localStorage.setItem('token', data);
        config.headers.Authorization = `${token}`;

        // 재요청
        return authInstance(config);
      });
    } else if (status === 409) {
      // 로그아웃
      const navigate = useNavigate();
      return logout(localStorage.getItem('userIdx')).then(() =>
        navigate('/start')
      );
    }
  }
);
