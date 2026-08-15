import React from 'react'
 import { Routes,Route } from 'react-router-dom'
 import Start from './pages/Start.jsx'
 import UserLogin from './pages/UserLogin.jsx'
  import UserSignup from './pages/UserSignup.jsx'
  import Captainlogin from './pages/Captainlogin.jsx'
  import CaptainSignup from './pages/CaptainSignup.jsx'
  import Home from './pages/Home.jsx'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='/userlogin' element={<UserLogin />}></Route>
        <Route path='/usersignup' element={<UserSignup />}></Route>
        <Route path='/captainlogin' element={<Captainlogin />}></Route>
        <Route path='/captainsignup' element={<CaptainSignup />}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </div>
  )
}

export default App ;