import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/Axios";


const useAuthStore: any = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data: { fullName: string, email: string, password: string }) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data })
            toast.success("Account created successfully");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            set({ isSigningUp: false });
        }
    }
}));

export { useAuthStore }