import React from 'react';
import { useParams } from 'react-router';
import tw, { styled, css } from 'twin.macro';

// components
import TopBar2 from 'components/common/TopBar2';

// react-query
import { useQuery } from 'react-query';
import axios from 'axios';

// styled components
const Summary = styled.div``;

function ChatDetail() {
  const { id } = useParams();
  const API_URL = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;
  const queryFn = () => {
    return axios.get(API_URL);
  };

  const { isLoading, isError, data, error } = useQuery(
    'getChatDetail',
    queryFn
  );
  if (isLoading) {
    return <span>Loading...</span>;
  }

  const movie = data.data.data.movie;

  return (
    <div>
      <TopBar2 title={movie.title} isCheck={false} />
      <Summary>
        <div>
          <div id="myProduct"></div>
          <div id="yourPruduct"></div>
        </div>
        <div id="status"></div>
      </Summary>
    </div>
  );
}

export default ChatDetail;
