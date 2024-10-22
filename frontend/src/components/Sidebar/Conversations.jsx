import React, { useEffect } from 'react';
import Conversation from './Converssation';
import { messageStore } from '../../Stores/messageStore';

const Conversations = () => {
  const { users, isLoading, getUsers,setChatwith } = messageStore();



  useEffect(() => {
    getUsers(); 
  }, []);

  return (
    <div className='flex flex-col py-2 overflow-y-auto h-[500px] max-h-[80vh]'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        users?.map((user) => (
          <Conversation pic={user.profilePic} name={user.fullname} key={user._id}  id={user._id}/>
        ))
      )}
    </div>
  );
};

export default Conversations;
