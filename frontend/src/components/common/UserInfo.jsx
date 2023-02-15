import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import edit from 'assets/icons/edit.svg';
import tw, { styled, css } from 'twin.macro';
// props 추가해서 온클릭 이벤트 컨트롤 필요, navigate 사용해서 온클릭 이벤트 컨트롤
// ex) 내 프로필 페이지에서는 클릭해도 유저정보 페이지로 이동하지 않음
// ex) 유저pk를 불러와서 이용자와 열람하려는 사용자의 정보가 같을경우 내 프로필 페이지로, 아니라면 유저상세정보 페이지로

const Wrapper = styled.div`
  ${tw`p-2 flex hover:bg-primary-hover`}
`;

const InfoContainer = styled.div`
  ${tw`flex cursor-pointer`}
`;
const Avatar = styled.div`
  ${tw`bg-primary rounded-full w-6 h-6 bg-cover bg-center mr-2`}
  ${props => css`
    background-image: url(${props.img});
  `}
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
const Message = tw.span`text-sub`;
function UserInfo({ user }) {
  const location = useLocation().pathname;
  const userIdx = localStorage.getItem('userIdx');

  const navigate = useNavigate();

  const moveToUserDetail = () => {
    console.log('clicked');
    if (location !== '/myprofile' && userIdx !== user.userIdx) {
      navigate(`/user/${user.userIdx}`);
    }
  };
  return (
    <Wrapper>
      <InfoContainer onClick={moveToUserDetail}>
        <Avatar id="avatar" img={user.profileImgUrl} />
        <Info id="info">
          <section>
            <Nickname>{user.nickname}</Nickname>
            <Message>{user.info}</Message>
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
    </Wrapper>
  );
}

export default UserInfo;
