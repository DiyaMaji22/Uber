import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
const Captainlogin = () => {
   const[email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const[CaptainData,setCaptainData]=React.useState({});
    const submitHandler=(e)=>{
  
      e.preventDefault();
      
      setCaptainData({
        email:email,
        password:password
      });
      
     setEmail('');
     setPassword('');
      
    }
    
  return (
    <div className='p-7 flex flex-col justify-between'>
      <img className='w-16' src='https://www.svgrepo.com/show/505031/uber-driver.svg'/>
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
        <p className='flex justify-center items-center'>Join a fleet?<Link to='/captainsignup' className='text-blue-600' >Register as a Captain</Link></p>
     </form>
     </div>
     <div>
      <form>
        <Link className='bg-green-500 rounded px-4 py-2  w-full text-lg placeholder:text-sm mb-5 text-black font-semibold border border-gray-350 flex items-center justify-center mt-42' to='/userlogin'>Sign in as User?</Link>
     </form>
     </div>
      
    </div>
  )
}

export default Captainlogin