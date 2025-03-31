// api/badgeApi.ts
import { testApi } from "./api";
import { useAuthStore } from "../store/authStore";

// Badge API response type definitions
interface BaseResponse<T> {
  timeStamp: string;
  message: string;
  data: T;
}

// Badge information interface
interface BadgeResponseData {
  badgeId: number;
  name: string;
  image: string;
  obtainCondition: string;
  isObtain: boolean;
}

// Profile badge interface as returned by API
interface ProfileBadgeResponse {
  badgeId: number;
  badgeName: string;
  badgeImage: string;
}

export const badgeApi = {
  // Get all badges with their achievement status
  getAllBadges: () => {
    const accessToken = useAuthStore.getState().accessToken;
    return testApi.get<BaseResponse<BadgeResponseData[]>>("/api/v1/badge", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  // Get badges for user profile display
  getUserBadges: (userId: number) => {
    const accessToken = useAuthStore.getState().accessToken;
    return testApi.get<BaseResponse<ProfileBadgeResponse[]>>(
      `/api/v1/badge/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  // Set the badge to display on user profile
  setDisplayBadge: (badgeId: number) => {
    const accessToken = useAuthStore.getState().accessToken;
    return testApi.patch<BaseResponse<void>>(
      "/api/v1/user/profile/badge",
      { badgeId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  // For admin or testing - manually complete a badge
  completeBadge: (badgeId: number) => {
    const accessToken = useAuthStore.getState().accessToken;
    return testApi.post<BaseResponse<void>>(
      "/api/v1/badge/complete",
      { badgeId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  // Get current display badge for user
  getCurrentDisplayBadge: () => {
    const accessToken = useAuthStore.getState().accessToken;
    return testApi.get<BaseResponse<ProfileBadgeResponse>>(
      "/api/v1/user/profile/badge",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
};
