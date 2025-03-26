import { useQuery } from "@tanstack/react-query";
import { friendApi } from "../api/friendApi";

// Profile hooks
export const useMyFollowers = () => {
  return useQuery({
    queryKey: ["myFollowers"],
    queryFn: async () => {
      const response = await friendApi.getMyFollowers();
      return response.data;
    },
  });
};

export const useMyFollowings = () => {
  return useQuery({
    queryKey: ["myFollowings"],
    queryFn: async () => {
      const response = await friendApi.getMyFollowings();
      return response.data;
    },
  });
};
