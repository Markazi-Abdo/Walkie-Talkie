import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const url = import.meta.env.MODE === "devlopment" ? "http://localhost:8000/walkietalkie" : "/walkietalkie";
export const walkieTalkieAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdating: false,
    isChecking:true,
    ioSocket: null,
    onlineUsers: [],

    checkAuth: async () =>{
        const { onlineUsers, connectSocket } = get();
        try {
            const res = await axiosInstance.get('/auth/check');
            console.log(res); 
            set({ authUser: res.data });
            connectSocket()
            console.log(onlineUsers)
        } catch (error) {
            console.log(error)
            set({authUser: null})
        }finally{
            set({isChecking: false})
        }
    },
    signUpUser: async (formData) => {
        const { connectSocket } = get();
        set({isSigningUp: true});
        try {
            const data = await axiosInstance.post('/auth/signup', formData);
            toast.success("Account created succesfully");
            set({authUser : data.data});
            connectSocket();
        } catch (error) {
            toast.error(error.message.data.message);
        } finally {
            set({isSigningUp: false});
        }      
    },
    logInUser: async (data) => {
       const { connectSocket } = get();
        set({ isLoggingIn: true })
        try {
            const action = await axiosInstance.post('/auth/login', data);
            toast.success("Login Succesfull");
            set({ authUser: action.data });
            connectSocket();
        } catch (error) {
            toast.error(error.message.data.message)
        } finally {
            set({ isLoggingIn : false })
        }
    },
    logoutUser: async () => {
        const { disconnectSocket } = get();
        try {
            const action = await axiosInstance.post('/auth/logout');
            set({ authUser: null});
            disconnectSocket();
            toast.success("Log Out successfull");
        } catch (error) {
            toast.error(error.message.data.message);
        } 
    },
    updateProfile: async (data)=>{
        set({ isUpdating: true })
        try {
            const action = await axiosInstance.put('/auth/update_profile', data);
            toast.success("Updated Succesfully");
        } catch (error) {   
            toast.error("Error Failed");
        } finally {
            set({ isUpdating: false });
        }
    },
    connectSocket: () => {
        const { authUser, ioSocket } = get();
        if(!authUser || (ioSocket && ioSocket.connected)) return;
        const socket  = io(url, { withCredentials: true, query: {
            userId : authUser?.userData?._id
        }});
        socket.connect();
        set({ ioSocket: socket });

        socket.on("onlineUsers", (userIds) => {
            set({ onlineUsers : userIds })
        })
    },
    disconnectSocket: () => {
        const { ioSocket } = get();
        if(ioSocket.connected) ioSocket.disconnect();
    }
}))