import React from 'react';
import FavoriteListItem from './FavoriteListItem';
import tw, { styled, css } from 'twin.macro';

const ListWrapper = styled.div`
  ${tw`border-t-4 overflow-scroll`}
  ${css`
    // height: calc(100vh - 218px);
  `}
`;
function FavoriteList({ items }) {
  return (
    <ListWrapper id="list-wrapper">
      {items.map(item => (
        <div key={item.itemIdx}>
          <FavoriteListItem item={item} />
        </div>
      ))}
      <hr />
    </ListWrapper>
  );
}

export default FavoriteList;
