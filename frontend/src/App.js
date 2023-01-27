import { Route, Routes, BrowserRouter } from 'react-router-dom';
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

// react-query
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// styled component
import tw, { styled, css } from 'twin.macro';
import ChatDetail from 'pages/Chat/ChatDetail';

const queryClient = new QueryClient();

const Wrapper = styled.div`
  ${tw`w-full`}
  ${css`
    height: calc(100% - 60px - 98px);
  `}
`;
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter className="App">
        <TopBar1 />
        <Routes>
          <Route path="/start" element={<Start />}>
            <Route path="" element={<StartLogin />} />
            <Route path="nickname" element={<StartNickname />} />
            <Route path="town" element={<StartTown />} />
            <Route path="category" element={<StartCategory />} />
            <Route path="ready" element={<StartReady />} />
            <Route path="introduce" element={<StartIntroduce />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/example" element={<Example />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/item/create" element={<ItemCreate />} />
          <Route path="/mybaggu" element={<MyBaggu />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:id" element={<ChatDetail />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/myprofile/edit" element={<MyProfileEdit />} />
          <Route path="/myprofile/:id/baggu" element={<Baggu />} />
          <Route path="/myprofile/:id/myreview" element={<Myreview />} />
          <Route path="/myprofile/:id/favorite" element={<Favorite />} />
          <Route path="/myprofile/:id/town" element={<ProfileTown />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
        <BottomBar />
        <BottomNav />
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
