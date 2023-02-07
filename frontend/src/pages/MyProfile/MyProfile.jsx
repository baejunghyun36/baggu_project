import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBar2 from '../../components/common/TopBar2';
import UserInfo from 'components/common/UserInfo';
import tw, { styled, css } from 'twin.macro';
import { authInstance } from 'api/axios';
import requests from 'api/config';
// 유저 정보 props 받아오기

const Container = styled.div`
  ${tw`w-full`}
`;

const Wrapper = tw.div`flex p-2 border-b justify-between hover:bg-primary-hover`;

function MyProfile() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const get_user = async () => {
      try {
        const { data } = await authInstance.get(requests.GET_USER(1));

        console.log(data);
        return setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    get_user();
  }, []);
  return (
    <div>
      <TopBar2 title="내 프로필" />
      <UserInfo user={user} />
      {/* 유저정보 컴포넌트 추가 */}
      {/* 바꾸내역 컴포넌트 추가 */}
      <div className="flex flex-col">
        <h4>나의바꾸</h4>
      </div>
      <Link to={`/myprofile/${user.userIdx}/baggu`}>
        <div className="flex flex-col">
          <h4>바꾸내역</h4>
        </div>
      </Link>
      <Link to={`/myprofile/${user.userIdx}/myreview`}>
        <div className="flex flex-col">
          <h4>받은후기</h4>
        </div>
      </Link>
      <Link to={`/myprofile/${user.userIdx}/favorite`}>
        <div className="flex flex-col">
          <h4>관심목록</h4>
        </div>
      </Link>
      <div className="flex flex-col">
        <h4>기타</h4>
      </div>
      <Link to={`/myprofile/${user.userIdx}/town`}>
        <div className="flex flex-col">
          <h4>내 동네설정</h4>
        </div>
      </Link>
    </div>
  );
}

export default MyProfile;
