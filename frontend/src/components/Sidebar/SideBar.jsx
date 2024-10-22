import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import { LogOut } from "lucide-react";
import { useAuthStore } from '../../Stores/authStore';


const SideBar = () => {

const{logout,isLoading,user}=useAuthStore()
  
const handleLogout=async()=>{
  await logout()
}

  return (
    <div className='flex flex-col h-full max-h-screen p-4 border border-r border-slate-500'> 
      <SearchInput/>  
      <div className="px-3 divider"></div>
      <div className="flex-1 overflow-auto"> 
        <Conversations/>
      </div>
      <LogOut onClick={handleLogout} className="w-6 h-6 mt-4 cursor-pointer " color='white'/>
      <p className='text-white' >{user?.fullname}</p> 
    </div>
  )
}

export default SideBar;
