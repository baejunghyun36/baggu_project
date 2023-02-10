import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import edit from 'assets/icons/edit.svg';
import tw, { styled, css } from 'twin.macro';
// props 추가해서 온클릭 이벤트 컨트롤 필요, navigate 사용해서 온클릭 이벤트 컨트롤
// ex) 내 프로필 페이지에서는 클릭해도 유저정보 페이지로 이동하지 않음
// ex) 유저pk를 불러와서 이용자와 열람하려는 사용자의 정보가 같을경우 내 프로필 페이지로, 아니라면 유저상세정보 페이지로
const Container = styled.div`
  ${tw`w-full`}
`;
const Wrapper = tw.div`flex items-center p-2 justify-between hover:bg-primary-hover`;

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

  // const navigate = useNavigate();
  // const MoveToUserDetail = () => {
  //   if (location !== 'myprofile') {

  //   }
  // }
  return (
    <Container>
      <Wrapper className="border-b">
        <Link to={`${location !== '/myprofile' ? '/user/:id' : ''}`}>
          <Wrapper>
            <Avatar img={user.profileImgUrl} />
            <Info>
              <section>
                <Nickname>{user.nickname}</Nickname>
                <Message>{user.info}</Message>
              </section>
            </Info>
          </Wrapper>
        </Link>
        <Link
          to="/myprofile/edit"
          className={`${location === '/myprofile' ? '' : 'hidden'}`}
        >
          <img src={edit} alt="profile_edit" />
        </Link>
      </Wrapper>
    </Container>
  );
}

export default UserInfo;
