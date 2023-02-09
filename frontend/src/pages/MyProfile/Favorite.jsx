import React from 'react';
import TopBar2 from 'components/common/TopBar2';
import FavoriteList from './FavoriteList';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { authInstance } from 'api/axios';
import requests from 'api/config';

function Favorite() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // 유저 관심목록 받아오는 api 개발 미완성
    const get_main_items = async () => {
      try {
        const { data } = await authInstance.get(
          requests.GET_MAIN_ITEM('역삼동', 0),
          {
            dong: '역삼동',
          }
        );
        console.log(data);
        return setItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    get_main_items();
  }, []);
  return (
    <div>
      <TopBar2 title="관심목록" />
      <FavoriteList items={items} />
    </div>
  );
}

export default Favorite;
