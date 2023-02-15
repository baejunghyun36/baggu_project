import React from 'react';
import TopBar2 from 'components/common/TopBar2';
import ProductListItem from 'components/common/ProductListItem';
import BagguListItem from 'components/common/BagguListItem';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// API
import { get_user_review, get_user_trade } from 'api/apis/user';

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

function Myreview() {
  const [reviews, setReviews] = useState([]);
  const userIdx = Number(localStorage.getItem('userIdx'));
  const [tagReviews, setTagReviews] = useState();
  const [textReviews, setTextReviews] = useState();
  const { data } = useQuery(
    ['getUserReviews', { userIdx: userIdx }],
    async () => await get_user_review(userIdx),
    {
      onSuccess: data => {
        console.log('get user reviews', data);
        setTagReviews(data.reviewTag);
        // setTextReviews(data.)
      },
    }
  );
  return (
    <div>
      <TopBar2 pageTitle="나의 후기" />
      <div>
        {tagReviews ? (
          <TagReviewList tags={tagReviews} />
        ) : (
          '받은 유저 후기가 없습니다.'
        )}
      </div>
    </div>
  );
}

export default Myreview;
