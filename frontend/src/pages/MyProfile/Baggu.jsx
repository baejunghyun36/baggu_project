import React from 'react';
import FeedList from 'components/common/FeedList';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Baggu() {
  const [feeds, setFeeds] = useState([]);
  async function getFeeds() {
    try {
      //응답 성공
      const json = await axios.get(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      );
      console.log(json);
      setFeeds(json.data.data.movies);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }
  useEffect(() => {
    getFeeds();
  }, []);
  return (
    <div>
      <h3>바꾸내역</h3>
      <FeedList feeds={feeds} />
    </div>
  );
}

export default Baggu;
