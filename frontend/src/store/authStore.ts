import { create } from "zustand";
import { persist } from "zustand/middleware";

// export interface UserInfoState {
//   userId: number;
//   nickname: string;
//   isLoggedIn: boolean;
//   login: (userData: UserData) => void;
//   logout: () => void;
// }

// export interface UserData {
//   userId: number;
//   nickName: string;
//   message: string;
//   level: number;
//   experience: number;
// }

// export const useAuthStore = create<UserInfoState>()(
//   persist(
//     (set) => ({
//       userId: 0,
//       nickname: "",
//       isLoggedIn: false,
//       login: (userData: UserData) =>
//         set({
//           isLoggedIn: true,
//           userId: userData.userId,
//           nickname: userData.nickName,
//         }),
//       logout: () =>
//         set({ isLoggedIn: false, userId: -1, nickname: "로그인 해주세요" }),
//     }),
//     { name: "auth" }
//   )
// );

interface TestUserInfoState {
  isLoggedIn: boolean;
  userId: number;
  login: () => void;
  logout: () => void;
  setUserId: (userId: number) => void;
}

export const useAuthStore = create<TestUserInfoState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userId: 0,
      login: () => {
        set({ isLoggedIn: true });
      },
      logout: () => {
        set({ isLoggedIn: false });
      },
      setUserId: (userId: number) => {
        set({ userId: userId });
      },
    }),
    { name: "auth" }
  )
);
