import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/Axios";


const useAuthStore: any = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    
}));

export { useAuthStore }