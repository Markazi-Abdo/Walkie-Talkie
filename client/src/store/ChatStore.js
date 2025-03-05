import { create } from "zustand";
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
import { walkieTalkieAuthStore } from "./AuthStore";

export const WalkieTalkieChatStore = create((set, get) => ({
    //States
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    //methods
    getUsers: async () => {
        set({ isUsersLoading: true});
        try {
            const action = await axiosInstance.get("/message/users");
            console.log(action)
            set({ users: action.data.data });
            toast.success(action.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false});
        }
    },
    getMessages: async (id) => {
        set({isMessagesLoading: true});
        try {
            const action = await axiosInstance.get(`/message/${id}`);
            set({messages: action.data.messagesData});
            toast.success(action.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false});
        }
    },
    setSelectedUser: (selectedUser) => { set({ selectedUser })},
    sendMessage: async (data) => {
        const {selectedUser, messages } = get();
        try {
            const action = await axiosInstance.post(`/message/send/${selectedUser._id}`, data);
            set({ messages: [...messages, action.data.messageData]})
            toast.success(action.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    listenToMessages: () => {
        const { selectedUser } = get();
        if(!selectedUser) return;

        const socket = walkieTalkieAuthStore.getState().ioSocket;
        socket.on("newMessage", (data) => {
            set({ messages : [...get().messages, data]})
        })
    },
    unlisten : () => {
        const socket = walkieTalkieAuthStore.getState().ioSocket;
        socket.off("newMessage");
    }
}))