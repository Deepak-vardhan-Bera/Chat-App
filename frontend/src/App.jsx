import { useState } from 'react'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <div className='flex items-center justify-center h-screen p-4'>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>        
     </Routes>
  </div>

   </>
  )
}

export default App
