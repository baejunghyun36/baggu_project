import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// twin.macro
import tw, { styled } from 'twin.macro';

const ChipContainer = styled.div`
  ${tw`w-fit h-[24px] p-1 py-[12px] text-sub-bold text-black rounded-full flex justify-center items-center`}
  ${props =>
    props.tradeState === 1
      ? tw`bg-success text-black border border-black`
      : tw`bg-grey1 text-grey2`}
`;

function Chip({ tradeState }) {
  /*
  < prop >
  1. tradeState : 부모 컴포넌트에서 해당 아이템의 거래상태(tradeState)
  */
  const [state, setState] = useState(0);
  useEffect(() => {
    setState(tradeState);
  }, []);
  return (
    <>
      <div className={`${state === 1 ? '' : 'hidden'}`}>
        <ChipContainer tradeState={state}>
          <span>예약중</span>
        </ChipContainer>
      </div>
      <div className={`${state === 2 ? '' : 'hidden'}`}>
        <ChipContainer tradeState={state}>
          <span>거래완료</span>
        </ChipContainer>
      </div>
    </>
  );
}

export default Chip;
