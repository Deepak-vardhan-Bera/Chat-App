import React from 'react';
import Message from './Message';
import { messageStore } from '../../Stores/messageStore';

const Messages = () => {
  const { conversation } = messageStore();
  return (
    <div className='flex flex-col gap-4 px-4 overflow-y-auto'>
      {
        conversation?.map((message,index) => {
        
          return (
            <Message 
              key={index} 
              message={message?.message} 
              time={message?.createdAt}
              id={message?.senderId}
              shake={message?.shouldShake}
            />
          )
        })
      }
    </div>
  );
};

export default Messages;
