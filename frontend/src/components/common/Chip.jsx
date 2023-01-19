import React from 'react';

function Chip({ title }) {
  let bgColor = '';
  let textColor = '';
  let border = '';
  title = '바꾸완료';
  switch (title) {
    case '바꾸중':
      bgColor = 'bg-success';
      textColor = 'text-black';
      border = 'border border-black';
      break;
    case '바꾸완료':
      bgColor = 'bg-grey1';
      textColor = 'text-grey2';
      border = '';
      break;

    default:
      break;
  }
  return (
    <div
      className={`${
        bgColor + border
      } w-fit h-[24px] p-1 text-black rounded-full flex justify-center items-center `}
    >
      <span className={`${textColor} text-tiny-bold`}>{title}</span>
    </div>
  );
}

export default Chip;
