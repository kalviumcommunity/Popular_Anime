import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home'
import About from './components/aboutpage'
import Apipage from './components/apipage'
import Mainpage from './components/mainpage'
import Main1 from './components/main1'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/apipage' element={<Apipage/>}></Route>
        <Route path='/mainpage1' element={<Mainpage/>}></Route>
        <Route path='/mainpage' element={<Main1/>}></Route>
      </Routes>
    </>
  );
}

export default App;