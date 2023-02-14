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
import tw, { styled, css } from 'twin.macro';

// Styled Component
// Loading 컴포넌트 따로 만들기
const Loading = tw.div``;

const ListWrapper = styled.div`
  ${css`
    height: calc(100vh -218px);
  `}
`;

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
    isFetchingNextPage,
    status: main_item_status,
  } = useInfiniteQuery(
    // queryKey
    ['getMainItems', { dong: dong }],
    // queryFn
    ({ pageParam = 0 }) => get_main_items(pageParam),
    // options
    {
      getNextPageParam: lastPage =>
        lastPage.isLast ? undefined : lastPage.nextPage,
    }
  );

  useEffect(() => {
    // ref
    if (inView) {
      fetchNextPage();
    }

    // const get_main_feeds = async () => {
    //   try {
    //     const { data } = await authInstance.get(requests.GET_MAIN_TRADE(0));

    //     console.log(data);
    //     return setBaggus(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // get_main_feeds();
  }, [inView]);
  console.log('data :', data);
  return (
    <div id="home" className="top-[60px] absolute w-full">
      <TabBar tabNames={tabNames} getIndex={getIndex} />
      <div className={`${page === 0 ? '' : 'hidden'}`}>
        {main_item_status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          <ListWrapper id="listWrapper">
            <div>
              {data?.pages.map((page, index) => (
                <>
                  {page.items.map(item => (
                    <ProductListItem key={item.itemIdx} item={item} />
                  ))}
                </>
              ))}
            </div>
            {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
          </ListWrapper>
        )}
      </div>
      <div className={`${page === 1 ? '' : 'hidden'}`}>
        <BagguList baggus={baggus} />
      </div>
    </div>
  );
}

export default Home;
