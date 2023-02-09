import requests from 'api/config';
import { authInstance, defaultInstance } from '../axios';

// 유저 리뷰 POST
export const post_user_review = async data => {
  try {
    await authInstance.post(requests.POST_USER_REVIEW, data);
  } catch (error) {
    throw error;
  }
};

// 거래 리뷰 POST
export const post_trade_review = async data => {
  try {
    await authInstance.post(requests.POST_TRADE_REVIEW, data);
  } catch (error) {
    throw error;
  }
};
