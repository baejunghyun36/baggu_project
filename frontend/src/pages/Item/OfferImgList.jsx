import React from 'react';
import { Link } from 'react-router-dom';
import { authInstance } from 'api/axios';
import requests from 'api/config';
import { useState } from 'react';
import { useEffect } from 'react';
import OfferImgListItem from './OfferImgListItem';

function OfferImgList({
  requestItemList,
  checkShow,
  selected,
  setSelected,
  selectedIdx,
  setSelectedIdx,
}) {
  // const [selected, setSelected] = useState(false);
  return (
    <div>
      <div className="p-2 flex w-full justify-center hover:bg-primary-hover border-b gap-2 relative">
        {requestItemList.map(requestItem => (
          <div key={requestItem.requestItemIdx}>
            <OfferImgListItem
              requestItemIdx={requestItem.requestItemIdx}
              requestItemFirstImg={requestItem.requestItemFirstImg}
              checkShow={checkShow}
              selected={selected}
              setSelected={setSelected}
              selectedIdx={selectedIdx}
              setSelectedIdx={setSelectedIdx}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferImgList;
