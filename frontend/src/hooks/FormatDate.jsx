import React from 'react';

function FormatDate(rawDate) {
  /*
< prop >
1. rawDate : "2023-02-15 00:36:06"과 같은 형식의 raw 데이터

< 반환값 >
{년, 월, 일, 시, 분}을 담은 객체를 반환
*/
  // console.log('rawDate', rawDate);
  const date = rawDate.split(' ')[0];
  const time = rawDate.split(' ')[1];
  // console.log('data :', date, 'time :', time);
  // 년, 월, 일
  const year = date.split('-')[0];
  const month = date.split('-')[1];
  const day = date.split('-')[2];
  // console.log('year :', year, 'month :', month, 'day :', day);
  // 시, 분, 초
  const hour = time.split(':')[0];
  const minute = time.split(':')[1];
  // console.log('hour :', hour, 'minute :', minute);
  return { year, month, day, hour, minute };
}

export default FormatDate;
