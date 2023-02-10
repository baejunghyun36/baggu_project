import React from 'react';

// twin.macro
import tw, { styled } from 'twin.macro';

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
// Styled Component
const TagStyles = {
  0: tw``,
  1: tw``,
  2: tw``,
  3: tw``,
};
const Tag = styled.div`
  ${props => TagStyles[props.type]}
  ${tw`p-1 px-[12px] text-main text-black bg-success rounded-full border-1`}
`;

const TagWrapper = tw.div`flex gap-1`;

const TagList = tw.div`flex flex-col gap-1 p-2`;

// Main Component
const TagReviewList = ({ tags }) => {
  /*
  < props >
  1. tags =  {
        "1": 1,
        "2": 2,
        "3": 1
    },
  */
  const userReviews = [
    '시간 약속을 잘 지켜요.',
    '친절하고 매너가 좋아요.',
    '답장이 빨라요.',
    '상품설명과 상품상태가 같아요.',
  ];

  return (
    <TagList>
      {tags
        ? Object.keys(tags).map(idx => (
            <TagWrapper key={idx}>
              <Tag>{userReviews[idx]}</Tag>
              <span>{tags[idx]}</span>
            </TagWrapper>
          ))
        : ''}
    </TagList>
  );
};

export default TagReviewList;
