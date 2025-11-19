import React from 'react'
 import { Routes,Route } from 'react-router-dom'
 import Home from './pages/Home.jsx'
 import Userlogin from './pages/userlogin.jsx'
  import UserSignup from './pages/UserSignup.jsx'
  import Captainlogin from './pages/Captainlogin.jsx'
  import CaptainSignup from './pages/CaptainSignup.jsx'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/userlogin' element={<Userlogin />}></Route>
        <Route path='/usersignup' element={<UserSignup />}></Route>
        <Route path='/captainlogin' element={<Captainlogin />}></Route>
        <Route path='/captainsignup' element={<CaptainSignup />}></Route>
      </Routes>
    </div>
  )
}

export default App ;