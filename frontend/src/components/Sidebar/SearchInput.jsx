import React from 'react'
import { Search } from 'lucide-react';
const SearchInput = () => {
  return (
   <form className='flex items-center gap-2'>  
<input
  type="text"
  placeholder="Type here"
  className="w-full max-w-xs input input-bordered input-success input-md" />
  <button className="btn btn-circle btn-md"> <Search  color='blue'/></button>

   </form>
  )
}

export default SearchInput