import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home'
import About from './components/aboutpage'
import Apipage from './components/apipage'
import Mainpage from './components/mainpage'
import Mainpage1 from './components/mainpage1'
import Update from './components/update';
import Edit from './components/edit';
import Loginpage from './components/loginpage';
import Signup from './components/signup';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/apipage' element={<Apipage/>}></Route>
        <Route path='/mainpage1' element={<Mainpage/>}></Route>
        <Route path='/mainpage' element={<Mainpage1/>}></Route>
        <Route path='/updateani' element={<Update/>}></Route>
        <Route path='/editani/:id' element={<Edit/>}></Route>
        <Route path='/loginpage' element={<Loginpage/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </>
  )
}

export default App;