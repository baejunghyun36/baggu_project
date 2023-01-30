import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar2 from '../../components/common/TopBar2';
import FormSubmitBtn from 'components/common/FormSubmitBtn';

function MyProfileEdit() {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('/myprofile');
  };
  return (
    <div>
      <TopBar2 pageTitle="프로필수정" />
      {/* 유저 프로필 이미지 컴포넌트 (클릭시 앨범에서 이미지 파일 선택받기) */}
      <form action="submit">
        <div>
          <label htmlFor="Username">닉네임</label>
          {/* placeholder에는 유저 본인 닉네임, 한줄소개를 기본으로 넣을지 아닐지 고민중 */}
          <input type="text" name="Username" placeholder="닉네임" />
        </div>
        <div>
          <label htmlFor="UserIntroduction">한줄소개</label>
          <input type="text" name="UserIntroduction" placeholder="한줄소개" />
        </div>
      </form>
      <FormSubmitBtn onClick={clickHandler} />
    </div>
  );
}

export default MyProfileEdit;
