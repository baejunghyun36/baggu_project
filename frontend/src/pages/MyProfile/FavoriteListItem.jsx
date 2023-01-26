import React from 'react';

function FavoriteListItem({ item }) {
  return (
    <div>
      <img src={item.medium_cover_image} alt="user1_profile_image" />
      <span>{item.summary}</span>
    </div>
  );
}

export default FavoriteListItem;
