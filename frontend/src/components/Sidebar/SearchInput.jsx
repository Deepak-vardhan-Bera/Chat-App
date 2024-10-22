import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { toast } from 'react-toastify';
import { messageStore } from '../../Stores/messageStore';

const SearchInput = () => {
  const { users,getMessages,setChatwith} = messageStore();
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (!search) return;
    if (search.length < 3) {
      return toast.error('Search term must be at least 3 letters long');
    }

    const searchedUsers = users.filter((user) => 
      user.fullname.toLowerCase().includes(search.toLowerCase())
    );

    if (searchedUsers.length === 0) {
      toast.error('No users found');
    } 
    getMessages(searchedUsers[0]._id);
    setChatwith(searchedUsers[0]._id,searchedUsers[0].fullname,searchedUsers[0].profilePic)
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type="text"
        value={search}
        placeholder="Type here"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-xs input input-bordered input-success input-md"
      />
      <button type='submit' className="btn btn-circle btn-md">
        <Search color='blue' />
      </button>
    </form>
  );
}

export default SearchInput;
