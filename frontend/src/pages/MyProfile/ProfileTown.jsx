import React, { useEffect, useState } from 'react';
import TopBar2 from 'components/common/TopBar2';
import { useParams } from 'react-router-dom';

// twin.macro
import tw, { styled, css } from 'twin.macro';

import axios from 'axios';
import { useMutation } from 'react-query';
import { get_user_item, put_user_dong } from 'api/apis/user';

// Styled Component
const Container = tw.div`w-full h-[60px] p-2 text-main-bold border-b bg-white`;

const BtnContainer = tw.div`flex flex-col justify-center items-center gap-1 p-4 border-b`;

const Btn = styled.div`
  ${tw`rounded-full border-1 border-black flex justify-center items-center w-60 p-1 last:bg-success`}
  svg {
    ${tw`fill-black mr-1`}
  }
`;

function ProfileTown() {
  const { id } = useParams();
  const [position, setPosition] = useState({ lat: '', lng: '' });
  const [dong, setDong] = useState(localStorage.getItem('dong'));

  // mutation
  const userIdx = localStorage.getItem('userIdx');
  const { data, isLoading, mutate, isSuccess } = useMutation(put_user_dong, {
    onSuccess: () => {},
  });

  // geolocation 비동기 처리
  const getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  // 현재 위치로 설정 버튼 클릭시
  const onBtnClickHandler = async () => {
    getPosition()
      .then(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setPosition({ lat: lat, lng: lat });
        console.log(lat, lng);
        return { lat, lng };
      })
      .then(async ({ lat, lng }) => {
        const res = await axios.get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
          {
            headers: {
              Authorization: `KakaoAK b01c9aa331fd09ef0f8a15face2eb93e`,
            },
          }
        );
        const si = res.data.documents[0].address.region_1depth_name;
        const gu = res.data.documents[0].address.region_2depth_name;
        const dong = res.data.documents[0].address.region_3depth_name;
        const data = {
          si: si,
          gu: gu,
          dong: dong,
          lat: lat,
          lng: lng,
        };
        setDong(dong);
        return data;
      })
      .then(data => {
        // console.log('here', data);
        mutate({ userIdx: userIdx, data: data });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  // useEffect(() => {
  //   get_user_item(userIdx).then(res => console.log(res));
  // });

  return (
    <div>
      <TopBar2 title="내 동네 설정" />
      <Container>
        <span>동네 설정</span>
      </Container>
      <BtnContainer>
        <Btn>
          <span>{dong}</span>
        </Btn>
        <Btn onClick={onBtnClickHandler}>
          <svg
            className="fill-black"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM20.94 11C20.48 6.83 17.17 3.52 13 3.06V2C13 1.45 12.55 1 12 1C11.45 1 11 1.45 11 2V3.06C6.83 3.52 3.52 6.83 3.06 11H2C1.45 11 1 11.45 1 12C1 12.55 1.45 13 2 13H3.06C3.52 17.17 6.83 20.48 11 20.94V22C11 22.55 11.45 23 12 23C12.55 23 13 22.55 13 22V20.94C17.17 20.48 20.48 17.17 20.94 13H22C22.55 13 23 12.55 23 12C23 11.45 22.55 11 22 11H20.94ZM12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19Z" />
          </svg>
          <span>현재 위치로 동네 설정</span>
        </Btn>
      </BtnContainer>
      {/* <Container>
        <span>동네 범위 설정</span>
      </Container> */}
    </div>
  );
}

export default ProfileTown;
