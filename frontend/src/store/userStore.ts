// src/store/userStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/userTypes";

interface UserState {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        isLoggedIn: false,
        userId: null,
        nickname: null,
        profileImage: null,
        token: null,
      },
      setUser: (user) => set({ user }),
      clearUser: () =>
        set({
          user: {
            isLoggedIn: false,
            userId: null,
            nickname: null,
            profileImage: null,
            token: null,
          },
        }),
    }),
    { name: "user-storage" }
  )
);
