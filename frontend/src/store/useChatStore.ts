import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/Axios";
import { useAuthStore } from "./useAuthStore";
import type { MessageType, UseChatStoreType, UserType } from "../types";

const useChatStore = create<UseChatStoreType>((set, get) => ({
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

    sendMessage: async (messageData: { text: string | null, image: string | null }) => {
        const { messages, selectedUser } = get();
        try {
            const res = await axiosInstance.post(`message/send/${selectedUser?._id}`, messageData);
            set({ messages: [...messages, res.data] })
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
        const socket = useAuthStore.getState().socket;
        socket?.on("newMessage", (newMessage: MessageType) => {
            const isMessageFromSelectedUser = selectedUser._id === newMessage.senderId;
            if (!isMessageFromSelectedUser) return;

            set({
                messages: [...get().messages, newMessage]
            });
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket?.off("newMessage");
    },

    setSelectedUser: (selectedUser: UserType | null) => { set({ selectedUser }) }
}));

export { useChatStore };