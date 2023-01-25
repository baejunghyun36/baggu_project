import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
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
import MyProfileEdit from 'pages/MyProfile/MyProfileEdit';
import Baggu from 'pages/MyProfile/Baggu';
import Myreview from 'pages/MyProfile/Myreview';
import Favorite from 'pages/MyProfile/Favorite';
import ProfileTown from 'pages/MyProfile/ProfileTown';
function App() {
  return (
    <BrowserRouter className="App">
      <TopBar1 />
      <Routes>
        <Route path="/start" element={<Start />}>
          <Route path="" element={<StartLogin />} />
          <Route path="nickname" element={<StartNickname />} />
          <Route path="town" element={<StartTown />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/example" element={<Example />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/item/create" element={<ItemCreate />} />
        <Route path="/mybaggu" element={<MyBaggu />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/myprofile/edit" element={<MyProfileEdit />} />
        <Route path="/myprofile/:id/baggu" element={<Baggu />} />
        <Route path="/myprofile/:id/myreview" element={<Myreview />} />
        <Route path="/myprofile/:id/favorite" element={<Favorite />} />
        <Route path="/myprofile/:id/town" element={<ProfileTown />} />
      </Routes>
      <BottomBar />
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
