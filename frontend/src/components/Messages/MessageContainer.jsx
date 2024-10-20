import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { MessagesSquare } from 'lucide-react';


const MessageContainer = () => {
    const ischatSelected=false
  return (
    <>
    {ischatSelected?(
            <div className='md:min-w-[450px] flex flex-col h-full'>
            <div className='px-4 py-2 mb-2 rounded bg-slate-500'>
              <span className='label-text'>TO:</span>
              <span className='font-bold text-gray-900'> John Doe</span>
            </div>
            {/* Main area where messages appear */}
            <div className="flex-1 overflow-auto">
              <Messages />
            </div>
              <MessageInput/>
          </div>
    ):
    (
		<div className='md:min-w-[450px] flex flex-col h-full justify-center items-center'>
			<div className='flex flex-col items-center justify-center gap-2 px-4 font-semibold text-center text-gray-200 sm:text-lg md:text-xl'>
				<p>Welcome 👋 Deepak Vardhan ❄</p>
				<p>Select a chat to start messaging</p>
                <MessagesSquare className='text-6xl text-center md:text-6xl' size={45}/>
				{/* <Messages  */}
			</div>
		</div>
	)}

    </>
  );
};

export default MessageContainer;
