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
import ReceiveReviewList from 'components/common/ReceiveReviewList';
// Styled Component
const ListWrapper = styled.div`
  ${tw`overflow-scroll overflow-x-hidden flex flex-col mt-[60px]`}
  ${css`
    height: calc(100vh - 298.5px);
  `}
`;
const Container = styled.div`
  ${tw`flex justify-between items-center p-2 border-b border-grey1 h-[60px] w-full`}
  & {
    img:last-child {
      ${props => (props.isCheck ? '' : tw`opacity-0`)}
    }
  }
`;
function UserDetail() {
  const [page, setPage] = useState(0);
  const tabNames = ['등록물품', '바꾸내역', '받은후기'];
  const [tagReviews, setTagReviews] = useState();
  const [textReviews, setTextReviews] = useState();
  const getIndex = data => {
    setPage(data);
  };

  const { id } = useParams();
  const { data: userInfo, isSuccess: isUserSuccess } = useQuery(
    ['getUser', { userIdx: id }],
    async () => await get_user(id)
  );
  const { data: userItems, isSuccess: isUserItemsSuccess } = useQuery(
    ['getUserItems', { userIdx: id }],
    async () => await get_user_item(id)
  );

  const { data: userTrades, isSuccess: isUserTradeSuccess } = useQuery(
    ['getUserTrades', { userIdx: id }],
    async () => await get_user_trade(id)
  );

  const { data } = useQuery(
    ['getUserReviews', { userIdx: id }],
    async () => await get_user_review(id),
    {
      onSuccess: data => {
        console.log('get user reviews', data);
        setTagReviews(data.reviewTag);
        setTextReviews(data.receiveReviewText);
      },
    }
  );
  return (
    <div>
      <TopBar2 pageTitle="유저 상세" />
      {isUserSuccess ? <UserInfo user={userInfo} /> : ''}
      <TabBar tabNames={tabNames} getIndex={getIndex} />
      <ListWrapper>
        <div className={`${page === 0 ? '' : 'hidden'}`}>
          {isUserItemsSuccess
            ? userItems.map(item => (
                <ProductListItem key={item.itemIdx} item={item} />
              ))
            : ''}
        </div>
        <div className={`${page === 1 ? '' : 'hidden'}`}>
          {isUserTradeSuccess
            ? userTrades.items.map((trade, idx) => (
                <BagguListItem key={idx} baggu={trade} />
              ))
            : ''}
        </div>
        <div className={`${page === 2 ? '' : 'hidden'}`}>
          <Container>
            <h3 className="text-h3">유저 후기</h3>
          </Container>
          <div>
            {tagReviews ? (
              <TagReviewList tags={tagReviews} />
            ) : (
              '받은 유저 후기가 없습니다.'
            )}
          </div>
          <Container>
            <h3 className="text-h3">거래 후기</h3>
          </Container>
          <div>
            {textReviews ? (
              <ReceiveReviewList reviews={textReviews} />
            ) : (
              '받은 거래 후기가 없습니다.'
            )}
          </div>
        </div>
      </ListWrapper>
    </div>
  );
}

export default UserDetail;
