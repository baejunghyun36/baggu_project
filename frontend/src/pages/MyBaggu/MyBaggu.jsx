import React from 'react';
import ProductList from 'components/common/ProductList';
import { useEffect, useState } from 'react';
import BagguList from 'components/common/BagguList';
import TabBar from 'components/common/TabBar';
import { authInstance } from 'api/axios';
import requests from 'api/config';

function MyBaggu() {
  const userIdx = Number(localStorage.getItem('userIdx'));
  const [page, setPage] = useState(0);
  const [myItems, setMyItems] = useState([]);
  const [offers, setOffers] = useState([]);
  const tabNames = ['나의 물품 관리', '내가 보낸 바꾸신청'];
  const getIndex = data => {
    setPage(data);
  };
  useEffect(() => {
    const get_user_items = async () => {
      try {
        const { data } = await authInstance.get(
          requests.GET_USER_ITEM(userIdx)
        );
        console.log(data);
        return setMyItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    const get_my_request = async () => {
      try {
        const { data } = await authInstance.get(
          requests.GET_MY_REQUEST(userIdx)
        );

        console.log(data);
        return setOffers(data);
      } catch (error) {
        console.log(error);
      }
    };

    get_user_items();
    get_my_request();
  }, []);
  return (
    <div className="top-[60px] absolute w-full" id="check">
      <div>
        <TabBar tabNames={tabNames} getIndex={getIndex} />
      </div>
      <div className={`${page !== 0 || myItems.length === 0 ? 'hidden' : ''}`}>
        {/* {status === 'loading' && <div>Loading...</div>}{' '} */}
        {/* {status === 'success' && <ProductList items={items} />} */}
        <ProductList items={myItems} />
      </div>
      <div className={`${page !== 1 || offers.length === 0 ? 'hidden' : ''}`}>
        {/* {status === 'loading' && <div>Loading...</div>}{' '}
        {status === 'success' && <FeedList feeds={items} />} */}
        <ProductList items={offers} />
      </div>
    </div>
  );
}

export default MyBaggu;
