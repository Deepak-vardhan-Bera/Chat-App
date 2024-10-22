import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../Stores/authStore'

const Login = () => {

const{isLoading,login}=useAuthStore()
    
     const [Inputs, setInputs] = useState({
        username:'',
        password:''
     })
     const handleChange = (e) => {
        setInputs({
            ...Inputs,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit=(e)=>{
        
        e.preventDefault()
        try {
            login(Inputs)
            navigate('/')
        } catch (error) {
            console.log(error);
            toast.error("Login Failed")
        }
    }
    const navigate=useNavigate()

  return (
    <div className='flex flex-col items-center justify-center mx-auto min-w-96' >
       <div className='w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md backdrop-filter backdrop-blur-lg bg-clip-padding' >
        <h1 className='font-serif text-3xl text-center' style={{ color: '#D0C8B7' }}>
            Login
        <span style={{ color: '#434904' }} > ChatApp</span>
        </h1>
       <form onSubmit={(e)=>{handleSubmit(e)}}>
        <div>
            <label className='p-2 label'>
                <span className='test-base label-text' >Username</span>
            </label>
            <input type="text" name='username' value={Inputs.username} onChange={(e)=>{handleChange(e)}} placeholder="Enter Username" className="w-full max-w-xs input input-bordered" />
        </div>              
        <div>
            <label className='p-2 label'>
                <span className='test-base label-text' >Password</span>
            </label>
            <input type="password"  name='password' value={Inputs.password} onChange={(e)=>{handleChange(e)}} placeholder="Enter Password" className="w-full max-w-xs input input-bordered" />
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