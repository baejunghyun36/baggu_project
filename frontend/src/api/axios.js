import axios from 'axios';
import requests from './config';

const BASE_URL = requests.base_url;

// 인증이 필요없는 axios 인스턴스
const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

const token = localStorage.getItem('token');

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

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
export const notifyAuthApi = axiosNotifyApi(BASE_URL);
export const chatAuthApi = axiosChatApi(BASE_URL);
