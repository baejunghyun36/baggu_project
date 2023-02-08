import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBar2 from '../../components/common/TopBar2';
import UserInfo from 'components/common/UserInfo';

// twin.macro
import tw, { styled } from 'twin.macro';
import { logout } from 'api/apis/user';

// Styled Component
const Container = styled.div`
  ${tw`flex flex-col`}
`;

// 유저 정보 props 받아오기
function MyProfile({ user }) {
  const userIdx = localStorage.getItem('userIdx');

  // 로그아웃 클릭시 실행
  const logoutHandler = async () => {
    await logout(userIdx);
  };

  return (
    <div>
      <TopBar2 pageTitle="내 프로필" />
      <UserInfo user="user" />
      {/* 유저정보 컴포넌트 추가 */}
      {/* 바꾸내역 컴포넌트 추가 */}
      <Container>
        <h4>나의바꾸</h4>
      </Container>
      <Link to={`/myprofile/${user}/baggu`}>
        <Container>
          <h4>바꾸내역</h4>
        </Container>
      </Link>
      <Link to={`/myprofile/${user}/myreview`}>
        <Container>
          <h4>받은후기</h4>
        </Container>
      </Link>
      <Link to={`/myprofile/${user}/favorite`}>
        <Container>
          <h4>관심목록</h4>
        </Container>
      </Link>
      <Container>
        <h4>기타</h4>
      </Container>
      <Container to={`/myprofile/${user}/town`}>
        <div>
          <h4>내 동네설정</h4>
        </div>
      </Container>
      <Container onClick={logoutHandler}>
        <h4>로그아웃</h4>
      </Container>
    </div>
  );
}

export default MyProfile;
