import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
// props 추가해서 온클릭 이벤트 컨트롤 필요, navigate 사용해서 온클릭 이벤트 컨트롤
// ex) 내 프로필 페이지에서는 클릭해도 유저정보 페이지로 이동하지 않음
// ex) 유저pk를 불러와서 이용자와 열람하려는 사용자의 정보가 같을경우 내 프로필 페이지로, 아니라면 유저상세정보 페이지로
const Container = styled.div`
  ${tw`w-full`}
`;
const Wrapper = tw.div`flex h-8 items-center p-2 justify-between hover:bg-primary-hover`;

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
function OfferUserInfo({ nickname, comment, profileImgUrl, userIdx }) {
  // const navigate = useNavigate();
  // const MoveToUserDetail = () => {
  //   if (location !== 'myprofile') {

  //   }
  // }
  return (
    <Container>
      <Wrapper className="border-b">
        <Link to={`${`/user/${userIdx}`}`}>
          <Wrapper>
            <Avatar img={profileImgUrl} />
            <Info>
              <section>
                <Nickname>{nickname}</Nickname>
                <Message>{comment}</Message>
              </section>
            </Info>
          </Wrapper>
        </Link>
      </Wrapper>
    </Container>
  );
}

export default OfferUserInfo;
