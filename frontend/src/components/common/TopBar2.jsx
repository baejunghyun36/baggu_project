import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

// icon
import arrow_back from '../../assets/icons/arrow_back.svg';
import check from '../../assets/icons/check.svg';

const Container = styled.div`
  ${tw`flex justify-between items-center p-2 border-b border-grey1 h-[60px] w-full`}
  & {
    img:last-child {
      ${props => (props.isCheck ? '' : tw`opacity-0`)}
    }
  }
`;

// useCheckBtn (boolean) : 체크 버튼 사용 가능 여부
// BackStep (integar) : 뒤로가기 스텝 수
function TopBar2({
  title,
  useCheckBtn,
  onClickTitle,
  BackStep = 1,
  BackHandler,
}) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1 * BackStep);
  };
  // 회원가입 완료 후 숨기기
  const location = useLocation().pathname;
  if (location.startsWith('/start/ready')) {
    return null;
  }
  const clickHandler = props => {
    if (props.isCheck) {
      console.log('clicked');
    }
  };
  return (
    <Container id="top-bar-2">
      <img
        src={arrow_back}
        alt="button to go back"
        onClick={BackHandler ? BackHandler : handleGoBack}
      />
      <h3 className="text-h3" onClick={onClickTitle}>
        {title}
      </h3>

      <img
        disabled={!useCheckBtn}
        src={check}
        alt="button to confirm"
        className="opacity-1"
        onClick={clickHandler}
      />
    </Container>
  );
}

export default TopBar2;
