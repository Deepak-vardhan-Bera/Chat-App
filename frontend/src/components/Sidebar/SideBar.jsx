import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import { LogOut } from "lucide-react";


const SideBar = () => {
  return (
    <div className='flex flex-col h-full max-h-screen p-4 border border-r border-slate-500'> 
      <SearchInput/>  
      <div className="px-3 divider"></div>
      <div className="flex-1 overflow-auto"> 
        <Conversations/>
      </div>
      <LogOut className="w-6 h-6 mt-4 cursor-pointer " color='white'/> 
    </div>
  )
}

export default SideBar;
