import React from 'react';
import { useState } from 'react';
import OfferUserInfo from './OfferUserInfo';
import OfferImgList from './OfferImgList';
function BagguOfferListItem({
  requestUser,
  selected,
  setSelected,
  selectedIdx,
  setSelectedIdx,
  checkShow,
  setTradeDetailIdx,
}) {
  // console.log(requestUser);
  // const [selected, setSelected] = useState(false);
  return (
    <div>
      <OfferUserInfo
        nickname={requestUser.nickname}
        comment={requestUser.comment}
        profileImgUrl={requestUser.profileImgUrl}
        userIdx={requestUser.userIdx}
      />
      <OfferImgList
        requestItemList={requestUser.requestItemList}
        selected={selected}
        setSelected={setSelected}
        selectedIdx={selectedIdx}
        setSelectedIdx={setSelectedIdx}
        checkShow={checkShow}
        setTradeDetailIdx={setTradeDetailIdx}
      />
    </div>
  );
}

export default BagguOfferListItem;
