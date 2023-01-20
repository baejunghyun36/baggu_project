import React from 'react';

function Modal({ title, content, confirmText, cancelText }) {
  title = '제목';
  content =
    '내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.';
  confirmText = '확인';
  cancelText = '취소';
  return (
    <div>
      <div className="flex-col p-2 gap-1">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
      <div className="flex p-2 gap-1">
        <div
          className={`w-full h-5 flex bg-white border border-primary rounded-full items-center justify-center p-2`}
        >
          <span className="text-main-bold text-primary">{cancelText}</span>
        </div>
        <div
          className={`w-full h-5 flex bg-primary rounded-full items-center justify-center p-2`}
        >
          <span className="text-main-bold text-white">{confirmText}</span>
        </div>
      </div>
    </div>
  );
}

export default Modal;
