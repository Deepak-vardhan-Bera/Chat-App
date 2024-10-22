import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const API_URL = `http://localhost:9000/api/`;

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  data: null,

  signUp: async (inputs) => {
    set({ isLoading: true, error: null });
    const success = handleInputErrors(inputs);

    if (!success) {
      set({ isLoading: false });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}auth/signup`, inputs);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
        isLoading: false,
      });
      toast.success('Sign-up successful!');
    } catch (error) {
      console.log(error);
      toast.error(`${error.response?.data?.message || "Sign-up failed"}`);
      set({ isLoading: false });
    }
  },

  login: async (inputs) => {
    set({ isLoading: true, error: null });
    const success = handleLoginInputErrors(inputs);

    if (!success) {
      set({ isLoading: false });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}auth/login`, inputs);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
        isLoading: false,
      });
      toast.success('Login successful!');
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(`${error.response?.data?.message || "Login failed"}`);
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ error: null });
    try {
      const response = await axios.get(`${API_URL}auth/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      })
      
      ;
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
      console.log(error.response?.data?.message || "Auth check failed");
    }
  },
 logout:async()=>{
    try {
        set({ isLoading: true, error: null });
        const response=await axios.post(`${API_URL}auth/logout`)
        toast.success('logout successful!');
        set({
            user: null,
            isAuthenticated: false,
            isCheckingAuth: false,
          });
    } catch (error) {
      console.log(error);
      
        console.log(error.response?.data?.message);
        toast.error(`${error.response?.data?.message || "Logout failed"}`);
        set({ isLoading: false });
    }
 }
 

}));

// Helper functions
const handleInputErrors = (inputs) => {
  const { fullname, username, password, confrimPassword, gender } = inputs;
  if (!fullname || !username || !password || !gender) {
    toast.error('Please fill all fields');
    return false;
  }

  if (password !== confrimPassword) {
    toast.error('Passwords do not match');
    return false;
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }

  return true;
};

const handleLoginInputErrors = (inputs) => {
  const { username, password } = inputs;

  if (!username || !password) {
    toast.error('Please fill all fields');
    return false;
  }

  return true;
};
