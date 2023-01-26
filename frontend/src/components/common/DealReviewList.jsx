import React from 'react';
import DealReviewListItem from './DealReviewListItem';
function DealReviewList({ reviews }) {
  return (
    <div>
      {reviews.map(review => (
        <div key={review.id}>
          <DealReviewListItem review={review} />
        </div>
      ))}
    </div>
  );
}

export default DealReviewList;
