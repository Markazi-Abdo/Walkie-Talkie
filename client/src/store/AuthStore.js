import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';

export const walkieTalkieAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdating: false,
    isChecking:true,

    checkAuth: async () =>{
        try {
            const res = await axiosInstance.get('/auth/check');
            console.log(res)
            set({authUser: res.data});
        } catch (error) {
            console.log(error)
            set({authUser: null})
        }finally{
            set({isChecking: false})
        }
    },
    signUpUser: async (formData) => {
        set({isSigningUp: true});
        try {
            const data = await axiosInstance.post('/auth/signup', formData);
            toast.success("Account created succesfully");
            set({authUser : data.data});
        } catch (error) {
            toast.error(error.message.data.message);
        } finally {
            set({isSigningUp: false});
        }      
    },
    logInUser: async (data) => {
        set({ isLoggingIn: true })
        try {
            const action = await axiosInstance.post('/auth/login', data);
            toast.success("Login Succesfull");
            set({ authUser: action.data });
        } catch (error) {
            toast.error(error.message.data.message)
        } finally {
            set({ isLoggingIn : false })
        }
    },
    logoutUser: async () => {
        try {
            const action = await axiosInstance.post('/auth/logout');
            set({ authUser: null});
            toast.success("Log Out successfull");
        } catch (error) {
            toast.error(error.message.data.message);
        } 
    }
}))