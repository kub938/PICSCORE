import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/userApi";

// Profile hooks
export const useMyProfile = () => {
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      const response = await userApi.getMyProfile();
      return response.data;
    },
  });
};

export const useUserProfile = (userId: number) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      const response = await userApi.getUserProfile(userId);
      return response.data;
    },
    enabled: !!userId,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: () => {
      // Invalidate and refetch the myProfile query after successful update
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
};

// Follower hooks
export const useMyFollowers = () => {
  return useQuery({
    queryKey: ["myFollowers"],
    queryFn: async () => {
      const response = await userApi.getMyFollowers();
      return response.data;
    },
  });
};

export const useMyFollowings = () => {
  return useQuery({
    queryKey: ["myFollowings"],
    queryFn: async () => {
      const response = await userApi.getMyFollowings();
      return response.data;
    },
  });
};

export const useUserFollowers = (userId: number) => {
  return useQuery({
    queryKey: ["userFollowers", userId],
    queryFn: async () => {
      const response = await userApi.getUserFollowers(userId);
      return response.data;
    },
    enabled: !!userId,
  });
};

export const useUserFollowings = (userId: number) => {
  return useQuery({
    queryKey: ["userFollowings", userId],
    queryFn: async () => {
      const response = await userApi.getUserFollowings(userId);
      return response.data;
    },
    enabled: !!userId,
  });
};

export const useToggleFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.toggleFollow,
    onSuccess: () => {
      // Invalidate relevant queries after toggling follow status
      queryClient.invalidateQueries({ queryKey: ["myFollowings"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};

export const useDeleteFollower = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.deleteFollower,
    onSuccess: () => {
      // Invalidate the myFollowers query after successful deletion
      queryClient.invalidateQueries({ queryKey: ["myFollowers"] });
    },
  });
};

// Search hook
export const useSearchUsers = (searchText: string) => {
  return useQuery({
    queryKey: ["searchUsers", searchText],
    queryFn: async () => {
      const response = await userApi.searchUser(searchText);
      return response.data;
    },
    enabled: searchText.length > 0,
  });
};

// Statistics hooks
export const useMyStatistics = () => {
  return useQuery({
    queryKey: ["myStatistics"],
    queryFn: async () => {
      const response = await userApi.getMyStatistics();
      return response.data;
    },
  });
};

export const useUserStatistics = (userId: number) => {
  return useQuery({
    queryKey: ["userStatistics", userId],
    queryFn: async () => {
      const response = await userApi.getUserStatistics(userId);
      return response.data;
    },
    enabled: !!userId,
  });
};

// Photo hooks
export const useMyPhotos = (isPublic: boolean) => {
  return useQuery({
    queryKey: ["myPhotos", isPublic],
    queryFn: async () => {
      const response = await userApi.getMyPhotos(isPublic);
      return response.data;
    },
  });
};

export const useUserPhotos = (userId: number, isPublic: boolean) => {
  return useQuery({
    queryKey: ["userPhotos", userId, isPublic],
    queryFn: async () => {
      const response = await userApi.getUserPhotos(userId, isPublic);
      return response.data;
    },
    enabled: !!userId,
  });
};

// Auth hooks
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.logout,
    onSuccess: () => {
      // Clear all queries from cache on logout
      queryClient.clear();
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.deleteAccount,
    onSuccess: () => {
      // Clear all queries from cache on account deletion
      queryClient.clear();
    },
  });
};
