import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// store
import signUpstore from 'store/store';

// components
import TopBar2 from 'components/common/TopBar2';
import FormSubmitBtn from 'components/common/FormSubmitBtn';
import axios from 'axios';

// styled component
const Wrapper = styled.div`
  ${tw`w-full h-full border-0 flex flex-col text-[26px]`}
`;

const TextContainer = styled.div`
  ${tw`flex-col p-4 pb-2`}

  & {
    span {
      ${tw`font-extrabold text-primary`}
    }
  }
`;

const InputContainer = styled.div`
  ${tw`flex-col pt-2 pb-2 px-4`}

  & {
    input {
      ${tw`w-full rounded-lg mb-1`}
      ${props =>
        props.isValid
          ? tw`focus:outline focus:outline-primary`
          : tw`focus:outline focus:outline-negative`}
    }
    p {
      ${tw`text-negative text-tiny`}
    }
  }
`;

const BtnContainer = styled.div`
  ${tw`flex pt-2 pb-2 px-4 fixed bottom-0 w-full h-[98px]`}
`;

const Btn = styled.div`
  ${props => (props.myTown.dong ? tw`bg-white` : tw`bg-success`)}
  ${tw`flex justify-center items-center rounded-full w-full h-5 border border-grey2 mb-1`}

  & {
    span {
      ${tw`text-main`}
    }
  }
`;

// Main Component
function StartTown() {
  const [myTown, setMyTown] = useState({
    si: '',
    gu: '',
    dong: '',
    lat: '',
    lng: '',
  });

  // store
  const saveTown = signUpstore(state => state.saveTown);

  const navigate = useNavigate();

  // geolocation 비동기 처리
  const getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  // 현재 위치로 설정 버튼 클릭시
  const onBtnClickHandler = () => {
    getPosition()
      .then(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setMyTown(prev => {
          return { ...prev, lat: lat, lng: lng };
        });
        return { lat, lng };
      })
      .then(({ lat, lng }) => {
        axios
          .get(
            `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
            {
              headers: {
                Authorization: `KakaoAK b01c9aa331fd09ef0f8a15face2eb93e`,
              },
            }
          )
          .then(res => {
            const data = res.data.documents[0].address;
            // 시
            const si = data.region_1depth_name;
            // 구
            const gu = data.region_2depth_name;
            // 동
            const dong = data.region_3depth_name;
            setMyTown(prev => {
              return { ...prev, si: si, gu: gu, dong: dong };
            });
            return { si, gu, dong };
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const submitHandler = () => {
    // {myTown : myTown}으로 중앙저장소에 저장
    const { si, gu, dong, lng, lat } = myTown;
    saveTown(si, gu, dong, lng, lat);
    navigate('/start/category');
  };

  return (
    <Wrapper>
      <TopBar2 pageTitle="" />
      <TextContainer>
        <p>
          <span>'닉네임'</span>님의
          <br /> 동네를 설정해주세요.
        </p>
      </TextContainer>
      <InputContainer>
        <Btn onClick={onBtnClickHandler} myTown={myTown}>
          <svg
            className={`${myTown.dong ? 'hidden' : 'mr-1'}`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM20.94 11C20.48 6.83 17.17 3.52 13 3.06V2C13 1.45 12.55 1 12 1C11.45 1 11 1.45 11 2V3.06C6.83 3.52 3.52 6.83 3.06 11H2C1.45 11 1 11.45 1 12C1 12.55 1.45 13 2 13H3.06C3.52 17.17 6.83 20.48 11 20.94V22C11 22.55 11.45 23 12 23C12.55 23 13 22.55 13 22V20.94C17.17 20.48 20.48 17.17 20.94 13H22C22.55 13 23 12.55 23 12C23 11.45 22.55 11 22 11H20.94ZM12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19Z"
              fill="none"
              className={`${myTown.dong ? '' : 'fill-black'}`}
            />
          </svg>

          <span>{myTown.dong ? myTown.dong : '현재 위치로 설정하기'}</span>
        </Btn>
      </InputContainer>

      <FormSubmitBtn
        disabled={myTown.dong ? false : true}
        onClick={submitHandler}
      />
    </Wrapper>
  );
}

export default StartTown;
