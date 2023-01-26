import React from 'react';
import ProductList from 'components/common/ProductList';
import FeedList from 'components/common/FeedList';
import TabBar from 'components/common/TabBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
// components
// import TopBar1 from '../../components/common/TopBar1';

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const tabNames = ['최근물건', '최근바꾸'];
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

export default Home;
