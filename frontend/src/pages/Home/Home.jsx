import React from 'react';
import { useEffect, useState } from 'react';
// import FeedList from 'components/common/FeedList';

// Component
import TabBar from 'components/common/TabBar';
import BagguListItem from 'components/common/BagguListItem';
import ProductListItem from 'components/common/ProductListItem';

// API
import { useInfiniteQuery, useQuery } from 'react-query';
import { get_main_items } from 'api/apis/item';
import { useInView } from 'react-intersection-observer';

// twin.macro
import tw, { styled, css } from 'twin.macro';
import { get_main_trades } from 'api/apis/feed';

// Styled Component
// Loading 컴포넌트 따로 만들기
const Loading = tw.div``;

const ListHeightWrapper = styled.div`
  ${tw`relative top-[60px]`}
  ${css`
    height: calc(100vh - 218px);
  `}
`;

const ListWrapper = styled.div`
  ${tw`relative pb-[98px]`}
`;

// Main Component
function Home() {
  // ref로 연결해놓은 요소가 화면에 보이는지 안 보이는지를 inView로 알 수 있음
  const { ref, inView } = useInView();

  useEffect(() => {
    // ref - 최근물건
    if (inView && !isFetchingNextPage && fetchNextPage) {
      fetchNextPage();
    }
    // ref - 최근바꾸
    if (inView && !isFetchingNextFeedsPage && fetchNextFeedsPage) {
      fetchNextFeedsPage();
    }
  }, [inView]);

  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [baggus, setBaggus] = useState([]);
  const tabNames = ['최근물건', '최근바꾸'];
  const getIndex = data => {
    setPage(data);
  };

  // 유저의 정보
  const userIdx = localStorage.getItem('userIdx');
  const dong = localStorage.getItem('dong');

  // 무한스크롤 - main items
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

  // 무한스크롤 - main feeds
  const {
    data: feeds,
    fetchNextPage: fetchNextFeedsPage,
    isFetchingNextPage: isFetchingNextFeedsPage,
    status: main_feed_status,
  } = useInfiniteQuery(
    'getMainFeeds',
    ({ pageParam = 0 }) => get_main_trades(pageParam),
    {
      getNextPageParam: lastPage =>
        lastPage.isLast ? undefined : lastPage.nextPage,
    }
  );

  return (
    <div id="home" className="top-[60px] absolute w-full">
      <TabBar tabNames={tabNames} getIndex={getIndex} />
      {main_item_status === 'loading' || main_feed_status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <ListHeightWrapper id="listHeightWrapper">
          {page === 0 ? (
            <ListWrapper id="listWrapper-items">
              {data?.pages.map((page, index) => (
                <>
                  {page.items.map(item => (
                    <ProductListItem key={item.itemIdx} item={item} />
                  ))}
                </>
              ))}
              {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
            </ListWrapper>
          ) : (
            <ListWrapper id="listWrapper-feeds">
              {feeds?.pages.map((page, index) => (
                <>
                  {page.items.map(feed => (
                    <BagguListItem key={feed.tradeFinIdx} baggu={feed} />
                  ))}
                </>
              ))}
              {isFetchingNextFeedsPage ? <Loading /> : <div ref={ref} />}
            </ListWrapper>
          )}
        </ListHeightWrapper>
      )}
    </div>
  );
}

export default Home;
