import React, { useState } from 'react';
import { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
const Btn = styled.div`
  ${tw`w-fit rounded-full flex justify-center items-center h-5`}
  ${props =>
    props.disabled === true
      ? tw`bg-grey1 text-grey2`
      : tw`bg-secondary text-white`}

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
}) {
  let bgColor = ``;
  let textColor = ``;
  const [title, setTitle] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (isSameUser && !checkShow) {
      setTitle('바꿀물건선택');
      setDisabled('false');
    } else if (isSameUser && checkShow) {
      setTitle('선택 완료');
      setDisabled('false');
    } else if (isSameUser && tradeState !== 0) {
      setTitle('바꿀물건선택');
      setDisabled('true');
    }
  }, [checkShow]);
  return (
    <Btn disabled={disabled} onClick={btnClickHandler}>
      <span>{title}</span>
    </Btn>
  );
}

export default ItemButton;
