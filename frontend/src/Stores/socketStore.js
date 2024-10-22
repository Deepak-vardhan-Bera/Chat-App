import { create } from 'zustand';

export const useSocketStore = create((set) => ({
  onlineUsers: [],
  socket: null,
  
  setSocket: (newSocket) => set({ socket: newSocket }),
  setOnlineUsers:(users)=>set({onlineUsers:users})
}));
