import React from 'react';

function GetRelativeTime({ year, month, day }) {
  /*
  < hook 설명 >
  비교 대상인 날짜를 인자로 받아 현재 시간과 상대적인 시간을 계산하여 문자열로 반환합니다.
  
  < prop 설명 >
  1. target : 날짜 및 시간 비교하는 대상

  < 규칙 >
    - 1분 미만 : 방금전
    - 1분 이상 ~ 1시간 미만 : n분전
    - 1시간 이상 ~ 24시간 미만 : n시간 전
    - 24시간 이상 ~ 30일 미만 : n일 전 
    - 30일 이상 ~ 1년 미만 : n달 전
    - 1년 이상 ~ : 0000년 00월 00일
  */

  // 현재 날짜
  const now = new Date();
  return;
}

export default GetRelativeTime;
