import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { authInstance } from 'api/axios';
import requests from 'api/config';
import tw, { styled, css } from 'twin.macro';
const Product = styled.div`
  ${tw`w-10 h-10 rounded bg-cover bg-center`}
  ${props =>
    css`
      background-image: url(${props.img});
    `}
`;
function OfferImgListItem({ requestItemIdx, requestItemFirstImg }) {
  return (
    <div>
      <Link to={`/item/${requestItemIdx}`}>
        <Product img={requestItemFirstImg} />
      </Link>
    </div>
  );
}

export default OfferImgListItem;
