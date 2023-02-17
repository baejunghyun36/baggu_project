import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

const ReviewWrapper = styled.div`
  ${tw`border-t-4 overflow-scroll`}
  ${css`
    height: calc(100vh - 218px);
  `}
`;

const ReviewList = styled.div`
  ${tw`relative overflow-scroll overflow-x-hidden`}
  ${css`
    height: calc(100vh - 158px);
  `}
`;
const Info = styled.div`
  ${tw`relative flex mr-2 overflow-hidden box-content whitespace-nowrap text-ellipsis`}
  ${css`
    width: calc(100% - 112px);
  `}

  & {
    section {
      ${tw`flex-col`}
    }
  }
`;
const Message = tw.span`text-sub text-grey3`;
const Product = styled.div`
  ${tw`w-10 h-10 rounded bg-cover bg-center shadow`}
  ${props =>
    css`
      background-image: url(${props.img});
    `}
`;

function ReceiveReviewList({ reviews }) {
  console.log(reviews);
  return (
    <ReviewList>
      {reviews
        ? reviews.map(review => (
            <div key={review.targetItemIdx} className="justify-center">
              <Product img={review.targetItemFirstImgUrl} />
              <Message>{review.reviewText}</Message>
            </div>
          ))
        : ''}
      <hr />
    </ReviewList>
  );
}

export default ReceiveReviewList;
