import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Hooks
import FormatDate from 'hooks/FormatDate';
import GetRelativeTime from 'hooks/GetRelativeTime';

// twin.macro
import tw, { styled, css } from 'twin.macro';
import Chip from './Chip';

// Styled Component
const ItemContainer = styled.div`
  ${props => (props.selected ? tw`bg-primary-hover` : '')}
  ${tw`p-2 flex w-full hover:bg-primary-hover border-b gap-2 relative`}
`;
const ItemImg = styled.div`
  ${props =>
    css`
      background-image: url(${props.item.itemImgUrl});
    `}
  ${tw`w-[100px] h-[100px] rounded border bg-cover bg-center`}
`;
const ItemInfo = styled.div`
  p {
    ${tw`text-main-bold text-black`}
  }
  span {
    ${tw`text-sub text-grey2`}
  }
`;

const SubInfo = tw.div`absolute right-2`;

// Main Container
function ProductListItem({ item, onClick, selected }) {
  /*
  < props >
  1. item : item 데이터
  2. onClick : ProductListItem이 클릭될 때 실행될 함수
    - 클릭시 디테일 페이지로 넘어가야하는 경우, onClick을 전달할 필요없다.
    - 클릭시 디테일 페이지로 넘어가는 것이 아니라, 다른 동작이 필요할 때 onClick을 전달한다.
  3. checkShow : check 버튼이 보이게 한다면 true, 보이지 않는다면 false
  4. selected : 해당 아이템이 부모 컴포넌트에서 선택된 상태라면 true, 선택되지 않은 상태라면 false
  */

  // 아이템 디테일 페이지로 이동하는 함수
  const navigate = useNavigate();
  const moveToDetail = () => {
    navigate(`/item/${item.itemIdx}`);
  };

  // raw 날짜 데이터 포맷
  const { year, month, day, hour, minute } = FormatDate(item.createdAt);

  // 상대적인 날짜 계산
  const date = GetRelativeTime(year, month, day);

  return (
    <ItemContainer
      onClick={onClick ? onClick : moveToDetail}
      selected={selected}
    >
      <ItemImg item={item}></ItemImg>
      <ItemInfo>
        <p>{item.title}</p>
        <span>
          {item.dong}
          {GetRelativeTime(year, month, day, hour, minute)}
        </span>
      </ItemInfo>
      <SubInfo>
        <Chip tradeState={item.state} />
        {selected ? (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 2.66675C8.63996 2.66675 2.66663 8.64008 2.66663 16.0001C2.66663 23.3601 8.63996 29.3334 16 29.3334C23.36 29.3334 29.3333 23.3601 29.3333 16.0001C29.3333 8.64008 23.36 2.66675 16 2.66675ZM21.1733 11.0534L13.3333 18.8934L10.8266 16.3867C10.3066 15.8667 9.46663 15.8667 8.94663 16.3867C8.42663 16.9067 8.42663 17.7467 8.94663 18.2667L12.4 21.7201C12.92 22.2401 13.76 22.2401 14.28 21.7201L23.0666 12.9334C23.5866 12.4134 23.5866 11.5734 23.0666 11.0534C22.5466 10.5334 21.6933 10.5334 21.1733 11.0534Z"
              fill="#5199FF"
            />
            <path
              d="M21.1733 11.0533L13.3333 18.8933L10.8266 16.3867C10.3066 15.8667 9.46664 15.8667 8.94664 16.3867C8.42664 16.9067 8.42664 17.7467 8.94664 18.2667L12.4 21.72C12.92 22.24 13.76 22.24 14.28 21.72L23.0666 12.9333C23.5866 12.4133 23.5866 11.5733 23.0666 11.0533C22.5466 10.5333 21.6933 10.5333 21.1733 11.0533Z"
              fill="#F7F8F9"
            />
          </svg>
        ) : (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 2.66675C8.63996 2.66675 2.66663 8.64008 2.66663 16.0001C2.66663 23.3601 8.63996 29.3334 16 29.3334C23.36 29.3334 29.3333 23.3601 29.3333 16.0001C29.3333 8.64008 23.36 2.66675 16 2.66675ZM16 26.6667C10.12 26.6667 5.33329 21.8801 5.33329 16.0001C5.33329 10.1201 10.12 5.33341 16 5.33341C21.88 5.33341 26.6666 10.1201 26.6666 16.0001C26.6666 21.8801 21.88 26.6667 16 26.6667ZM21.1733 11.0534L13.3333 18.8934L10.8266 16.3867C10.3066 15.8667 9.46663 15.8667 8.94663 16.3867C8.42663 16.9067 8.42663 17.7467 8.94663 18.2667L12.4 21.7201C12.92 22.2401 13.76 22.2401 14.28 21.7201L23.0666 12.9334C23.5866 12.4134 23.5866 11.5734 23.0666 11.0534C22.5466 10.5334 21.6933 10.5334 21.1733 11.0534Z"
              fill="#808080"
            />
          </svg>
        )}
      </SubInfo>
    </ItemContainer>
  );
}

export default ProductListItem;
