import { create } from 'zustand'

export const WalkieTalkieThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "retro",
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme) || "retro";
        set({ theme });
    }
}))