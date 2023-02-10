import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBar2 from '../../components/common/TopBar2';
import UserInfo from 'components/common/UserInfo';
import tw, { styled, css } from 'twin.macro';
import { authInstance } from 'api/axios';
import requests from 'api/config';

// twin.macro
import { logout } from 'api/apis/user';
import Modal from 'components/common/Modal';

// Styled Component
const Container = styled.div`
  ${tw`flex flex-col p-2 border-b`}
`;

// 유저 정보 props 받아오기
const userIdx = localStorage.getItem('userIdx');

// 로그아웃 클릭시 실행
const logoutHandler = async () => {
  await logout(userIdx);
};

const Wrapper = tw.div`flex p-2 border-b justify-between hover:bg-primary-hover`;

function MyProfile() {
  // 모달 상태
  const [showModal, setShowModal] = useState(false);

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
      {showModal ? <Modal /> : ''}
      <TopBar2 title="내 프로필" />
      <UserInfo user={user} />
      <Container className="font-bold">
        <h4>나의바꾸</h4>
      </Container>
      <Link to={`/myprofile/${user.userIdx}/baggu`}>
        <Container>
          <h4>바꾸내역</h4>
        </Container>
      </Link>
      <Link to={`/myprofile/${user.userIdx}/myreview`}>
        <Container>
          <h4>받은후기</h4>
        </Container>
      </Link>
      <Link to={`/myprofile/${user.userIdx}/favorite`}>
        <Container>
          <h4>관심목록</h4>
        </Container>
      </Link>
      <Container className="font-bold">
        <h4>기타</h4>
      </Container>
      <Link to={`/myprofile/${user.userIdx}/town`}>
        <Container>
          <h4>내 동네설정</h4>
        </Container>
      </Link>
      <Container onClick={logoutHandler}>
        <h4>로그아웃</h4>
      </Container>
    </div>
  );
}

export default MyProfile;
