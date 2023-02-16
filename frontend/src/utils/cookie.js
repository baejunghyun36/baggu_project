import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 저장
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

// 조회
export const getCookie = name => {
  return cookies.get(name);
};

// 삭제
export const deleteCookie = name => {
  cookies.remove(name);
};
