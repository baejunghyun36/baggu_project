import React from 'react';
import OfferUserInfo from './OfferUserInfo';
import OfferImgList from './OfferImgList';
function BagguOfferListItem({ requestUser }) {
  // console.log(requestUser);
  return (
    <div>
      <OfferUserInfo
        nickname={requestUser.nickname}
        comment={requestUser.comment}
        profileImgUrl={requestUser.profileImgUrl}
        userIdx={requestUser.userIdx}
      />
      <OfferImgList requestItemList={requestUser.requestItemList} />
    </div>
  );
}

export default BagguOfferListItem;
