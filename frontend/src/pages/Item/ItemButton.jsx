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
    console.log('itemButton / isSameUser :', isSameUser);
    console.log('itemButton / checkShow :', checkShow);
    console.log('itemButton / selected :', selected);
    if (tradeState === 0) {
      if (isSameUser) {
        setTitle('바꿀 물건 선택');
        setDisabled('default');
        setOnOff(true);
        if (checkShow && selected) {
          console.log(selected);
          setTitle('선택 완료');
          setDisabled('default');
          setApiState(title);
          setOnOff(true);
        } else if (checkShow && !selected) {
          setTitle('선택 완료');
          setDisabled('disabled');
          setOnOff(false);
        }
      } else if (!isSameUser) {
        setTitle('바꾸신청');
        setDisabled('default');
        setApiState(title);
        setOnOff(true);
        if (isFull) {
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
    } else {
      if (isSameUser) {
        setTitle('바꿀 물건 선택');
        setDisabled('disabled');
        setOnOff(false);
      } else {
        setTitle('바꾸신청');
        setDisabled('disabled');
        setOnOff(false);
        if (isAlreadyOffer) {
          setTitle('바꾸신청 취소');
          setDisabled('cancle');
          setOnOff(false);
        }
      }
    }
  }, [toggle, selected]);

  return (
    <Btn type={disabled} onClick={onClickOnOff.onClick}>
      <span>{title}</span>
    </Btn>
  );
}

export default ItemButton;
