import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authInstance } from 'api/axios';
import requests from 'api/config';
import TopBar2 from '../../components/common/TopBar2';
import UserInfo from 'components/common/UserInfo';
import BagguOfferList from './BagguOfferList';

function Item() {
  const { id } = useParams();
  // const { data: movie, status } = useQuery('getMovie', async () => {
  //   const response = await axios.get(
  //     `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
  //   );
  //   return response.data.data.movie;
  // });
  const [item, setItem] = useState([]);
  useEffect(() => {
    const get_item = async id => {
      try {
        const { data } = await authInstance.get(requests.ITEM(id));
        console.log(data);
        return setItem(data);
      } catch (error) {
        console.log(error);
      }
    };
    get_item(id);
  }, []);
  return (
    <div>
      <TopBar2 />
      <UserInfo user="user" />
      <div>
        {/* {status === 'loading' && <div>Loading...</div>}{' '} */}
        {/* {status === 'success' && <img src={item.itemImgUrl} alt="" />} */}
        <img src={item.itemImgUrl} alt="" />
        {/* {status === 'success' && <BagguOfferList offers={movie} />} */}
      </div>
    </div>
  );
}

export default Item;
