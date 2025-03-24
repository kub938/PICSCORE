import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserInfoState {
  userId: number;
  nickname: string;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<UserInfoState>()(
  persist(
    (set) => ({
      userId: 0,
      nickname: "",
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    { name: "auth" }
  )
);
