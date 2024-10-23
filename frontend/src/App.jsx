import { useEffect,useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import io from 'socket.io-client';
import { useAuthStore } from './Stores/authStore';
import { useSocketStore } from './Stores/socketStore';
import { messageStore } from './Stores/messageStore';
import notificationSound from "./assets/Sound/notification.mp3";
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

// Protected Route: Only accessible if authenticated
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to='/login' replace />;
}

function RedirectAuthenticatedUser({ children }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to='/' replace /> : children;
}

function App() {
  const { checkAuth, isAuthenticated, user } = useAuthStore();
  const {  setOnlineUsers } = useSocketStore();
  const { setconversation } = messageStore();
const [socket, setSocket] = useState(null)
  useEffect(() => {
    checkAuth()
    console.log("is authenicated:",isAuthenticated);
    
    }, [])

useEffect(() => {
  socket?.on("newMessage", (newMessage) => {
    newMessage.shouldShake = true;
    const sound = new Audio(notificationSound);
    sound.play();
    console.log(newMessage);
    
    setconversation( newMessage);
  });

  return () => socket?.off("newMessage");
}, [socket]);


    
  useEffect(() => {
    

    if (user) {
      const socket = io('https://chat-app-deepak-y3t6.onrender.com', {
        query: { userId: user?._id },
      });

      
      setSocket(socket);

     
      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });
 
      return () => {
        socket.close();
        setSocket(null);
      };
    }
  }, [user]);

  return (
    <div className='flex items-center justify-center h-screen p-4'>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/login' element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
        <Route path='/signup' element={<RedirectAuthenticatedUser><SignUp /></RedirectAuthenticatedUser>} />
      </Routes>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}
      />


    </div>
  );
}

export default App;
