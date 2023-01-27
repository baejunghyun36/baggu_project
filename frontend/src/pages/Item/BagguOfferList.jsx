import React from 'react';
import BagguOfferListItem from './BagguOfferListItem';
function BagguOfferList({ offers }) {
  return (
    <div>
      <div>
        <span>바꾸신청한 사람들</span>
      </div>
      {offers.map(offer => (
        <div key={offer.id}>
          <BagguOfferListItem offer={offer} />
        </div>
      ))}
    </div>
  );
}

export default BagguOfferList;
