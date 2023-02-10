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
import {
  get_user,
  get_user_item,
  get_user_review,
  get_user_trade,
} from 'api/apis/user';

// twin.macro
import tw, { styled, css } from 'twin.macro';
import HeadingBar from 'components/common/HeadingBar';
import TagReviewList from 'components/common/TagReviewList';

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
  const tabNames = ['등록물품', '바꾸내역', '받은후기'];
  const getIndex = data => {
    setPage(data);
  };

  // State
  const [items, setItems] = useState();
  const [trades, setTrades] = useState();
  const [tagReviews, setTagReviews] = useState();
  const [textReviews, setTextReviews] = useState();

  // 유저 id
  const { id } = useParams();
  console.log('id', id);

  // 유저정보 GET
  const { data: userInfo, isSuccess: isUserSuccess } = useQuery(
    ['getUser', { userIdx: id }],
    async () => await get_user(id)
  );
  console.log('userInfo', userInfo);
  const { data: userItems, isSuccess: isUserItemsSuccess } = useQuery(
    ['getUserItems', { userIdx: id }],
    async () => await get_user_item(id)
    // { onSuccess: userItems => setItems(userItems) }
  );
  // 유저의 바꾸내역 GET
  const { data: userTrades } = useQuery(
    ['getUserTrades', { userIdx: id }],
    async () => await get_user_trade(id)
    // { onSuccess: data => setTrades(data) }
  );
  // 유저의 후기 GET
  const { data } = useQuery(
    ['getUserReviews', { userIdx: id }],
    async () => await get_user_review(id),
    {
      onSuccess: data => {
        console.log('get user reviews', data);
        setTagReviews(data.reviewTag);
        // setTextReviews(data.)
      },
    }
  );

  /*
    {
        "reviewTag": {
            "1": 1,
            "2": 2,
            "3": 1
        },
        "receiveReviewText": [
            "좋은 물건 구해서 행복합니다"
        ],
        "requestReviewText": [
            {
                "targetItemIdx": 7,
                "writeUserIdx": 1,
                "reviewText": "좋아요!!!~",
                "profileImg": "이미지링크"
            },
            {
                "targetItemIdx": 15,
                "writeUserIdx": 1,
                "reviewText": "물건이 예쁩니다",
                "profileImg": "이미지링크"
            }
        ]
    }
  */

  console.log('userItems', userItems);

  return (
    <div>
      {/* 유저 이름 props하기 */}
      <TopBar2 pageTitle="유저 상세" />
      {isUserSuccess ? <UserInfo user={userInfo} /> : ''}
      <TabBar tabNames={tabNames} getIndex={getIndex} />
      <ListWrapper>
        <div className={`${page === 0 ? '' : 'hidden'}`}>
          {userItems
            ? userItems.map(item => (
                <ProductListItem key={item.itemIdx} item={item} />
              ))
            : ''}
        </div>
        <div className={`${page === 1 ? '' : 'hidden'}`}>
          {userTrades
            ? userTrades.map((trade, idx) => (
                <BagguListItem key={idx} baggu={trade} />
              ))
            : ''}
        </div>
        <div className={`${page === 2 ? '' : 'hidden'}`}>
          {tagReviews ? (
            <TagReviewList tags={tagReviews} />
          ) : (
            '받은 유저 후기가 없습니다.'
          )}
        </div>
      </ListWrapper>
    </div>
  );
}

export default UserDetail;
