import { api, testApi } from "./api";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

// 응답 인터페이스
interface BaseResponse<T> {
  timeStamp: string;
  message: string;
  data: T;
}

// 팔로우 사용자 정보 인터페이스
export interface FollowerUser {
  userId: number;
  profileImage: string;
  nickName: string;
  isFollowing: boolean;
}

// 팔로잉 사용자 정보 인터페이스
export interface FollowingUser {
  userId: number;
  profileImage: string;
  nickName: string;
}

// 팔로우 토글 요청 인터페이스
interface ToggleFollowRequest {
  followingId: number;
}

export const friendApi = {
  // 내 팔로워 목록 조회
  getMyFollowers: () => {
    const accessToken = useAuthStore.getState().accessToken;
    return testApi.get<BaseResponse<FollowerUser[]>>(
      "/api/v1/user/follower/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  // 내 팔로잉 목록 조회
  getMyFollowings: () => {
    const accessToken = useAuthStore.getState().accessToken;
    return testApi.get<BaseResponse<FollowingUser[]>>(
      "/api/v1/user/following/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  // 특정 사용자의 팔로워 목록 조회
  getUserFollowers: (userId: number) => {
    const accessToken = useAuthStore.getState().accessToken;
    return testApi.get<BaseResponse<FollowerUser[]>>(
      `/api/v1/user/follower/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  // 특정 사용자의 팔로잉 목록 조회
  getUserFollowings: (userId: number) => {
    const accessToken = useAuthStore.getState().accessToken;
    return testApi.get<BaseResponse<FollowingUser[]>>(
      `/api/v1/user/following/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  // 팔로우/언팔로우 토글
  toggleFollow: async (followingId: number) => {
    try {
      const accessToken = useAuthStore.getState().accessToken;
      const data: ToggleFollowRequest = { followingId };

      // API 서버 기본 URL
      const baseURL = "https://j12b104.p.ssafy.io";

      // axios를 직접 사용하여 요청
      const response = await axios({
        method: "post",
        url: `${baseURL}/api/v1/user/following/me`,
        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.error("팔로잉 토글 에러:", error);
      throw error;
    }
  },

  // 팔로워 삭제 (차단)
  deleteFollower: (userId: number) => {
    const accessToken = useAuthStore.getState().accessToken;
    return testApi.delete<BaseResponse<void>>(
      `/api/v1/user/follower/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
};
