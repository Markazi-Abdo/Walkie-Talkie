import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'

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
        const data = await axiosInstance.post('/auth/signup', formData);
        
    } 
}))