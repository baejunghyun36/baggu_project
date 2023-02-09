import React from 'react';
import ProductListItem from './ProductListItem';

import tw, { styled, css } from 'twin.macro';

const ListWrapper = styled.div`
  ${tw`border-t-4 mt-[60px] overflow-scroll`}
  ${css`
    height: calc(100vh - 218px);
  `}
`;

function ProductList({ items }) {
  return (
    <ListWrapper id="list-wrapper">
      {items
        ? items.map(item => (
            <div key={item.itemIdx}>
              <ProductListItem item={item} />
            </div>
          ))
        : ''}
      <hr />
    </ListWrapper>
  );
}

export default ProductList;
