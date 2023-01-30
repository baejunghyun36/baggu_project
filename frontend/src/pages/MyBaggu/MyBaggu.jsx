import React from 'react';
import ProductList from 'components/common/ProductList';
import { useEffect, useState } from 'react';
import FeedList from 'components/common/FeedList';
import TabBar from 'components/common/TabBar';
import axios from 'axios';

function MyBaggu() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const tabNames = ['나의 물품 관리', '내가 보낸 바꾸신청'];
  const getIndex = data => {
    setPage(data);
  };
  async function getMovies() {
    try {
      //응답 성공
      const json = await axios.get(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      );
      console.log(json);
      setMovies(json.data.data.movies);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <TabBar tabNames={tabNames} getIndex={getIndex} />
      <div className={`${page === 0 ? '' : 'hidden'}`}>
        <ProductList movies={movies} />
      </div>
      <div className={`${page === 1 ? '' : 'hidden'}`}>
        <FeedList feeds={movies} />
      </div>
    </div>
  );
}

export default MyBaggu;
