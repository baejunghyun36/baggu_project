import React from 'react';
// import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import ProductList from 'components/common/ProductList';
// import FeedList from 'components/common/FeedList';
import BagguList from 'components/common/BagguList';
import TabBar from 'components/common/TabBar';
import { authInstance } from 'api/axios';
import requests from 'api/config';

function Home() {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [baggus, setBaggus] = useState([]);
  const tabNames = ['최근물건', '최근바꾸'];
  const getIndex = data => {
    setPage(data);
  };
  useEffect(() => {
    const get_main_items = async () => {
      try {
        const { data } = await authInstance.get(
          requests.GET_MAIN_ITEM('역삼동'),
          {
            dong: '',
          }
        );
        console.log(data);
        return setItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    const get_main_feeds = async () => {
      try {
        const { data } = await authInstance.get(requests.GET_MAIN_TRADE);

        return setBaggus(data);
      } catch (error) {
        console.log(error);
      }
    };

    get_main_items();
    get_main_feeds();
  }, []);
  return (
    <div className="top-[60px] absolute w-full" id="check">
      <div>
        <TabBar tabNames={tabNames} getIndex={getIndex} />
      </div>
      <div className={`${page === 0 ? '' : 'hidden'}`}>
        {/* {status === 'loading' && <div>Loading...</div>}{' '} */}
        {/* {status === 'success' && <ProductList items={items} />} */}
        <ProductList items={items} />
      </div>
      <div className={`${page === 1 ? '' : 'hidden'}`}>
        {/* {status === 'loading' && <div>Loading...</div>}{' '}
        {status === 'success' && <FeedList feeds={items} />} */}
        <BagguList baggus={baggus} />
      </div>
    </div>
  );
}

export default Home;
