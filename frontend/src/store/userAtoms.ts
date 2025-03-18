import { atom } from "recoil";
import { User } from "../types/userTypes";

// User State Atom
export const userState = atom<User>({
  key: "userState",
  default: {
    isLoggedIn: false,
    userId: null,
    nickname: null,
    profileImage: null,
    token: null,
  },
});
