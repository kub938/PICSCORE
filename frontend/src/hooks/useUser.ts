import { useMutation } from "@tanstack/react-query";
import { api } from "../api/api";
import { useAuthStore } from "../store/authStore";

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post("api/v1/user/logout");
      return response;
    },
    onSuccess: (data) => {
      console.log("로그아웃 완료:", data);
    },
    onError: (error) => {
      console.log("로그아웃 실패", error);
    },
  });
};
