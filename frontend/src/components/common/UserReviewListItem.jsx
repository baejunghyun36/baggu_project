import React from 'react';

function UserReviewListItem({ reviewTitle, reviewNumber }) {
  return (
    <div>
      <span>{reviewTitle}</span>
      <span>{reviewNumber}</span>
    </div>
  );
}

export default UserReviewListItem;
