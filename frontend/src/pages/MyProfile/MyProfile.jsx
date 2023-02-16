import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCookie } from 'utils/cookie';
import { useQuery } from 'react-query';
import { get_user, logout } from 'api/apis/user';
import tw, { styled, css } from 'twin.macro';
import Modal from 'components/common/Modal';
import UserInfo from 'components/common/UserInfo';
import TopBar2 from 'components/common/TopBar2';

// Styled Component
const Container = styled.div`
  ${tw`flex flex-col p-2 border-b`}
`;

// Main Component
function MyProfile({ onLogin }) {
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
      deleteCookie('userIdx');
      deleteCookie('token');
      deleteCookie('refresh-token');
      deleteCookie('isLoggedIn');
      onLogin(false);
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
      <Container className="font-bold">
        <h4>기타</h4>
      </Container>
      <Link to={`/myprofile/${user.userIdx}/town`}>
        <Container>
          <h4>내 동네설정</h4>
        </Container>
      </Link>
      <Container onClick={() => setShowModal(true)} className="cursor-pointer">
        <h4>로그아웃</h4>
      </Container>
    </div>
  );
}

export default MyProfile;
