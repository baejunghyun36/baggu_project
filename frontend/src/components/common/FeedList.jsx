import React from 'react';
import FeedListItem from './FeedListItem';

function FeedList({ feeds }) {
  return (
    <div>
      {feeds.map(feed => (
        <div key={feed.id}>
          <FeedListItem feed={feed} />
        </div>
      ))}
    </div>
  );
}

export default FeedList;
