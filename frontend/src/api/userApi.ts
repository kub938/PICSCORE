import { api } from "./api";

// User profile data interfaces
interface UserProfile {
  userId: number;
  nickName: string;
  profileImage: string;
  message: string;
  level: number;
  experience: number;
  followerCnt: number;
  followingCnt: number;
  badgeList: ProfileBadge[];
}

interface UserProfileWithFollowing extends UserProfile {
  isFollowing: boolean;
}

interface ProfileBadge {
  badgeId: number;
  badgeName: string;
  badgeImage: string;
}

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

interface UserStatistics {
  scoreAvg: number;
  timeAttackRank: number;
}

interface SearchUserResponse {
  userId: number;
  profileImage: string;
  nickName: string;
  message: string;
}

interface UpdateProfileRequest {
  profileImage: string;
  nickName: string;
  message: string;
}

// Base response wrapper used by the API

export const userApi = {
  // User profile endpoints
  getMyProfile: () => {
    return api.get<UserProfile>("/api/v1/user/profile/me");
  },

  getUserProfile: (userId: number) => {
    return api.get<UserProfileWithFollowing>(`/api/v1/user/profile/${userId}`);
  },

  updateProfile: (data: UpdateProfileRequest) => {
    return api.patch<void>("/api/v1/user/profile", data);
  },

  // Follower/Following endpoints
  getMyFollowers: () => {
    return api.get<FollowerResponse[]>("/api/v1/user/follower/me");
  },

  getMyFollowings: () => {
    return api.get<FollowingResponse[]>("/api/v1/user/following/me");
  },

  getUserFollowers: (userId: number) => {
    return api.get<FollowerResponse[]>(`/api/v1/user/follower/${userId}`);
  },

  getUserFollowings: (userId: number) => {
    return api.get<FollowerResponse[]>(`/api/v1/user/following/${userId}`);
  },

  toggleFollow: (followingId: number) => {
    return api.post<void>("/api/v1/user/following/me", {
      followingId,
    });
  },

  deleteFollower: (userId: number) => {
    return api.delete<void>(`/api/v1/user/follower/${userId}`);
  },

  // Search functionality
  searchUser: (searchText: string) => {
    return api.get<SearchUserResponse[]>(`/api/v1/user/search/${searchText}`);
  },

  // Statistics endpoints
  getMyStatistics: () => {
    return api.get<UserStatistics>("/api/v1/user/static/me");
  },

  getUserStatistics: (userId: number) => {
    return api.get<UserStatistics>(`/api/v1/user/static/${userId}`);
  },

  // User photos endpoints
  getMyPhotos: (isPublic: boolean) => {
    return api.get<any>("/api/v1/user/photo/me", {
      params: { isPublic },
    });
  },

  getUserPhotos: (userId: number, isPublic: boolean) => {
    return api.get<any>(`/api/v1/user/photo/${userId}`, {
      params: { isPublic },
    });
  },

  // User authentication endpoints
  logout: () => {
    return api.get<void>("/api/v1/user/logout");
  },

  deleteAccount: () => {
    return api.delete<void>("/api/v1/user");
  },
};
