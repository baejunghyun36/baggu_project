import React from 'react';
import TopBar2 from 'components/common/TopBar2';
import { useQuery } from 'react-query';
import { useState } from 'react';

// API
import { get_user_review } from 'api/apis/user';

// twin.macro
import tw, { styled, css } from 'twin.macro';
import TagReviewList from 'components/common/TagReviewList';
import ReceiveReviewList from 'components/common/ReceiveReviewList';

// Styled Component
const Container = styled.div`
  ${tw`flex justify-between items-center p-2 border-b border-grey1 h-[60px] w-full`}
  & {
    img:last-child {
      ${props => (props.isCheck ? '' : tw`opacity-0`)}
    }
  }
`;
function Myreview() {
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
        setTextReviews(data.receiveReviewText);
      },
    }
  );
  return (
    <div>
      <TopBar2 title="나의 후기" />
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
  );
}

export default Myreview;
