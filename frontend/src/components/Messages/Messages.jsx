import React from 'react';
import Message from './Message';

const Messages = () => {
  return (
    <div className='flex flex-col gap-4 px-4 overflow-auto'>
      <Message whom={"start"} />
      <Message whom={"end"} />
      <Message whom={"start"} />
      <Message whom={"end"} />
      <Message whom={"start"} />
      <Message whom={"start"} />
      <Message whom={"end"} />
      <Message whom={"start"} />
    </div>
  );
};

export default Messages;
