// import React from 'react';

function GetRelativeTime({ year, month, day, hour, minute }) {
  /*
  < hook 설명 >
  비교 대상인 날짜를 인자로 받아 현재 시간과 상대적인 시간을 계산하여 "문자열"로 반환합니다.
  ex. 방금전, 1분 전, 2시간 전 ...
  
  < prop 설명 >
  비교하는 대상이 되는 날짜의 년, 월, 일, 시, 분 정보를 모두 "숫자타입"으로 받는다.

  < 규칙 >
    - 1분 미만 : 방금전
    - 1분 이상 ~ 1시간 미만 : n분전
    - 1시간 이상 ~ 24시간 미만 : n시간 전
    - 24시간 이상 ~ 30일 미만 : n일 전 
    - 30일 이상 ~ 1년 미만 : n달 전
    - 1년 이상 ~ : 0000년 00월 00일

  */

  // 1. 현재 시간 (KST)
  const now = new Date();

  // 2. 대상 날짜
  // month자리에는 month 인덱스 (0 ~ 11)이 들어가야하므로 1을 빼준다.
  const target = new Date(year, month - 1, day, hour, minute);

  // 3. 밀리세컨 차이값
  const diffMilsec = now.getTime() - target.getTime();

  const diffMin = Math.floor(diffMilsec / (1000 * 60));
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 31);

  if (diffMin < 1) return '방금';
  if (diffHour < 1) return `${diffMin}분 전`;
  if (diffDay < 1) return `${diffHour}시간 전`;
  if (diffMonth < 1) return `${diffDay}일 전`;
  if (diffMonth < 12) return `${diffMonth}달 전`;
  return `${year}년 ${month}일 ${day}일`;
}

export default GetRelativeTime;
