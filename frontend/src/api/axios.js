import axios from 'axios';
import requests from './config';

const BASE_URL = requests.base_url;

// 인증이 필요없는 axios 인스턴스
const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4IjoiMSIsInJvbGUiOiJST0xFX1JFR1VMQVJfVVNFUiIsImV4cCI6Njc2Njg2OTg0MDV9.hbe74w5T7hNd4F6yOwHpr73Vkb0kjhc4EbXsJXxEumM';

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

// 서버로 요청보내는 axios 인스턴ㅅ
const axiosNotifyApi = (url, options) => {
  const instance = axios.create({
    baseURL: requests.notify_base_url,
    headers: { Authorization: token },
    ...options,
  });
  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
export const notifyAuthApi = axiosNotifyApi(BASE_URL);
// export const sseInstance = sseApi(BASE_URL);
