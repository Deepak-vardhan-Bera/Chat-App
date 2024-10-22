import React, { useState } from 'react'

import { SendHorizontal } from 'lucide-react';
import { messageStore } from '../../Stores/messageStore';

const MessageInput = () => {

  const [message, setmessage] = useState('')


const {sendMessage,chatwithid,getMessages}=messageStore()
  const handleSubmit=async(e)=>{
   await sendMessage(message,chatwithid)
   setmessage('')
   await getMessages(chatwithid)
  }
  return (
    

    <div  className='flex flex-row gap-2 p-1'>
       <input 
        value={message}
        onChange={(e)=>{setmessage(e.target.value)}} type="text" placeholder="Type here" className="w-full input input-bordered" />
        <button
        type='button'
        onClick={(e)=>handleSubmit(e)}
         className="btn btn-md"         
         > 
         <SendHorizontal className='text-emerald-400'/></button>
       
    </div> 
           
  )
}

export default MessageInput