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
  accessToken: string;
  isLoggedIn: boolean;
  userId: number;
  login: (accessToken: string) => void;
  logout: () => void;
  setUserId: (userId: number) => void;
}

export const useAuthStore = create<TestUserInfoState>()(
  persist(
    (set) => ({
      accessToken: "",
      isLoggedIn: false,
      userId: 0,
      login: (accessToken: string) => {
        set({ isLoggedIn: true, accessToken: accessToken });
      },
      logout: () => {
        set({ isLoggedIn: false, accessToken: "" });
      },
      setUserId: (userId: number) => {
        set({ userId: userId });
      },
    }),
    { name: "auth" }
  )
);
