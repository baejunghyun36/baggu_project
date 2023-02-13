import React from 'react';
import BagguOfferListItem from './BagguOfferListItem';
function BagguOfferList({ requestUserList }) {
  const numOfferUser = requestUserList.length;
  return (
    <div>
      <div>
        <span>바꾸신청한 사람들</span>
        <span>{numOfferUser}</span>
      </div>
      {requestUserList.map(requestUser => (
        <div key={requestUser.userIdx}>
          <BagguOfferListItem requestUser={requestUser} />
        </div>
      ))}
    </div>
  );
}

export default BagguOfferList;
