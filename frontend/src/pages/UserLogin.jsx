import React from 'react'

const Userlogin = () => {
  return (
    <div className='p-7'>
     <form>
        <h3 className='text-xl mb-2'>What's your email</h3>
        <input required className='bg-gray-200 rounded px-4 py-2 border-gray-200 w-full text-lg placeholder:text-sm mb-7' type="email" placeholder="email@example.com"/>
        <h3 className='text-xl mb-2'>Enter Password</h3>
        <input required className='bg-gray-200 rounded px-4 py-2 border-gray-200 w-full text-lg placeholder:text-sm mb-7' type="password" placeholder='password'/>
        <button className='bg-black rounded px-4 py-2 border-gray-200 w-full text-lg placeholder:text-sm mb-7 text-white' >Login</button>
     </form>
      
    </div>
  )
}

export default Userlogin