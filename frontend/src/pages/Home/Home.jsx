import React from 'react';
import { useEffect, useState } from 'react';
// import FeedList from 'components/common/FeedList';

// Component
import ProductList from 'components/common/ProductList';
import BagguList from 'components/common/BagguList';
import TabBar from 'components/common/TabBar';

// API
import { authInstance } from 'api/axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import { get_main_items } from 'api/apis/item';
import { useInView } from 'react-intersection-observer';
import requests from 'api/config';
import ProductListItem from 'components/common/ProductListItem';

// twin.macro
import tw from 'twin.macro';

// Styled Component
// Loading 컴포넌트 따로 만들기
const Loading = tw.div``;

// Main Component
function Home() {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [baggus, setBaggus] = useState([]);
  const tabNames = ['최근물건', '최근바꾸'];
  const getIndex = data => {
    setPage(data);
  };

  // ref로 연결해놓은 요소가 화면에 보이는지 안 보이는지를 inView로 알 수 있음
  const { ref, inView } = useInView();

  // 유저의 정보
  const userIdx = localStorage.getItem('userIdx');
  const dong = localStorage.getItem('dong');

  // 무한스크롤
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: main_item_status,
  } = useInfiniteQuery({
    queryKey: ['getMainItems', { dong: dong }],
    queryFn: get_main_items,
    getNextPageParam: lastPage => (lastPage.isLast ? undefined : lastPage + 1),
  });

  useEffect(() => {
    // const get_main_items = async () => {
    //   try {
    //     const { data } = await authInstance.get(
    //       requests.GET_MAIN_ITEM(dong, 0),
    //       {
    //         dong: dong,
    //       }
    //     );
    //     console.log(data);
    //     return setItems(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // ref
    if (inView) {
      fetchNextPage();
      console.log('fetchNextPage');
    }

    const get_main_feeds = async () => {
      try {
        const { data } = await authInstance.get(requests.GET_MAIN_TRADE(0));

        console.log(data);
        return setBaggus(data);
      } catch (error) {
        console.log(error);
      }
    };

    get_main_feeds();
  }, [inView]);
  return (
    <div className="top-[60px] absolute w-full" id="check">
      <div>
        <TabBar tabNames={tabNames} getIndex={getIndex} />
      </div>
      <div className={`${page === 0 ? '' : 'hidden'}`}>
        {main_item_status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          // <ProductList items={items} />
          <>
            <div>
              {data?.pages.map((page, index) => (
                <ProductList key={index} items={page} />
              ))}
            </div>
            {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
          </>
        )}
      </div>
      <div className={`${page === 1 ? '' : 'hidden'}`}>
        <BagguList baggus={baggus} />
      </div>
    </div>
  );
}

export default Home;
