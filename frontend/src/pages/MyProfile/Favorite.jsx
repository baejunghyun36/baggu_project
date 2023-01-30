import React from 'react';
import TopBar2 from 'components/common/TopBar2';
import FavoriteList from './FavoriteList';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Favorite() {
  const [items, setItems] = useState([]);
  async function getItems() {
    try {
      //응답 성공
      const json = await axios.get(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      );
      console.log(json);
      setItems(json.data.data.movies);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }
  useEffect(() => {
    getItems();
  }, []);
  return (
    <div>
      <TopBar2 pageTitle="관심목록" />
      <FavoriteList items={items} />
    </div>
  );
}

export default Favorite;
