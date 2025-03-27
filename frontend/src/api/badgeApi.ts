// api/badgeApi.ts
import { api, testApi } from "./api";
import { useAuthStore } from "../store/authStore";

// 기본 응답 인터페이스
interface BaseResponse<T> {
  timeStamp: string;
  message: string;
  data: T;
}

// 배지 정보 인터페이스
interface BadgeResponse {
  badgeId: number;
  name: string;
  image: string;
  obtainCondition: string;
  isObtain: boolean;
}

// 프로필 배지 인터페이스
interface ProfileBadgeResponse {
  badgeId: number;
  badgeName: string;
  badgeImage: string;
}

export const badgeApi = {
  // 모든 배지 정보 조회
  getAllBadges: () => {
    const accessToken = useAuthStore.getState().accessToken;
    return testApi.get<BaseResponse<BadgeResponse[]>>("/api/v1/badge", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  // 프로필에 표시할 배지 설정
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

  // 현재 프로필에 표시된 배지 조회
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
