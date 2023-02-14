import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import TopBar2 from '../../components/common/TopBar2';
import UserInfo from 'components/common/UserInfo';
import tw, { styled, css } from 'twin.macro';
import { authInstance } from 'api/axios';
import requests from 'api/config';

// twin.macro
import { get_user, logout } from 'api/apis/user';
import Modal from 'components/common/Modal';
import { useQuery } from 'react-query';

// Styled Component
const Container = styled.div`
  ${tw`flex flex-col p-2 border-b`}
`;

const Wrapper = tw.div`flex p-2 border-b justify-between hover:bg-primary-hover`;

// Main Component
function MyProfile() {
  // 모달 상태
  const [showModal, setShowModal] = useState(false);

  // 유저 정보 props 받아오기
  const userIdx = localStorage.getItem('userIdx');
  const [user, setUser] = useState([]);

  const { data, isLoading } = useQuery(
    ['getUser', { userIdx: userIdx }],
    async () => await get_user(userIdx),
    { onSuccess: data => setUser(data) }
  );

  // 로그아웃 클릭시 실행
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logout(userIdx).then(() => {
      navigate('/login');
    });
  };

  return (
    <div>
      {showModal ? (
        <Modal
          onConfirm={logoutHandler}
          onCancel={() => setShowModal(false)}
          title="로그아웃"
          content="정말 로그아웃 하시겠어요?"
          cancelText="취소"
          confirmText="확인"
        />
      ) : (
        ''
      )}
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
      <Container onClick={() => setShowModal(true)}>
        <h4>로그아웃</h4>
      </Container>
    </div>
  );
}

export default MyProfile;
