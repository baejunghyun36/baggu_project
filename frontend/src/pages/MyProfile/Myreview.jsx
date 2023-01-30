import React from 'react';
import TopBar2 from 'components/common/TopBar2';
import DealReviewList from 'components/common/DealReviewList';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Myreview() {
  const [reviews, setReviews] = useState([]);
  async function getReviews() {
    try {
      //응답 성공
      const json = await axios.get(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      );
      console.log(json);
      setReviews(json.data.data.movies);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }
  useEffect(() => {
    getReviews();
  }, []);
  return (
    <div>
      <TopBar2 pageTitle="나의 후기" />
      <DealReviewList reviews={reviews} />
    </div>
  );
}

export default Myreview;
