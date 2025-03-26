// hooks/useBadge.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { badgeApi } from "../api/badgeApi";

// 모든 뱃지 조회 Hook
export const useAllBadges = () => {
  return useQuery({
    queryKey: ["badges"],
    queryFn: async () => {
      const response = await badgeApi.getAllBadges();
      return response;
    },
  });
};

// 뱃지 완료 처리 Hook
export const useCompleteBadge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: badgeApi.completeBadge,
    onSuccess: () => {
      // 뱃지 목록을 다시 불러옴
      queryClient.invalidateQueries({ queryKey: ["badges"] });
    },
  });
};

// 프로필 표시 뱃지 설정 Hook
export const useSetDisplayBadge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: badgeApi.setDisplayBadge,
    onSuccess: () => {
      // 프로필 정보와 현재 표시 뱃지 정보를 다시 불러옴
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      queryClient.invalidateQueries({ queryKey: ["currentDisplayBadge"] });
    },
  });
};

// 현재 표시 중인 뱃지 조회 Hook
export const useCurrentDisplayBadge = () => {
  return useQuery({
    queryKey: ["currentDisplayBadge"],
    queryFn: async () => {
      const response = await badgeApi.getCurrentDisplayBadge();
      return response;
    },
  });
};
