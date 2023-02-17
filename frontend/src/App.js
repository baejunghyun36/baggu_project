import { useState, useEffect } from 'react';
import {
  Route,
  Routes,
  BrowserRouter,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import Home from 'pages/Home/Home';
import Start from 'pages/Start/Start';
import StartLogin from 'pages/Start/StartLogin';
import StartNickname from 'pages/Start/StartNickname';
import StartTown from 'pages/Start/StartTown';
import Example from 'pages/Example/Example';
import TopBar1 from 'components/common/TopBar1';
import BottomNav from 'components/common/BottomNav';
import BottomBar from 'components/common/BottomBar';
import Item from 'pages/Item/Item';
import ItemCreate from 'pages/Item/ItemCreate';
import MyBaggu from 'pages/MyBaggu/MyBaggu';
import MyProfile from 'pages/MyProfile/MyProfile';
import StartCategory from 'pages/Start/StartCategory';
import StartReady from 'pages/Start/StartReady';
import StartIntroduce from 'pages/Start/StartIntroduce';
import MyProfileEdit from 'pages/MyProfile/MyProfileEdit';
import Baggu from 'pages/MyProfile/Baggu';
import Myreview from 'pages/MyProfile/Myreview';
import ProfileTown from 'pages/MyProfile/ProfileTown';
import Chat from 'pages/Chat/Chat';
import UserDetail from 'pages/User/UserDetail';
import ChatDetail from 'pages/Chat/ChatDetail';
import UserReview from 'pages/Review/UserReview';
import BagguReview from 'pages/Review/BagguReview';
import KakaoLogin from 'pages/Start/KakaoLogin';
import MakeRequest from 'pages/MakeRequest/MakeRequest';
import MakeRequestMessage from 'pages/MakeRequest/MakeRequestMessage';
import Notification from 'pages/Notification/Notification';
import Item2 from 'pages/Item/Item2';
import Search from 'pages/Search/Search';
import ItemEdit from 'pages/Item/ItemEdit';

// react-cookie
import { CookiesProvider } from 'react-cookie';

// Store
import { notificationStore } from 'store/notication';

// API
import requests from 'api/config';
import { get_chatrooms, get_updated_chatroom } from 'api/apis/chat';

// react-query
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// styled component
import tw, { styled, css } from 'twin.macro';
import ChooseRequest from 'pages/ChooseRequest/ChooseRequest';
import DeleteRequest from 'pages/ChooseRequest/ChooseRequest';
import { chatStore } from 'store/chat';

const queryClient = new QueryClient();

// Main Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn')
  );
  const userIdx = window.localStorage.getItem('userIdx');
  // const isLoggedIn = localStorage.getItem('isLoggedIn');

  // 알림서버 SSE 구독 상태
  const [listeningToNotify, setListeningToNotify] = useState(false);
  // 알림 리스트 전역 저장소
  const { addNotify } = notificationStore(state => state);

  /// 채팅방리스트 SSE 구독 상태
  const [isListeningToRoom, setIsListeningToRoom] = useState(false);
  // 채팅방 변경사항 SSE 구독 상태
  const [isListeningToRoomUpdate, setIsListeningToRoomUpdate] = useState(false);
  // 채팅방리스트 전역 저장소
  const {
    chatRoomList,
    totalUnreadMsg,
    addChatRoom,
    clearChatRoom,
    updateChatRoom,
  } = chatStore(state => state);

  // 채팅
  useEffect(() => {
    // 채팅방리스트 SSE
    let chatRoomEvent = undefined;

    // 채팅방리스트 SSE 연결
    if (isLoggedIn && !isListeningToRoom) {
      chatRoomEvent = new EventSource(
        `${requests.chat_base_url + requests.GET_CHATROOMS(userIdx)}`
      );

      // 최초 연결
      chatRoomEvent.onopen = event => {
        console.log('open : chatroom', event);
      };

      // 채팅방에 대한 새로운 변경사항 도착
      chatRoomEvent.onmessage = event => {
        const parsedData = JSON.parse(event.data);
        console.log('new chatroom sse', parsedData);
        addChatRoom(parsedData);
      };

      chatRoomEvent.onerror = event => {
        console.log('error : chatRoomEvent');
        chatRoomEvent.close();
      };

      setIsListeningToRoom(true);
    }

    // clean up function!
    return;
  }, [isLoggedIn, isListeningToRoom]);

  // 채팅방 변경사항 SSE
  useEffect(() => {
    let chatRoomUpdateEvent = undefined;

    // 채팅방 변경사항 SSE 연결
    if (isLoggedIn && !isListeningToRoomUpdate) {
      chatRoomUpdateEvent = new EventSource(
        `${requests.chat_base_url + requests.GET_CHATROOMS_UPDATE(userIdx)}`
      );

      // 최초 연결
      chatRoomUpdateEvent.onopen = event => {
        console.log('open : 채팅방 변경사항');
      };

      // 변경사항 수신
      chatRoomUpdateEvent.onmessage = async event => {
        // 변경사항이 발생한 채팅방의 roomId
        const roomId = JSON.parse(event.data).roomId;
        /*
        {
          "chatId":"63da0f656408703b4fae5d21",
          "msg":"뭐함?",
          "receiverIdx":5,
          "senderIdx":6,
          "roomId":"63da08172a56c42cc9b85a61",
          "createdAt":"2023-02-01T16:06:13.261"
        }
         */
        // GET 요청으로 받은 데이터로 해당 채팅방 정보를 갈아끼움
        await get_updated_chatroom(roomId).then(data => {
          console.log('get updated chatroom :', data);
          updateChatRoom(roomId, data);
        });
      };

      chatRoomUpdateEvent.onerror = event => {
        console.log('error : 채팅방 변경사항');
        chatRoomUpdateEvent.close();
      };

      setIsListeningToRoomUpdate(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // 알림 SSE
    let notifyEvent = undefined;

    // 1. 알림 SSE 연결
    if (isLoggedIn !== null && !listeningToNotify) {
      notifyEvent = new EventSource(
        `${requests.notify_base_url + requests.GET_NOTIFY(userIdx)}`
      );

      // 최초 연결 확인
      notifyEvent.onopen = event => {
        console.log('open : notify', event);
      };

      // 새로운 알림 도착
      notifyEvent.onmessage = event => {
        const parsedData = JSON.parse(event.data);
        // console.log('new received data', event);
        console.log('new received notify', parsedData);
        addNotify(parsedData);
      };

      // 에러 발생
      notifyEvent.onerror = event => {
        console.log('error : notify');
        notifyEvent.close();
      };

      setListeningToNotify(true);
      return;
      //  () => {
      //   notifyEvent.close();
      //   setListeningToNotify(false);
      //   // console.log('useEffect ended & notify closed');
      // };
    }

    return;
  }, [isLoggedIn]);

  // 하위 컴포넌트 KakaoLogin에서 로그인시 App.js로 데이터를 올려받는다.
  const handleLogin = isLoggedIn => {
    console.log('자식에서 부모로 로그인 올려받음');
    setIsLoggedIn(isLoggedIn);
  };

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <BrowserRouter className="App">
          <div className="w-[300px]">
            <TopBar1 />
            <Routes>
              <Route
                path="/login"
                element={!isLoggedIn ? <Start /> : <Navigate to="/" replace />}
              >
                <Route path="" element={<StartLogin />} />
                <Route path="nickname" element={<StartNickname />} />
                <Route path="town" element={<StartTown />} />
                <Route
                  path="category"
                  element={<StartCategory onLogin={handleLogin} />}
                />
                <Route path="ready" element={<StartReady />} />
                <Route path="introduce" element={<StartIntroduce />} />
              </Route>
              <Route
                path="/kakaoLogin"
                element={<KakaoLogin onLogin={handleLogin} />}
              />
              <Route
                path="/"
                element={
                  isLoggedIn ? <Home /> : <Navigate to="/login" replace />
                }
              />
              {/* 후기 */}
              <Route
                path="/userReview"
                element={
                  isLoggedIn ? <UserReview /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/bagguReview"
                element={
                  isLoggedIn ? (
                    <BagguReview />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              {/* 게시글 */}
              <Route
                path="/item/:id"
                element={
                  isLoggedIn ? <Item2 /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/item/:id/edit"
                element={
                  isLoggedIn ? <ItemEdit /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/item/create"
                element={
                  isLoggedIn ? <ItemCreate /> : <Navigate to="/login" replace />
                }
              />
              {/* 내 바꾸관리 */}
              <Route
                path="/mybaggu"
                element={
                  isLoggedIn ? <MyBaggu /> : <Navigate to="/login" replace />
                }
              />
              {/* 채팅 */}
              <Route
                path="/chat"
                element={
                  isLoggedIn ? <Chat /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/chat/:roomId"
                element={
                  isLoggedIn ? <ChatDetail /> : <Navigate to="/login" replace />
                }
              />
              {/* 내 프로필 */}
              <Route
                path="/myprofile"
                element={
                  isLoggedIn ? (
                    <MyProfile onLogin={handleLogin} />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/myprofile/edit"
                element={
                  isLoggedIn ? (
                    <MyProfileEdit />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/myprofile/:id/baggu"
                element={
                  isLoggedIn ? <Baggu /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/myprofile/:id/myreview"
                element={
                  isLoggedIn ? <Myreview /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/myprofile/:id/town"
                element={
                  isLoggedIn ? (
                    <ProfileTown />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/user/:id"
                element={
                  isLoggedIn ? <UserDetail /> : <Navigate to="/login" replace />
                }
              />
              {/* 바꾸신청 */}
              <Route
                path="/makeRequest/:itemIdx"
                element={
                  isLoggedIn ? (
                    <MakeRequest />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/makeRequest/message/:itemIdx"
                element={
                  isLoggedIn ? (
                    <MakeRequestMessage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              {/* 교환할 물건 선택 및 삭제 */}
              <Route
                path="/chooseRequest/:itemIdx"
                element={
                  isLoggedIn ? (
                    <ChooseRequest />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/deleteRequest/:itemIdx"
                element={
                  isLoggedIn ? (
                    <DeleteRequest />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              {/* 알림 */}
              <Route
                path="/notification"
                element={
                  isLoggedIn ? (
                    <Notification />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              {/* 검색 */}
              <Route
                path="/search"
                element={
                  isLoggedIn ? <Search /> : <Navigate to="/login" replace />
                }
              />
            </Routes>
            <BottomNav />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
