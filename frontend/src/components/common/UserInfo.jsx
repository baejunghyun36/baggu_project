import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import check from 'assets/icons/check.svg';
// props 추가해서 온클릭 이벤트 컨트롤 필요, navigate 사용해서 온클릭 이벤트 컨트롤
// ex) 내 프로필 페이지에서는 클릭해도 유저정보 페이지로 이동하지 않음
// ex) 유저pk를 불러와서 이용자와 열람하려는 사용자의 정보가 같을경우 내 프로필 페이지로, 아니라면 유저상세정보 페이지로
function UserInfo({ user }) {
  const location = useLocation().pathname;
  return (
    <div className="flex justify-between items-center p-2 h-[60px] w-full ">
      <img
        src="assets/images/kakao_sync_login/avatar_1x.png"
        alt="User_profileimage"
      />
      <div>
        <h4>{user}</h4>
        <h4>한줄소개</h4>
      </div>
      <Link
        to="/myprofile/edit"
        className={`${location === '/myprofile' ? '' : 'hidden'}`}
      >
        <img src={check} alt="profile_edit" />
      </Link>
    </div>
  );
}

export default UserInfo;
