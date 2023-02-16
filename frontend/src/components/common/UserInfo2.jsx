import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import edit from 'assets/icons/edit.svg';
import tw, { styled, css } from 'twin.macro';
import { get_user } from 'api/apis/user';
// props 추가해서 온클릭 이벤트 컨트롤 필요, navigate 사용해서 온클릭 이벤트 컨트롤
// ex) 내 프로필 페이지에서는 클릭해도 유저정보 페이지로 이동하지 않음
// ex) 유저pk를 불러와서 이용자와 열람하려는 사용자의 정보가 같을경우 내 프로필 페이지로, 아니라면 유저상세정보 페이지로

const Wrapper = styled.div`
  ${tw`p-2 flex`}
`;

const InfoContainer = styled.div`
  ${tw`flex cursor-pointer`}
`;
const Avatar = styled.div`
  ${tw`bg-primary rounded-full w-6 h-6 bg-cover bg-center mr-2`}
  ${props =>
    props.img
      ? css`
          background-image: url(${props.img});
        `
      : tw`bg-primary`}
`;

const Info = styled.div`
  ${tw`relative flex mr-2 overflow-hidden box-content whitespace-nowrap text-ellipsis`}
  ${css``}

  & {
    section {
      ${tw`flex-col`}
    }
  }
`;
const Nickname = tw.p`text-main-bold `;
const Message = tw.span`text-sub bg-secondary py-[4px] px-1 rounded-full mt-1`;

// Main Component
function UserInfo2({ addUserIdx, message }) {
  const location = useLocation().pathname;
  const userIdx = localStorage.getItem('userIdx');

  // 유저 정보
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    get_user(addUserIdx).then(data => {
      setUserInfo(data);
      console.log(
        '유저 인포 안에서 유저 데이터(데이터 직접 안 내리고 아이디만 있을 때)',
        data
      );
    });
  }, [addUserIdx]);

  const navigate = useNavigate();

  const moveToUserDetail = () => {
    console.log('clicked');
    if (location !== '/myprofile' && userIdx !== userInfo.userIdx) {
      navigate(`/user/${userInfo.userIdx}`);
    }
  };
  return (
    <Wrapper>
      {userInfo ? (
        <>
          <InfoContainer onClick={moveToUserDetail}>
            <Avatar
              id="avatar"
              img={userInfo.profileImgUrl ? userInfo.profileImgUrl : null}
            />
            <Info id="info">
              <section className="flex flex-col">
                <Nickname>{userInfo.nickname}</Nickname>
                <Message>
                  {message ? message : '신청 메세지가 없습니다.'}
                </Message>
              </section>
            </Info>
          </InfoContainer>
          <div
            onClick={() => navigate('/myprofile/edit')}
            className={`${
              location === '/myprofile' ? '' : 'hidden'
            } cursor-pointer`}
          >
            <img src={edit} alt="profile_edit" />
          </div>
        </>
      ) : (
        ''
      )}
    </Wrapper>
  );
}

export default UserInfo2;
