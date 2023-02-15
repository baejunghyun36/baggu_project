import React from 'react';
import BagguList from 'components/common/BagguList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TopBar2 from 'components/common/TopBar2';
import { authInstance } from 'api/axios';
import requests from 'api/config';

function Baggu() {
  const userIdx = Number(localStorage.getItem('userIdx'));
  const [baggus, setBaggus] = useState([]);
  useEffect(() => {
    const get_user_trade = async userIdx => {
      try {
        const { data } = await authInstance.get(
          requests.GET_USER_TRADE(userIdx)
        );

        console.log('바꾸', data);
        setBaggus(data.items);
        return;
      } catch (error) {
        console.log(error);
      }
    };

    get_user_trade(userIdx);
  }, []);
  return (
    <div>
      <TopBar2 title="바꾸내역" />
      <BagguList baggus={baggus} />
    </div>
  );
}

export default Baggu;
