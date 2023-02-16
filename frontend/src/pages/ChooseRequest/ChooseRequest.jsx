import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// icons
import icon_exchange from 'assets/icons/exchange.svg';

// Component
import FormSubmitBtn from 'components/common/FormSubmitBtn';
import TopBar2 from 'components/common/TopBar2';
import ProductListItem from 'components/common/ProductListItem';

// twin.macro
import tw, { styled, css } from 'twin.macro';

// api
import { get_user_item } from 'api/apis/user';
import { choose_request } from 'api/apis/request';

// store
import { get_item } from 'api/apis/item';
import UserInfo2 from 'components/common/UserInfo2';
import { post_chatroom } from 'api/apis/chat';
import { post_notify } from 'api/apis/notify';

// Styled Component
const Wrapper = styled.div``;

const TextContainer = styled.div`
  ${tw`p-2`}
  h3 {
    ${tw`text-h3 text-primary`}
  }
  span {
    ${tw`text-tiny text-grey2`}
  }
`;

const ItemList = styled.div`
  ${tw`overflow-scroll overflow-x-hidden`}
  ${css`
    height: calc(100vh - 430px);
  `}
`;

const HeadingBar = tw.div`w-full h-[60px] p-2 text-h3 border-b bg-white text-primary`;

const SelectedItemContainer = styled.div`
  ${tw`flex m-2 h-[100px] items-center gap-2`}
  ${props => (props.cnt ? tw`` : tw`justify-center`)}
  span {
    ${tw`text-sub text-grey3`}
  }
`;

const BagguPreviewContainer = styled.div`
  ${tw`flex p-2 items-center gap-2`}
  ${props => (props.cnt ? tw`` : tw`justify-center`)}
  span {
    ${tw`text-sub text-grey3`}
  }
`;

const SelectedItem = styled.div`
  ${tw`rounded border`}
  ${tw`w-[100px] h-[100px] bg-cover bg-center`}
  ${props =>
    css`
      background-image: url(${props.item.itemImgUrl});
    `}
`;

const ImgWrapper = styled.div`
  ${tw`text-center`}
`;

const ItemImg = styled.div`
  ${tw`w-[100px] h-[100px] border-1 rounded-xl bg-center bg-cover shadow-md`}
  ${props =>
    css`
      background-image: url(${props.img});
    `}
`;

const UserContainer = styled.div`
  ${tw`border-b border-primary-hover last:border-none`}
`;

const RequestItemsWrapper = styled.div`
  ${tw`flex p-2 gap-2 relative`}
`;

const RequestItem = styled.div`
  ${tw`w-[100px] h-[100px] min-w-[100px] bg-cover bg-center rounded-lg border-1 border-primary-hover cursor-pointer`}
  ${props =>
    css`
      background-image: url(${props.img});
    `}
    ${props => (props.selected ? tw`border-2 border-secondary` : tw``)}
`;

const CheckBtn = styled.div`
  ${tw`absolute w-3 h-3 fill-secondary right-1 top-1`}
`;

// Main Component
function ChooseRequest() {
  // 바꾸 신청 대상 아이템 pk
  const { itemIdx } = useParams();

  // 작성자의 userIdx
  const userIdx = localStorage.getItem('userIdx');

  // 1. 이 게시글 정보
  const [item, setItem] = useState(null);
  // 2. 신청자 목록
  const [requestList, setRequestList] = useState([]);

  // 3. 바꾸 신청자가 선택한 아이템의 itemIdx
  const [selectedItem, setSelectedItem] = useState(null);

  // 4. 선택한 아이템의 작성자 닉네임
  const [selectedPerson, setSelectedPerson] = useState(null);

  // 5. 선택한 아이템의 작성자 아이디
  const [selectedPersonIdx, setSelectedPersonIdx] = useState(null);

  // 6. 선택한 아이템의 이미지
  const [selectedItemImg, setSelectedItemImg] = useState(null);

  useEffect(() => {
    get_item(itemIdx).then(data => {
      setItem(data);
      setRequestList(data.requestUserList);
    });
  }, [itemIdx]);

  // 제출 버튼 클릭시 작동하는 함수
  const navigate = useNavigate();
  const chooseRequestSubmitHandler = () => {
    if (selectedItem) {
      choose_request(selectedItem)
        .then(data => post_chatroom(data))
        .then(() => {
          post_notify({
            title: '새로운 채팅',
            content: `${selectedPerson}님과의 거래를 시작해보세요.`,
            type: 1,
            receiveUserIdx: userIdx,
          });
          post_notify({
            title: '새로운 채팅',
            content: `${item.nickname}님과의 거래를 시작해보세요.`,
            type: 1,
            receiveUserIdx: selectedPersonIdx,
          });
        })
        .then(() => navigate('/chat'));
    }
  };

  return (
    <div>
      <TopBar2 title="" />
      <TextContainer>
        <h3>교환하고 싶은 물건을 선택해주세요.</h3>
        <span>1개만 선택 가능합니다.</span>
      </TextContainer>
      {item ? (
        <>
          <BagguPreviewContainer>
            <ImgWrapper>
              <p>내 아이템</p>
              <ItemImg img={item ? item.itemImgUrls[0] : ''} />
            </ImgWrapper>
            <img src={icon_exchange} alt="" />
            <ImgWrapper>
              <p>상대 아이템</p>
              <ItemImg img={selectedItemImg ? selectedItemImg : ''} />
            </ImgWrapper>
          </BagguPreviewContainer>
          <HeadingBar>
            <h3>신청 목록</h3>
          </HeadingBar>
          <div>
            {requestList
              ? requestList.map((request, index) => (
                  <UserContainer key={index}>
                    <UserInfo2
                      addUserIdx={request.userIdx}
                      message={request.comment}
                    />
                    <RequestItemsWrapper id="RequestItemsWrapper">
                      {request.requestItemList.map((requestItem, index) => (
                        <div
                          className="relative"
                          key={index}
                          onClick={() => {
                            console.log(requestItem.tradeDetailIdx);
                            if (selectedItem === requestItem.tradeDetailIdx) {
                              setSelectedItem(null);
                              setSelectedPerson(null);
                              setSelectedPersonIdx(null);
                              setSelectedItemImg(null);
                            } else {
                              setSelectedItem(requestItem.tradeDetailIdx);
                              setSelectedPerson(request.nickname);
                              setSelectedPersonIdx(request.userIdx);
                              setSelectedItemImg(
                                requestItem.requestItemFirstImg
                              );
                            }
                          }}
                        >
                          <CheckBtn>
                            {selectedItem === requestItem.tradeDetailIdx ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                              </svg>
                            )}
                          </CheckBtn>
                          <RequestItem
                            id="requestItem"
                            key={requestItem.requestItemIdx}
                            img={requestItem.requestItemFirstImg}
                            selected={
                              selectedItem === requestItem.tradeDetailIdx
                                ? true
                                : false
                            }
                          />
                        </div>
                      ))}
                    </RequestItemsWrapper>
                  </UserContainer>
                ))
              : ''}
          </div>
          <FormSubmitBtn
            title="선택 완료"
            onClick={chooseRequestSubmitHandler}
            disabled={selectedItem ? false : true}
          />
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default ChooseRequest;
