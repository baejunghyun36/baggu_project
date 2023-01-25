import React from 'react';
import ProductList from 'components/common/ProductList';
import FeedList from 'components/common/FeedList';
import { useEffect, useState } from 'react';
import axios from 'axios';
// components
// import TopBar1 from '../../components/common/TopBar1';

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(false);
  const onClickItemPage = () => {
    setPage(false);
  };
  const onClickBagguPage = () => {
    setPage(true);
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
      <span onClick={onClickItemPage}>최근물품</span>
      <span onClick={onClickBagguPage}>최근바꾸</span>
      <div className={`${page ? 'hidden' : ''}`}>
        <ProductList movies={movies} />
      </div>
      <div className={`${page ? '' : 'hidden'}`}>
        <FeedList feeds={movies} />
      </div>
    </div>
  );
}

export default Home;
