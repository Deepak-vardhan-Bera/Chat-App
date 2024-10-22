import React, { useEffect, useRef } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { MessagesSquare } from 'lucide-react';
import { useAuthStore } from '../../Stores/authStore';
import { messageStore } from '../../Stores/messageStore';

const MessageContainer = () => {
  const {  chatwithid, chatwithname, chatwithpic, getMessages,conversation } = messageStore();

const{user}=useAuthStore()
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  useEffect(() => {

      setTimeout(() => {
        if (chatwithid) 
          {
          scrollToBottom();
          }
      }, 100);
    
   
  }, [conversation]);

  return (
    <>
      {chatwithid ? (
        <div className='md:min-w-[450px] flex flex-col h-full'>
          <div className='flex flex-row px-4 py-2 mb-2 rounded bg-slate-500'>
            <div className="w-10 rounded-full">
              <img src={chatwithpic} alt="Chat avatar" />
            </div>
            <span className='p-2 font-bold text-gray-900'> {chatwithname} </span>
          </div>
          <div className="flex-1 overflow-auto">
            <Messages />
            <div ref={messagesEndRef} />
          </div>
          <MessageInput />
        </div>
      ) : (
        <div className='md:min-w-[450px] flex flex-col h-full justify-center items-center'>
          <div className='flex flex-col items-center justify-center gap-2 px-4 font-semibold text-center text-gray-200 sm:text-lg md:text-xl'>
            <p>Welcome 👋 {user?.fullname} ❄</p>
            <p>Select a chat to start messaging</p>
            <MessagesSquare className='text-6xl text-center md:text-6xl' size={45} />
          </div>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
