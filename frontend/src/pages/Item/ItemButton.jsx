import React, { useState } from 'react';
import { useEffect } from 'react';
import tw, { styled } from 'twin.macro';

const BtnStyles = {
  default: tw`bg-secondary text-white`,
  disabled: tw`bg-grey1 text-grey2`,
  cancle: tw`bg-white text-negative border-1 border-negative`,
};
const Btn = styled.div`
  ${tw`w-fit rounded-full flex justify-center items-center h-5`}
  ${props => BtnStyles[props.type]}

  & {
    span {
      ${tw`text-main-bold`}
    }
  }
`;

function ItemButton({
  isSameUser,
  selected,
  isAlreadyOffer,
  isFull,
  btnClickHandler,
  itemIdx,
  checkShow,
  tradeState,
  apiState,
  setApiState,
}) {
  const [title, setTitle] = useState('');
  const [disabled, setDisabled] = useState('default');
  useEffect(() => {
    if (isSameUser) {
      setTitle('바꿀물건선택');
      setDisabled('default');
      if (checkShow && selected) {
        setTitle('선택 완료');
        setDisabled('default');
        setApiState(title);
      } else if (tradeState !== 0) {
        setTitle('바꿀물건선택');
        setDisabled('disabled');
      } else if (checkShow && !selected) {
        setTitle('선택 완료');
        setDisabled('disabled');
      }
    }
    if (!isSameUser) {
      setTitle('바꾸신청');
      setDisabled('default');
      setApiState(title);
      if (isFull || tradeState !== 0) {
        setTitle('바꾸신청');
        setDisabled('disabled');
      } else if (isAlreadyOffer) {
        setTitle('바꾸신청 취소');
        setDisabled('cancle');
        setApiState(title);
      }
    }
  }, [checkShow]);

  return (
    <Btn type={disabled} onClick={btnClickHandler}>
      <span>{title}</span>
    </Btn>
  );
}

export default ItemButton;
