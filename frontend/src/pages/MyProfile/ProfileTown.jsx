import React from 'react';
import TopBar2 from 'components/common/TopBar2';
import { useParams } from 'react-router-dom';

function ProfileTown() {
  const { id } = useParams();
  return (
    <div>
      <TopBar2 pageTitle="내 동네 설정" />
    </div>
  );
}

export default ProfileTown;
