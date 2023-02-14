import React, { useState } from 'react';
import ItemButton from './ItemButton';
import { useLocation } from 'react-router-dom';

// icons
import heart_unliked from '../../assets/icons/heart_unliked.svg';
import heart_liked from '../../assets/icons/heart_liked.svg';

function ItemBottomBar({
  btnClickHandler,
  tradeState,
  isSameUser,
  selected,
  isAlreadyOffer,
  isFull,
  id,
  checkShow,
  apiState,
  setApiState,
}) {
  const [liked, setLiked] = useState(false);
  // 좋아요 API 요청
  const likeHandler = liked
    ? {
        onClick: e => {
          e.preventDefault();
          setLiked(true);
          //   좋아요 api
        },
      }
    : {
        onClick: e => {
          e.preventDefault();
          setLiked(false);
          //   취소 api
        },
      };

  // 온보딩 페이지에서 하단바 숨기기
  const location = useLocation().pathname;
  if (location.startsWith('/start') || location.startsWith('/chat')) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-between gap-2 fixed bottom-0 bg-white border-t w-full h-[98px] px-4 py-2">
      <div
        onClick={likeHandler.onClick}
        className={`${isSameUser ? 'hidden' : ''}`}
      >
        <img
          src={heart_unliked}
          alt="like button"
          className={`${liked ? 'hidden' : ''}`}
        />
        <img
          src={heart_liked}
          alt="like button"
          className={`${liked ? '' : 'hidden'}`}
        />
      </div>
      {/* 바꿀 물건 선택 누를시 활성화되는 버튼 */}
      <ItemButton
        // title={btnTitle ? btnTitle : '선택완료'}
        // className={`default ${isSameUser}`}
        btnClickHandler={btnClickHandler}
        isSameUser={isSameUser}
        selected={selected}
        isAlreadyOffer={isAlreadyOffer}
        isFull={isFull}
        itemIdx={id}
        checkShow={checkShow}
        tradeState={tradeState}
        apiState={apiState}
        setApiState={setApiState}
        // 거래 상태에 따라서 거래중이면 버튼 비활성화 거래완료도 비활성화
        // 거래중이 아니라면 바꿀 물건 선택
        // 바꿀 물건 선택 버튼 누를시 선택완료 비활성화, selectedIdx가 null이 아닐경우 활성화
        // 사용자와 작성자가 동일하다면 바꿀물건 선택 ,
        // 사용자와 작성자가 동일하지 않다면, 이미 거래신청한 사람일 경우 바꾸 취소버튼, 거래신청하지는 않았지만 isFull이라면 신청불가
        //사용자와 작성자가 동일하지 않으며 위의 조건에 속하지 않는다면 바꾸신청, 바꾸신청 페이지로 이동
        // 비활성화 조건: 거래상대 (거래중, 거래완료)
      />
    </div>
  );
}

export default ItemBottomBar;
