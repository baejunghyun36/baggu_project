import React from 'react';
import ProductList from 'components/common/ProductList';
import { useEffect, useState } from 'react';
import BagguList from 'components/common/BagguList';
import TabBar from 'components/common/TabBar';
import { authInstance } from 'api/axios';
import requests from 'api/config';
import ProductListItem from 'components/common/ProductListItem';

// twin.macro
import tw, { styled, css } from 'twin.macro';

// Styled Component
const ListWrapper = styled.div`
  ${tw`relative top-[60px] overflow-scroll overflow-x-hidden`}
  ${css`
    height: calc(100vh - 218px);
  `}
`;

// Main Component
function MyBaggu() {
  const userIdx = Number(localStorage.getItem('userIdx'));
  const [page, setPage] = useState(0);
  const [myItems, setMyItems] = useState([]);
  const [offers, setOffers] = useState([]);
  const tabNames = ['나의 물품 관리', '내가 보낸 바꾸신청'];
  const getIndex = data => {
    setPage(data);
  };
  useEffect(() => {
    const get_user_items = async () => {
      try {
        const { data } = await authInstance.get(
          requests.GET_USER_ITEM(userIdx)
        );
        console.log(data);
        return setMyItems(data.items);
      } catch (error) {
        console.log(error);
      }
    };
    const get_my_request = async () => {
      try {
        const { data } = await authInstance.get(
          requests.GET_MY_REQUEST(userIdx)
        );

        console.log(data);
        return setOffers(data);
      } catch (error) {
        console.log(error);
      }
    };

    get_user_items();
    get_my_request();
  }, []);
  console.log('myItems :', myItems);
  console.log('offers :', offers);
  return (
    <div className="top-[60px] relative w-full" id="check">
      <TabBar tabNames={tabNames} getIndex={getIndex} />
      <ListWrapper id="listWrapper">
        {page === 0
          ? myItems
            ? myItems.map(offer => (
                <ProductListItem key={offer.itemIdx} item={offer} />
              ))
            : ''
          : ''}
        {page === 1
          ? offers
            ? offers.map(offer => (
                <ProductListItem key={offer.itemIdx} item={offer} />
              ))
            : ''
          : ''}
      </ListWrapper>
    </div>
  );
}

export default MyBaggu;
