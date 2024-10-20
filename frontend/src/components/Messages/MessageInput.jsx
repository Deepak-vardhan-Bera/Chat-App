import React from 'react'

import { SendHorizontal } from 'lucide-react';

const MessageInput = () => {
  return (
    
        <form >
    <div  className='flex flex-row gap-2 p-1'>
        <input type="text" placeholder="Type here" className="w-full input input-bordered" />
        <button
        type='submit'
         className="btn btn-md"         
         > <SendHorizontal className='text-emerald-400'/></button>
       
    </div>
            </form>
  )
}

export default MessageInput