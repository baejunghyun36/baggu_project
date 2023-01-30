import React from 'react';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TabBar from 'components/common/TabBar';
import ProductList from 'components/common/ProductList';
import FeedList from 'components/common/FeedList';
import TopBar2 from 'components/common/TopBar2';
import UserInfo from 'components/common/UserInfo';

function UserDetail() {
  const [page, setPage] = useState(0);
  const tabNames = ['등록물품', '바꾸내역', '거래후기'];
  const getIndex = data => {
    setPage(data);
  };
  //   유저 정보 가져오는 API로 변경
  const { data: movies, status } = useQuery('data', async () => {
    const response = await axios.get(
      'https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year'
    );
    return response.data.data.movies;
  });
  return (
    <div>
      <div>
        {/* 유저 이름 props하기 */}
        <TopBar2 pageTitle="유저 상세" />
      </div>
      <div>
        <UserInfo user="user" />
      </div>
      <div>
        <TabBar tabNames={tabNames} getIndex={getIndex} />
      </div>
      {/* 하단 컴포넌트는 예시 */}
      <div className={`${page === 0 ? '' : 'hidden'}`}>
        {status === 'loading' && <div>Loading...</div>}{' '}
        {status === 'success' && <ProductList movies={movies} />}
      </div>
      <div className={`${page === 1 ? '' : 'hidden'}`}>
        {status === 'loading' && <div>Loading...</div>}{' '}
        {status === 'success' && <FeedList feeds={movies} />}
      </div>
      <div className={`${page === 2 ? '' : 'hidden'}`}>
        {status === 'loading' && <div>Loading...</div>}{' '}
        {status === 'success' && <ProductList movies={movies} />}
      </div>
    </div>
  );
}

export default UserDetail;
