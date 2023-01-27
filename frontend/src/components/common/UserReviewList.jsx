import React from 'react';
import UserReviewListItem from './UserReviewListItem';

function UserReviewList({ userReviews }) {
  return (
    <div>
      {userReviews.map(userReview => (
        <div key={userReview.id}>
          <UserReviewListItem
            reviewTitle={userReview.title}
            reviewNumber={userReview.number}
          />
        </div>
      ))}
    </div>
  );
}

export default UserReviewList;
