import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBar2 from '../../components/common/TopBar2';
import UserInfo from 'components/common/UserInfo';
//상태관리 사용해서 구현
function Item() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      <TopBar2 />
      <UserInfo User="user" />
      <img src={movie.medium_cover_image} alt="" />
    </div>
  );
}

export default Item;
