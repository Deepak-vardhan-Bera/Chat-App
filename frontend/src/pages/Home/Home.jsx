import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import MessageContainer from '../../components/Messages/MessageContainer'
const Home = () => {
  return (
        <div className='p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md backdrop-filter backdrop-blur-lg bg-clip-padding sm:h-[450px] md:h-[550px] flex flex-row'>
        <SideBar/>
        <MessageContainer/>
        </div>
   
  )
}

export default Home