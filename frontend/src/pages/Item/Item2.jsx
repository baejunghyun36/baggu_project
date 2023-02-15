import React from 'react';
import { useQueries, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { authInstance } from 'api/axios';
import requests from 'api/config';
import TopBar2 from 'components/common/TopBar2';
import UserInfo from 'components/common/UserInfo';
import BagguOfferList from './BagguOfferList';
import { get_user } from 'api/apis/user';
import tw, { styled, css } from 'twin.macro';
import FormatDate from 'hooks/FormatDate';
import GetRelativeTime from 'hooks/GetRelativeTime';
import option_button from 'assets/icons/option_button.svg';
import Chip from 'components/common/Chip';
import ItemModal from './ItemModal';
import ItemBottomBar from './ItemBottomBar';
import Carousel3 from './Carousel3';
import { get_item } from 'api/apis/item';
import UserInfo2 from 'components/common/UserInfo2';
import ItemDetailBottomBar from 'components/common/ItemDetailBottomBar';

// Styled component
const Container = styled.div`
  ${tw`w-full`}
`;
const ListWrapper = styled.div`
  ${tw`border-t-2 overflow-scroll overflow-x-hidden`}
  ${css`
    height: calc(100vh - 158px);
  `}
`;
const Wrapper = tw.div`flex p-2 border-b justify-between`;

const Info = styled.div`
  ${tw`relative flex items-start mr-[4px] overflow-hidden box-content whitespace-nowrap text-ellipsis w-full`}

  & {
    section {
      ${tw`flex-col`}
    }
  }
`;

const Title = tw.p`text-main-bold text-xl `;
const Message = tw.span`text-sub`;
const Product = styled.div`
  ${tw`w-80 h-80 rounded bg-cover bg-center`}
  ${props =>
    css`
      background-image: url(${props.img});
    `}
`;

const BagguListHeading = styled.div`
  ${tw`flex`}
`;

// Main Component
const Item2 = props => {
  // itemIdx
  const { id: itemIdx } = useParams();

  // 로그인한 사용자
  const me = Number(localStorage.getItem('userIdx'));

  // 작성자
  const [writer, setWriter] = useState();
  // 아이템 정보
  const [item, setItem] = useState();
  // 신청자 리스트
  const [requestList, setRequestList] = useState([]);

  // 아이템 가져온 후 작성자 가져오기
  useEffect(() => {
    get_item(itemIdx).then(data => {
      setItem(data);
      setRequestList(data.requestUserList);
    });
  }, []);

  useEffect(() => {
    get_user(item?.userIdx).then(data => {
      setWriter(data);
    });
  }, [item]);

  useEffect(() => {});

  const CategoryTypes = [
    '디지털기기',
    '생활가전',
    '가구/인테리어',
    '생활/주방',
    '여성의류',
    '여성잡화',
    '남성패션/잡화',
    '뷰티/미용',
    '스포츠/레저',
    '취미/게임/음반',
    '도서',
    '가공식품',
    '반려동물용품',
    '기타',
  ];

  // 신청자 목록
  const requestUserIdxList = [];
  requestList.forEach(request => requestUserIdxList.push(request.userIdx));
  console.log('requestUserIdxList', requestUserIdxList);

  // 버튼 제목
  let btnTitle = '';
  console.log('me :', typeof me, 'writer :', typeof writer.userIdx);
  if (me === writer?.userIdx) {
    btnTitle = '교환할 물건 선택';
  } else if (me !== writer?.userIdx && !requestUserIdxList.includes(me)) {
    btnTitle = '바꾸신청';
  } else if (me !== writer?.userIdx && requestUserIdxList.includes(me)) {
    btnTitle = '바꾸신청 취소';
  }

  return (
    <div>
      <TopBar2 />
      {writer ? <UserInfo user={writer} /> : ''}
      {item ? (
        <>
          <Carousel3 imgUrls={item.itemImgUrls} />
          <Wrapper>
            <Info>
              <section>
                <Title>{item.title}</Title>
                <Message>
                  {CategoryTypes[item.category]} | {item.dong} |
                  {GetRelativeTime(FormatDate(item.createdAt))}
                </Message>
              </section>
              <img src={option_button} alt="profile_edit" />
            </Info>
          </Wrapper>
          <Wrapper id="content">
            <p>{item.content}</p>
          </Wrapper>
        </>
      ) : (
        ''
      )}
      {requestList ? (
        <div>
          <BagguListHeading>
            <h3>신청자 목록</h3>
            <span>{requestList.length} / 10</span>
          </BagguListHeading>
          {requestList.map((request, index) => (
            <div key={index}>
              <UserInfo2 addUserIdx={request.userIdx} />
              {request.requestItemList.map(item => (
                <div key={item.requestItemIdx} img={item.requestItemFirstImg} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
      <ItemDetailBottomBar btnTitle={btnTitle} />
    </div>
  );
};

export default Item2;
