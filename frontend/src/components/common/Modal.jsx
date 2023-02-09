import React from 'react';
import ReactDOM from 'react-dom';
import tw, { styled, css } from 'twin.macro';

// icon
import icon_close from 'assets/icons/close.svg';

// Styled Component
const ModalContainer = styled.div`
  ${tw`fixed top-[10vh] inset-0 h-fit z-50 overflow-hidden bg-white rounded p-3`}
`;

const Head = tw.div`flex-col gap-1 pb-3`;
const Title = tw.h3`text-h3 text-primary mb-1`;

// 버튼 타입에 따른 스타일
const btnStyles = {
  cancel: tw`bg-white border border-primary`,
  okay: tw`bg-primary`,
};

const BackdropWrapper = styled.div`
  ${css`
    background: rgba(0, 0, 0, 0.75);
  `}
  ${tw`fixed top-0 left-0 w-full h-full z-10`}
`;

const Btn = styled.div`
  ${tw`w-full h-5 flex rounded-full items-center justify-center`}
  ${props => btnStyles[props.type]}
`;

// Main Component
function Backdrop() {
  return <BackdropWrapper />;
}

function ModalOverlay({
  title,
  content,
  confirmText,
  cancelText,
  onCancel,
  onConfirm,
}) {
  /*
  < props >
  1. title : 모달 상단에 표시될 제목입니다. (없어도 됩니다.)
  2. content : 모달
  */

  return (
    <ModalContainer>
      {/* <div>
        <img src={icon_close} alt="" />
      </div> */}
      <Head>
        <Title>{title}</Title>
        <p>{content}</p>
      </Head>
      <div className="flex gap-1">
        <Btn type="cancel" onClick={onCancel}>
          <span className="text-main-bold text-primary">{cancelText}</span>
        </Btn>
        <Btn type="okay" onClick={onConfirm}>
          <span className="text-main-bold text-white">{confirmText}</span>
        </Btn>
      </div>
    </ModalContainer>
  );
}

function Modal({
  onConfirm,
  onCancel,
  title,
  content,
  cancelText,
  confirmText,
  showModal,
}) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm} showModal={showModal} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={title}
          content={content}
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={onCancel}
          onConfirm={onConfirm}
          showModal={showModal}
        />,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
}

export default Modal;
