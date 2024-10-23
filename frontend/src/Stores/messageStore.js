import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = `https://chat-app-deepak-y3t6.onrender.com/api/`;

axios.defaults.withCredentials = true;

export const messageStore = create((set, get) => ({
  chatwithid: null,
  chatwithname: null,
  chatwithpic: null,
  isLoading: false,
  users: [],
  conversation: [], // Initialize as an array
  
  getUsers: async () => {
    try {
      set({ isLoading: true });

      const response = await axios.get(`${API_URL}user`);

      set({
        isLoading: false,
        users: response.data.users, 
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response?.data?.message || 'Error at Getting Users'}`);
      set({ isLoading: false });
    }
  },

  setChatwith: (id, name, pic) => {
    set({ chatwithid: id, chatwithname: name, chatwithpic: pic });
  },

  getMessages: async (id) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${API_URL}message/${id}`);
      set({ conversation: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response?.data?.message || 'Error at Getting messages'}`);
      set({ isLoading: false });
    }
  },

  sendMessage: async (message, chatwithid) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${API_URL}message/send/${chatwithid}`, { message });
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response?.data?.message || 'Error at sending message'}`);
      set({ isLoading: false });
    }
  },

  setconversation: (newMessage) => {
    set((state) => ({
      conversation: [...state.conversation, newMessage] 
    }));
  }
}));
