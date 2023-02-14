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
import Favorite from 'pages/MyProfile/Favorite';
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

// react-cookie
import { CookiesProvider } from 'react-cookie';

// Store
import { notificationStore } from 'store/notication';

// API
import requests from 'api/config';

// react-query
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// styled component
import tw, { styled, css } from 'twin.macro';
import Search from 'pages/Search/Search';
import ItemEdit from 'pages/Item/ItemEdit';

const queryClient = new QueryClient();

// Main Component
function App() {
  const userIdx = window.localStorage.getItem('userIdx');
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // 알림서버 SSE 구독 상태
  const [listeningToNotify, setListeningToNotify] = useState(false);
  // 알림 리스트 전역 저장소
  const { addNotify } = notificationStore(state => state);

  useEffect(() => {
    let notifyEvent = undefined;

    // 1. 알림 SSE 연결
    if (isLoggedIn && !listeningToNotify) {
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
        console.log('closed : notify');
        notifyEvent.close();
      };

      setListeningToNotify(true);
    }

    return () => {
      notifyEvent.close();
      setListeningToNotify(false);
      // console.log('useEffect ended & notify closed');
    };
  }, []);

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <BrowserRouter className="App">
          <TopBar1 />
          <Routes>
            <Route path="/login" element={<Start />}>
              <Route path="" element={<StartLogin />} />
              <Route path="nickname" element={<StartNickname />} />
              <Route path="town" element={<StartTown />} />
              <Route path="category" element={<StartCategory />} />
              <Route path="ready" element={<StartReady />} />
              <Route path="introduce" element={<StartIntroduce />} />
            </Route>
            <Route path="/kakaoLogin" element={<KakaoLogin />} />
            <Route
              path="/"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
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
                isLoggedIn ? <BagguReview /> : <Navigate to="/login" replace />
              }
            />
            {/* 게시글 */}
            <Route
              path="/item/:id"
              element={isLoggedIn ? <Item /> : <Navigate to="/login" replace />}
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
              element={isLoggedIn ? <Chat /> : <Navigate to="/login" replace />}
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
                isLoggedIn ? <MyProfile /> : <Navigate to="/login" replace />
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
              path="/myprofile/:id/favorite"
              element={
                isLoggedIn ? <Favorite /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/myprofile/:id/town"
              element={
                isLoggedIn ? <ProfileTown /> : <Navigate to="/login" replace />
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
                isLoggedIn ? <MakeRequest /> : <Navigate to="/login" replace />
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
            {/* 알림 */}
            <Route
              path="/notification"
              element={
                isLoggedIn ? <Notification /> : <Navigate to="/login" replace />
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
        </BrowserRouter>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
