import React from 'react';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Commponents
import ProductListItem from 'components/common/ProductListItem';
import BagguListItem from 'components/common/BagguListItem';
import TabBar from 'components/common/TabBar';
import TopBar2 from 'components/common/TopBar2';
import UserInfo from 'components/common/UserInfo';

// API
import { get_user_item, get_user_review, get_user_trade } from 'api/apis/user';

// twin.macro
import tw, { styled, css } from 'twin.macro';

// Styled Component
const ListWrapper = styled.div`
  ${tw`overflow-scroll overflow-x-hidden flex flex-col mt-[60px]`}
  ${css`
    height: calc(100vh - 298.5px);
  `}
`;

// Main Component
function UserDetail() {
  // TabBar 관련 State
  const [page, setPage] = useState(0);
  const tabNames = ['등록물품', '바꾸내역', '거래후기'];
  const getIndex = data => {
    setPage(data);
  };
  // 유저 id
  const thisUserIdx = useParams();

  // 등록물품
  const [items, setItems] = useState([]);
  // 바꾸내역
  const [trades, setTrades] = useState([]);
  // 후기
  const [reviews, setReviews] = useState([]);

  // 유저의 등록물품 GET
  /*
  	{
		"itemIdx": 2,
		"title": "델 노트북",
		"dong": "당산동",
		"createdAt": "2023-01-28T18:14:45",
		"tradeState": 0,
		"reviewState": false,
		"itemImgUrl": "https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/c5d9b362-7abb-404c-9494-ba42d9fad6f1.png"
	}
  */
  useEffect(() => {
    // const { data: userItems } = useQuery(
    //   ['getUserItems', { userIdx: thisUserIdx }],
    //   () => get_user_item(thisUserIdx),
    //   { onSuccess: data => setItems(data) }
    // );
    // // 유저의 바꾸내역 GET
    // const { data: userTrades } = useQuery(
    //   ['getUserTrades', { userIdx: thisUserIdx }],
    //   () => get_user_trade(thisUserIdx),
    //   { onSuccess: data => setTrades(data) }
    // );
    // // 유저의 후기 GET
    // const { data: userReviews } = useQuery(
    //   ['getUserReviews', { userIdx: thisUserIdx }],
    //   () => get_user_review(thisUserIdx),
    //   { onSuccess: data => setReviews(data) }
    // );

    setTrades([
      {
        requestNickname: 'nickname5',
        receiveNickname: 'nickname1',
        requestItemIdx: 15,
        receiveItemIdx: 3,
        requestItemImgUrl:
          'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/c5d9b362-7abb-404c-9494-ba42d9fad6f1.png',
        receiveItemImgUrl:
          'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/c5d9b362-7abb-404c-9494-ba42d9fad6f1.png',
        heartCount: 0,
        createdAt: '2023-01-30T23:30:05.077794',
        userHeart: false,
      },
      {
        requestNickname: 'nickname1',
        receiveNickname: 'nickname3',
        requestItemIdx: 2,
        receiveItemIdx: 7,
        requestItemImgUrl:
          'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/c5d9b362-7abb-404c-9494-ba42d9fad6f1.png',
        receiveItemImgUrl:
          'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/c5d9b362-7abb-404c-9494-ba42d9fad6f1.png',
        heartCount: 3,
        createdAt: '2023-01-30T23:25:12.062013',
        userHeart: true,
      },
    ]);
  }, []);

  return (
    <div>
      {/* 유저 이름 props하기 */}
      <TopBar2 pageTitle="유저 상세" />
      <UserInfo user="user" />
      <TabBar tabNames={tabNames} getIndex={getIndex} />
      <ListWrapper>
        <div className={`${page === 0 ? '' : 'hidden'}`}>
          {items
            ? items.map(item => (
                <ProductListItem key={item.itemIdx} item={item} />
              ))
            : ''}
        </div>
        <div className={`${page === 1 ? '' : 'hidden'}`}>
          {trades
            ? trades.map((trade, idx) => (
                <BagguListItem key={idx} baggu={trade} />
              ))
            : ''}
        </div>
        <div className={`${page === 2 ? '' : 'hidden'}`}></div>
      </ListWrapper>
    </div>
  );
}

export default UserDetail;
