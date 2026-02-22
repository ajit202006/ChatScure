import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/Axios";
import { useAuthStore } from "./useAuthStore";

const useChatStore: any = create((set, get: any) => ({
    users: [],
    messages: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/users");
            set({ users: res.data });
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId: string) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`message/${userId}`);
            set({ messages: res.data });
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData: { text: string, image: string }) => {
        const { messages, selectedUser } = get();
        try {
            const res = await axiosInstance.post(`message/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] })
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
        const socket = useAuthStore.getState().socket;
        socket.on("newMessage", (newMessage: { _id: string, senderId: string, receiverId: string, image: string, text: string }) => {
            const isMessageFromSelectedUser = selectedUser._id === newMessage.senderId;
            if (!isMessageFromSelectedUser) return;

            set({
                messages: [...get().messages, newMessage]
            });
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser: any) => { set({ selectedUser }) }
}));

export { useChatStore };