import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Userlogin = () => {
  const[email,setEmail]=React.useState('');
  const [password,setPassword]=React.useState('');
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <img className='w-16 mb-2' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
     <div>
      <form>
        <h3 className='text-lg font-medium mb-2' 
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}>What's your email</h3>
        <input required className='bg-gray-200 rounded px-4 py-2 border-gray-200 w-full text-lg placeholder:text-sm mb-7' type="email" placeholder="email@example.com"/>
        <h3 className='text-lg font-medium mb-2' 
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}>Enter Password</h3>
        <input required className='bg-gray-200 rounded px-4 py-2 border-gray-200 w-full text-lg placeholder:text-sm mb-7' type="password" placeholder='password'/>
        <button className='bg-black rounded px-4 py-2 border-gray-200 w-full text-lg placeholder:text-sm mb-7 text-white font-semibold' >Login</button>
        <p className='flex justify-center items-center'>New here?<Link to='/usersignup' className='text-blue-600' >Create new Account</Link></p>
     </form>
     </div>
     <div>
      <form>
        <button className='bg-yellow-400 rounded px-4 py-2  w-full text-lg placeholder:text-sm mb-7 text-black font-semibold border border-gray-350'>Sign in as Captain?</button>
     </form>
     </div>
      
    </div>
  )
}

export default Userlogin