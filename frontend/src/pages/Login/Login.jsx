import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {


    const navigate=useNavigate()

  return (
    <div className='flex flex-col items-center justify-center mx-auto min-w-96' >
       <div className='w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md backdrop-filter backdrop-blur-lg bg-clip-padding' >
        <h1 className='font-serif text-3xl text-center' style={{ color: '#D0C8B7' }}>
            Login
        <span style={{ color: '#434904' }} > ChatApp</span>
        </h1>
       <form action="">
        <div>
            <label className='p-2 label'>
                <span className='test-base label-text' >Username</span>
            </label>
            <input type="text" placeholder="Enter Username" className="w-full max-w-xs input input-bordered" />
        </div>              
        <div>
            <label className='p-2 label'>
                <span className='test-base label-text' >Password</span>
            </label>
            <input type="text" placeholder="Enter Password" className="w-full max-w-xs input input-bordered" />
        </div> 
        <p className='mt-2 text-sm text-white cursor-pointer hover:text-black' onClick={()=>navigate('/signup')} > Don't have an Account</p>   
            <div>
                <button className='mt-2 btn btn-block btn-sm'>Login</button>
            </div>
          </form>
       
       </div>
       
    </div>
  )
}

export default Login