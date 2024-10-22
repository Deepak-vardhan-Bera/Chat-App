import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../Stores/authStore';
const SignUp = () => {
     
    const {isLoading,signUp,user}=useAuthStore()

    const [Inputs, setInputs] = useState({
        fullname: '',
        username: '',
        password: '',
        confrimPassword: '',
        gender: ''
    });
   
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs({
            ...Inputs,
            [e.target.name]: e.target.value
        });
    };
const handleSubmit=async(e)=>{
    
    e.preventDefault()
    try {
       await signUp(Inputs)
       if(user)
        navigate('/')
    } catch (error) {
        console.log(error);
        
        toast.error("signUp Failed")
    }
}
    return (
        <div className='flex flex-col items-center justify-center mx-auto min-w-96'>
            <div className='w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md backdrop-filter backdrop-blur-lg bg-clip-padding'>
                <h1 className='font-serif text-3xl text-center' style={{ color: '#D0C8B7' }}>
                    SignUp
                    <span style={{ color: '#434904' }}> ChatApp</span>
                </h1>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div>
                        <label className='p-2 label'>
                            <span className='test-base label-text'>Full Name</span>
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Enter Full Name"
                            className="w-full max-w-xs input input-bordered"
                            value={Inputs.fullname}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className='p-2 label'>
                            <span className='test-base label-text'>Username</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            className="w-full max-w-xs input input-bordered"
                            value={Inputs.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className='p-2 label'>
                            <span className='test-base label-text'>Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            className="w-full max-w-xs input input-bordered"
                            value={Inputs.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className='p-2 label'>
                            <span className='test-base label-text'>Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            name="confrimPassword"
                            placeholder="Confirm Password"
                            className="w-full max-w-xs input input-bordered"
                            value={Inputs.confrimPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mt-2'>
                        <label className='test-base label-text'>Gender</label>
                        <select
                            name="gender"
                            value={Inputs.gender} 
                            onChange={handleChange} 
                            className="w-full max-w-xs select select-bordered"
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <p className='mt-2 text-sm text-white cursor-pointer hover:text-black' onClick={() => { navigate('/login') }}> Already have an Account?</p>
                    <div>
                        <button className='mt-2 btn btn-block btn-sm'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
