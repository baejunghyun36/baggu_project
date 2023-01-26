import React from 'react';

function BagguOfferListItem({ offer }) {
  return (
    <div>
      <img src={offer.medium_cover_image} alt="user1_profile_image" />
      <span>{offer.summary}</span>
    </div>
  );
}

export default BagguOfferListItem;
