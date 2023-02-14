import React from 'react';
import { useQuery } from 'react-query';
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
import Carousel from './Carousel';
import Chip from 'components/common/Chip';
import ItemModal from './ItemModal';
import BottomBar from 'components/common/BottomBar';
import Carousel2 from './Carousel2';
import Carousel3 from './Carousel3';
const Container = styled.div`
  ${tw`w-full`}
`;
const ListWrapper = styled.div`
  ${tw`border-t-4 mt-[60px] overflow-scroll`}
  ${css`
    height: calc(100vh - 218px);
  `}
`;
const Wrapper = tw.div`flex p-2 border-b justify-between`;
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

const Title = tw.p`text-main-bold text-xl `;
const Message = tw.span`text-sub`;
const Product = styled.div`
  ${tw`w-80 h-80 rounded bg-cover bg-center`}
  ${props =>
    css`
      background-image: url(${props.img});
    `}
`;

function Item() {
  // 사용자와 게시글 작성자가 동일인물인지 판별하는 props
  const [isSameUser, setIsSameUser] = useState(false);
  // 이미 교환신청을 넣은 사람인지 판별하는 props
  const [isAlreadyOffer, setIsAlreadyOffer] = useState(false);
  // 교환신청한 사람의 수가 가득 차있는지 확인하는 props
  const [isFull, setIsFull] = useState(false);
  const userIdx = Number(localStorage.getItem('userIdx'));
  const [canOffer, setCanOffer] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [requestUserList, setRequsetUserList] = useState([]);
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [user, setUser] = useState([]);
  const { year, month, day, hour, minute } = FormatDate(item.createdAt);
  const date = GetRelativeTime(year, month, day);
  const navigate = useNavigate();
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
  useEffect(() => {
    const get_item = async id => {
      try {
        const { data } = await authInstance.get(requests.ITEM(id));
        console.log(data);
        return setItem(data);
      } catch (error) {
        console.log(error);
      }
    };
    get_item(id);
  }, [id]);

  const { data, isLoading } = useQuery(
    ['getUser', { userIdx: item.userIdx }],
    async () => await get_user(item.userIdx),
    {
      onSuccess: data => {
        setUser(data);
        if (userIdx === item.userIdx) {
          setIsSameUser(true);
        }
        if (item.requestUserList.lenth > 10) {
          setIsFull(true);
        }
        const requestUsersList = item.requestUserList;
        const requestUsersIdx = [];
        requestUsersList.forEach(requestUser =>
          requestUsersIdx.push(requestUser.userIdx)
        );
        if (requestUsersIdx.includes(userIdx)) {
          setIsAlreadyOffer(true);
        }
      },
    }
  );

  const deleteHandler = async () => {
    try {
      const { data } = await authInstance.delete(requests.ITEM(id));
      navigate('/');
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = () => {
    navigate(`/item/${id}/edit`);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {showModal ? (
            <ItemModal
              onRemove={deleteHandler}
              onCancel={() => setShowModal(false)}
              onEdit={editHandler}
            />
          ) : (
            ''
          )}
          <TopBar2 />
          {/* <TopBar2
        title={`${userIdx === item.userIdx ? '교환할 물건 선택' : ''}`}
      /> */}
          <ListWrapper>
            <Container>
              <UserInfo user={user} />

              <Carousel3
                id="carousel3"
                imgUrls={[
                  ...item.itemImgUrls,
                  ...item.itemImgUrls,
                  ...item.itemImgUrls,
                  ...item.itemImgUrls,
                ]}
              />
              <div
                id="here"
                className="overflow-hidden p-2 flex w-full h-[300px] justify-center hover:bg-primary-hover border-b gap-2 relative"
              ></div>
              {/* <Chip tradeState={item.tradeState} /> */}

              <BagguOfferList requestUserList={item.requestUserList} />
              <div className="p-2 flex w-full justify-center hover:bg-primary-hover border-b gap-2 relative">
                <Product img={item.itemImgUrls} />
                {/* <Carousel images={item.itemImgUrls} /> */}
                <Chip tradeState={item.tradeState} />
                {/* {item.itemImgUrls && <Carousel images={item.itemImgUrls} />} */}
              </div>
            </Container>
            <Wrapper>
              <Info>
                <section>
                  <Title>{item.title}</Title>
                  <Message>
                    {CategoryTypes[item.category]} | {item.dong} |{' '}
                    {GetRelativeTime(year, month, day, hour, minute)}
                  </Message>
                </section>
                <img
                  className={`${isSameUser ? '' : 'hidden'}`}
                  onClick={() => setShowModal(true)}
                  src={option_button}
                  alt="profile_edit"
                />
              </Info>
            </Wrapper>
          </ListWrapper>
          <BottomBar
            showHeart={`${isSameUser ? false : true}`}
            canOffer={canOffer}
            btnTitle={userIdx === item.userIdx ? '바꿀 물건 선택' : '교환 신청'}
          />
        </div>
      )}
    </div>
  );
}

export default Item;
