import React from 'react';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from 'components/common/ProductList';
import FeedList from 'components/common/FeedList';
import TabBar from 'components/common/TabBar';

function Home() {
  const [page, setPage] = useState(0);
  const tabNames = ['최근물건', '최근바꾸'];
  const getIndex = data => {
    setPage(data);
  };

  const { data: movies, status } = useQuery('getMovies', async () => {
    const response = await axios.get(
      'https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year'
    );
    return response.data.data.movies;
  });

  return (
    <div>
      <div>
        <TabBar tabNames={tabNames} getIndex={getIndex} />
      </div>
      <div className={`${page === 0 ? '' : 'hidden'}`}>
        {status === 'loading' && <div>Loading...</div>}{' '}
        {status === 'success' && <ProductList movies={movies} />}
      </div>
      <div className={`${page === 1 ? '' : 'hidden'}`}>
        {status === 'loading' && <div>Loading...</div>}{' '}
        {status === 'success' && <FeedList feeds={movies} />}
      </div>
    </div>
  );
}

export default Home;
