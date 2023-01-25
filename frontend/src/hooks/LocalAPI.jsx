import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

// hooks
import GetCurrentPosition from './GetCurrentPosition';

const API_KEY = process.env.KAKAO_REST_API_KEY;

function LocalAPI() {
  const [lat, lng] = GetCurrentPosition();
  const API_URL = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`;
  useEffect(() => {
    axios.get();
  });
  return <div></div>;
}

export default LocalAPI;
