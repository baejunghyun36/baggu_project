import React from 'react';

// twin.macro
import tw, { styled } from 'twin.macro';

const ChipContainer = styled.div`
  ${props =>
    props.tradeState === 1
      ? tw`bg-success text-black border border-black`
      : tw`bg-grey1 text-grey2`}
  ${tw`w-fit h-[24px] p-1 text-black rounded-full flex justify-center items-center`}
`;

function Chip({ tradeState }) {
  /*
  < prop >
  1. tradeState : 부모 컴포넌트에서 해당 아이템의 거래상태(tradeState)
  */

  // tradeState에 따른 title
  const title = {
    1: '예약중',
    2: '거래완료',
  };

  return (
    <ChipContainer>
      <span>{title}</span>
    </ChipContainer>
  );
}

export default Chip;
