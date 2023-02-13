import React from 'react';
import { Link } from 'react-router-dom';
import { authInstance } from 'api/axios';
import requests from 'api/config';
import { useState } from 'react';
import OfferImgListItem from './OfferImgListItem';

function OfferImgList({ requestItemList }) {
  return (
    <div>
      <div className="p-2 flex w-full justify-center hover:bg-primary-hover border-b gap-2 relative">
        {requestItemList.map(requestItem => (
          <div key={requestItem.requestItemIdx}>
            <OfferImgListItem
              requestItemIdx={requestItem.requestItemIdx}
              requestItemFirstImg={requestItem.requestItemFirstImg}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferImgList;
