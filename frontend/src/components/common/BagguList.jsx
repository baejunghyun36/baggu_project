import React from 'react';
import BagguListItem from './BagguListItem';

function BagguList({ baggus }) {
  return (
    <div className="border-t-4 mt-[60px]">
      {baggus.map(baggu => (
        <div key={baggu.itemIdx}>
          <BagguListItem baggu={baggu} />
        </div>
      ))}
      <hr />
    </div>
  );
}

export default BagguList;
