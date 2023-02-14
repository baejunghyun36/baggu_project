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
  title,
  setTitle,
  toggle,
  setToggle,
}) {
  const [disabled, setDisabled] = useState('default');
  const [onOff, setOnOff] = useState(true);
  const onClickOnOff = onOff
    ? {
        onClick: e => {
          e.preventDefault();
          btnClickHandler();
        },
      }
    : {
        onClick: e => {
          e.preventDefault();
        },
      };
  useEffect(() => {
    if (isSameUser) {
      setTitle('바꿀 물건 선택');
      setDisabled('default');
      setOnOff(true);
      if (checkShow && selected) {
        setTitle('선택 완료');
        setDisabled('default');
        setApiState(title);
        setOnOff(true);
      } else if (tradeState !== 0) {
        setTitle('바꿀 물건 선택');
        setDisabled('disabled');
        setOnOff(false);
      } else if (checkShow && !selected) {
        setTitle('선택 완료');
        setDisabled('disabled');
        setOnOff(true);
      }
    }
    if (!isSameUser) {
      setTitle('바꾸신청');
      setDisabled('default');
      setApiState(title);
      setOnOff(true);
      if (isFull || tradeState !== 0) {
        setTitle('바꾸신청');
        setDisabled('disabled');
        setOnOff(false);
      } else if (isAlreadyOffer) {
        setTitle('바꾸신청 취소');
        setDisabled('cancle');
        setApiState(title);
        setOnOff(true);
      }
    }
  }, [toggle]);

  return (
    <Btn type={disabled} onClick={onClickOnOff.onClick}>
      <span>{title}</span>
    </Btn>
  );
}

export default ItemButton;
