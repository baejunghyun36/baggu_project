import React from 'react';
import ReactDOM from 'react-dom';
import tw, { styled, css } from 'twin.macro';

// icon
import icon_close from 'assets/icons/close.svg';

// Styled Component
const ModalContainer = styled.div`
  ${tw}
`;

const Head = tw.div`flex-col p-2 gap-1`;

// 버튼 타입에 따른 스타일
const btnStyles = {
  cancel: tw`bg-white border border-primary`,
  okay: tw`bg-primary`,
};

const Btn = styled.div`
  ${tw`w-full h-5 flex rounded-full items-center justify-center p-2`}
  ${props => btnStyles[props.type]}
`;

function Backdrop(props) {
  return <div onClick={props.onConfirm}></div>;
}

function ModalOverlay({ title, content, confirmText, cancelText }) {
  title = '제목';
  content =
    '내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.';
  confirmText = '확인';
  cancelText = '취소';

  return (
    <ModalContainer>
      <div>
        <img src={icon_close} alt="" />
      </div>
      <Head>
        <h3>{title}</h3>
        <p>{content}</p>
      </Head>
      <div className="flex p-2 gap-1">
        <Btn type="cancel">
          <span className="text-main-bold text-primary">{cancelText}</span>
        </Btn>
        <Btn type="okay">
          <span className="text-main-bold text-white">{confirmText}</span>
        </Btn>
      </div>
    </ModalContainer>
  );
}

function Modal(props) {
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          content={props.content}
          cancelText={props.cancelText}
          confirmText={props.confirmText}
        />,
        document.getElementById('overlay-root')
      )}
    </div>
  );
}

export default Modal;
