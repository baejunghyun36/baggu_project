import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBar2 from '../../components/common/TopBar2';
import UserInfo from 'components/common/UserInfo';
// 유저 정보 props 받아오기
function MyProfile({ user }) {
  return (
    <div>
      <TopBar2 pageTitle="내 프로필" />
      <UserInfo user="user" />
      {/* 유저정보 컴포넌트 추가 */}
      {/* 바꾸내역 컴포넌트 추가 */}
      <div className="flex flex-col">
        <h4>나의바꾸</h4>
      </div>
      <Link to={`/myprofile/${user}/baggu`}>
        <div className="flex flex-col">
          <h4>바꾸내역</h4>
        </div>
      </Link>
      <Link to={`/myprofile/${user}/myreview`}>
        <div className="flex flex-col">
          <h4>받은후기</h4>
        </div>
      </Link>
      <Link to={`/myprofile/${user}/favorite`}>
        <div className="flex flex-col">
          <h4>관심목록</h4>
        </div>
      </Link>
      <div className="flex flex-col">
        <h4>기타</h4>
      </div>
      <Link to={`/myprofile/${user}/town`}>
        <div className="flex flex-col">
          <h4>내 동네설정</h4>
        </div>
      </Link>
    </div>
  );
}

export default MyProfile;
