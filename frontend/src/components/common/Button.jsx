import React from 'react';

function Button({ title, className }) {
  let bgColor = ``;
  let textColor = ``;

  switch (className) {
    case 'default':
      bgColor = 'bg-secondary';
      textColor = 'text-white';
      break;
    case 'disabled':
      bgColor = 'bg-grey1';
      textColor = 'text-grey2';
    default:
      break;
  }
  return (
    <div
      className={`w-fit h-5 flex bg-secondary rounded-full items-center justify-center p-2`}
    >
      <span className="text-main-bold text-white">{title}</span>
    </div>
  );
}

export default Button;
