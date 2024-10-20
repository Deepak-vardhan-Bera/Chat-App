import React from 'react';
import Conversation from './Converssation';

const Conversations = () => {
  return (
    <div className='flex flex-col py-2 overflow-y-auto h-[500px] max-h-[80vh]'> {/* Adjust height as needed */}
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
}

export default Conversations;
