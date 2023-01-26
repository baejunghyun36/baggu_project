import React from 'react';
import FavoriteListItem from './FavoriteListItem';
function FavoriteList({ items }) {
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <FavoriteListItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default FavoriteList;
