import React from 'react';

function FormatDate(rawDate) {
  /*
< prop >
1. rawDate : "2023-01-28T18:13:45"과 같은 형식의 raw 데이터

< 반환값 >
년, 월, 일을 담은 객체를 반환
*/
  const date = '2023-01-28T18:13:45'.split('T')[0];
  const time = '2023-01-28T18:13:45'.split('T')[1];

  // 년, 월, 일
  const year = date.split('-')[0];
  const month = date.split('-')[1];
  const day = date.split('-')[2];

  // 시, 분, 초
  const hour = time.split(':')[0];
  const minute = time.split(':')[1];
  return { year, month, day };
}

export default FormatDate;
