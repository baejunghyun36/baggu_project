import React from 'react';
import ReactDOM from 'react-dom';
import tw, { styled, css } from 'twin.macro';

// icon

// Styled Component
const ModalContainer = styled.div`
  ${tw`fixed inset-4 m-auto h-fit z-50 overflow-hidden bg-white rounded p-3 w-fit`}
`;

const Head = tw.div`flex-col gap-1 pb-3`;
const Title = tw.h3`text-h3 text-primary mb-1`;

// 버튼 타입에 따른 스타일
const btnStyles = {
  edit: tw`bg-white border border-primary`,
  delete: tw`bg-negative`,
  cancle: tw`bg-primary`,
};

const BackdropWrapper = styled.div`
  ${css`
    background: rgba(0, 0, 0, 0.75);
  `}
  ${tw`fixed top-0 left-0 w-full h-full z-10`}
`;

const Btn = styled.div`
  ${tw`w-full h-5 flex items-center justify-center`}
  ${props => btnStyles[props.type]}
`;

// Main Component
function Backdrop() {
  return <BackdropWrapper />;
}

function ModalOverlay({ onCancel, onRemove, onEdit }) {
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
        <Title>게시글 수정 및 삭제</Title>
      </Head>
      <div className=" gap-1">
        <Btn type="edit" onClick={onEdit}>
          <span className="text-main-bold text-primary">게시글 수정</span>
        </Btn>
        <Btn type="delete" onClick={onRemove}>
          <span className="text-main-bold text-white">게시글 삭제</span>
        </Btn>
        <Btn type="cancle" onClick={onCancel}>
          <span className="text-main-bold text-white">취소</span>
        </Btn>
      </div>
    </ModalContainer>
  );
}

function ItemModal({ onEdit, onRemove, onCancel }) {
  /*
  < props >
  1. onConfirm : 확인버튼을 누르면 실행될 함수
  2. onCancel : 취소버튼을 누르면 실행될 함수
  3. title : 모달의 상단에 표시될 제목
  4. content : 제목 하단에 표시될 모달 내용
  5. cancelText : 취소 버튼에 표시될 텍스트
  6. confirmText : 확인 버튼에 표시될 텍스트
  */

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onRemove={onRemove} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onCancel={onCancel}
          onEdit={onEdit}
          onRemove={onRemove}
        />,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
}

export default ItemModal;
