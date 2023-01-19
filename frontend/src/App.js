import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Start from 'pages/Start/Start';
import Example from 'pages/Example/Example';
import TopBar1 from 'components/common/TopBar1';
import BottomNav from 'components/common/BottomNav';
import BottomBar from 'components/common/BottomBar';
import Item from 'pages/Item/Item';
function App() {
  return (
    <BrowserRouter className="App">
      <TopBar1 />
      <Routes>
        <Route path="/start" element={<Start />}>
          <Route path="" element={<StartLogin />} />
          <Route path="nickname" element={<StartNickname />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/example" element={<Example />} />
        <Route path="/item/:id" element={<Item />} />
      </Routes>
      <BottomBar />
      <BottomNav />
    </BrowserRouter>

    // <BrowserRouter id="app" className="App">
    //     <Routes>

    //       <Route path="/" element={<Home />} />
    //       <Route path="/example" element={<Example />} />
    //     </Routes>
    //   </BrowserRouter>
  );
}

export default App;
