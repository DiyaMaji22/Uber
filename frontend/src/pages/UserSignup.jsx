import React from 'react'
import { Link } from 'react-router-dom'
const UserSignup = () => {
  const[email,setEmail]=React.useState('');
  const [password,setPassword]=React.useState('');  
  const[firstName,setFirstName]=React.useState('');
  const[lastName,setLastName]=React.useState('');
  const [userData,setUserData]=React.useState({});

  const submitHandler=(e)=>{

    e.preventDefault();
    setUserData({
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password
    });
    console.log(userData);
    setEmail('');
   setPassword('');
   setFirstName('');
   setLastName('');
  }
  return (
    <div>
      <div className='p-7 flex flex-col justify-between h-screen'>
      <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
     <div>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
        <div className='flex gap-4'>
          <input 
          required 
          className='bg-gray-200 rounded px-4 py-2 border-gray-200  text-base placeholder:text-sm mb-5 w-1/2' 
          type="text" 
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input 
          required 
          className='bg-gray-200 rounded px-4 py-2 border-gray-200  text-base placeholder:text-sm mb-5 w-1/2' 
          type="text" 
          placeholder="Enter Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        </div>
        
        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input 
          required 
          className='bg-gray-200 rounded px-4 py-2 border-gray-200 w-full text-base placeholder:text-sm mb-5' 
          type="email" 
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input 
          required 
          className='bg-gray-200 rounded px-4 py-2 border-gray-200 w-full text-base placeholder:text-sm mb-5' 
          type="password" 
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='bg-black rounded px-4 py-2 border-gray-200 w-full text-base placeholder:text-sm mb-5 text-white font-semibold' >Login</button>
        <p className='flex justify-center items-center'>Already have a Account?<Link to='/userlogin' className='text-blue-600' >Login Here</Link></p>
     </form>
     </div>
     <div>
      <form>
        <Link className='bg-yellow-400 rounded px-4 py-2  w-full text-base placeholder:text-sm mb-3 text-black font-semibold border border-gray-350 flex items-center justify-center mt-42' to='/captainlogin'>Sign in as Captain?</Link>
     </form>
     </div>
      
    </div>
    </div>
  )
}

export default UserSignup