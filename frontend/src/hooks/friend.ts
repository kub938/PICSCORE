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

export const useUserFollowers = (userId: number) => {
  return useQuery({
    queryKey: ["userFollowers", userId],
    queryFn: async () => {
      const response = await friendApi.getUserFollowers(userId);
      return response.data;
    },
    enabled: !!userId,
  });
};

export const useUserFollowings = (userId: number) => {
  return useQuery({
    queryKey: ["userFollowings", userId],
    queryFn: async () => {
      const response = await friendApi.getUserFollowings(userId);
      return response.data;
    },
    enabled: !!userId,
  });
};
