 import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {UserDataContext} from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Userlogin = () => {
  const[email,setEmail]=React.useState('');
  const [password,setPassword]=React.useState('');
  const[userData,setUserData]=React.useState({});


  const {user,setUser}=React.useContext(UserDataContext);
  const navigate=useNavigate();
  const submitHandler=async (e)=>{

    e.preventDefault();
    
    const userData={
      email:email,
      password:password
    }

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData);
    if(response.status===200){
      const data=response.data;
      setUser(data.user);
      navigate('/Home');
    }
   setEmail('');
   setPassword('');
    
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
     <div>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
          required 
          className='bg-gray-200 rounded px-4 py-2 border-gray-200 w-full text-lg placeholder:text-sm mb-7' 
          type="email" 
          placeholder="email@example.com"
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
        />
        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input 
          required 
          className='bg-gray-200 rounded px-4 py-2 border-gray-200 w-full text-lg placeholder:text-sm mb-7' 
          type="password" 
          placeholder='password'
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
        />
        <button className='bg-black rounded px-4 py-2 border-gray-200 w-full text-lg placeholder:text-sm mb-7 text-white font-semibold' >Login</button>
        <p className='flex justify-center items-center'>New here?<Link to='/usersignup' className='text-blue-600' >Create new Account</Link></p>
     </form>
     </div>
     <div>
      <form>
        <Link className='bg-yellow-400 rounded px-4 py-2  w-full text-lg placeholder:text-sm mb-5 text-black font-semibold border border-gray-350 flex items-center justify-center mt-42' to='/captainlogin'>Sign in as Captain?</Link>
     </form>
     </div>
      
    </div>
  )
}

export default Userlogin