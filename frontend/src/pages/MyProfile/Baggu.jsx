import React from 'react';
import BagguList from 'components/common/BagguList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TopBar2 from 'components/common/TopBar2';
import { authInstance } from 'api/axios';
import requests from 'api/config';

function Baggu() {
  const [baggus, setBaggus] = useState([]);
  useEffect(() => {
    const get_user_trade = async () => {
      try {
        const { data } = await authInstance.get(requests.GET_MAIN_TRADE(0));

        console.log(data);
        return setBaggus(data);
      } catch (error) {
        console.log(error);
      }
    };

    get_user_trade();
  }, []);
  return (
    <div>
      <TopBar2 title="바꾸내역" />
      <BagguList baggus={baggus} />
    </div>
  );
}

export default Baggu;
