import { create } from "zustand";

const useThemeStore: any = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "retro",
    setTheme: (theme: string) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme: theme });
    }
}));

export { useThemeStore };