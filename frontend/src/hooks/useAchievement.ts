import { useCallback } from "react";
import { achievementApi } from "../api/achievementApi";

export const useAchievementCheck = () => {
  const checkAchievements = useCallback(async () => {
    return await achievementApi.checkAchievements();
  }, []);

  return { checkAchievements };
};
