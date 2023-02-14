import React from 'react';
import { useState } from 'react';
import BagguOfferListItem from './BagguOfferListItem';
function BagguOfferList({
  requestUserList,
  numOfferUser,
  setNumOfferUser,
  selected,
  setSelected,
  selectedIdx,
  setSelectedIdx,
}) {
  setNumOfferUser(requestUserList.length);
  // const [selected, setSelected] = useState(false);
  // const [selectedIdx, setSelectedIdx] = useState();
  return (
    <div>
      <div>
        <span>바꾸신청한 사람들</span>
        <span>{numOfferUser} / 10</span>
      </div>
      {requestUserList.map(requestUser => (
        <div key={requestUser.userIdx}>
          <BagguOfferListItem
            requestUser={requestUser}
            selected={selected}
            setSelected={setSelected}
            selectedIdx={selectedIdx}
            setSelectedIdx={setSelectedIdx}
          />
        </div>
      ))}
    </div>
  );
}

export default BagguOfferList;
