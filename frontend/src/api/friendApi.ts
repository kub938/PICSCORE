import { api, testApi } from "./api";

// Follower/Following interfaces
interface FollowerResponse {
  userId: number;
  profileImage: string;
  nickName: string;
  isFollowing: boolean;
}

interface FollowingResponse {
  userId: number;
  profileImage: string;
  nickName: string;
}

export const friendApi = {
  // Follower/Following endpoints
  getMyFollowers: () => {
    return testApi.get<FollowerResponse[]>("/api/v1/user/follower/me");
  },

  getMyFollowings: () => {
    return testApi.get<FollowingResponse[]>("/api/v1/user/following/me");
  },

  //   getUserFollowers: (userId: number) => {
  //     return api.get<FollowerResponse[]>(`/api/v1/user/follower/${userId}`);
  //   },

  //   getUserFollowings: (userId: number) => {
  //     return api.get<FollowingResponse[]>(`/api/v1/user/following/${userId}`);
  //   },

  //   toggleFollow: (followingId: number) => {
  //     return api.post<void>("/api/v1/user/following/me", { followingId });
  //   },

  //   deleteFollower: (userId: number) => {
  //     return api.delete<void>(`/api/v1/user/follower/${userId}`);
  //   },
};
