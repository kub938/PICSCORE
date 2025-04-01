// useTimeAttackAchievement.ts 파일 생성

import { useState } from "react";
import { achievementApi } from "../api/achievementApi";

/**
 * 타임어택 업적 제출 및 확인을 위한 커스텀 훅
 */
export const useTimeAttackAchievement = () => {
  const [loading, setLoading] = useState(false);
  const [achievementEarned, setAchievementEarned] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState("");
  const [error, setError] = useState<Error | null>(null);

  /**
   * 타임어택 점수를 제출하고 업적 획득 여부를 확인합니다.
   * @param score 타임어택 점수
   */
  const submitScore = async (score: number) => {
    setLoading(true);
    setError(null);

    try {
      // 점수가 90점 이상인 경우에만 API 호출
      if (score >= 90) {
        const response = await achievementApi.submitTimeAttackScore(score);

        // 업적 달성 성공 메시지 확인
        if (response.message && response.message.includes("달성")) {
          setAchievementEarned(true);
          setAchievementMessage(
            "🎉 축하합니다! 첫 타임어택 90점 업적을 달성했습니다!"
          );
        } else {
          setAchievementEarned(false);
          setAchievementMessage("");
        }

        return {
          success: true,
          achievementEarned: response.message.includes("달성"),
          message: response.message,
        };
      }

      return {
        success: true,
        achievementEarned: false,
        message: "업적 달성 조건을 충족하지 않았습니다.",
      };
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error("업적 제출 오류:", error);

      return {
        success: false,
        achievementEarned: false,
        message: error.message,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    submitScore,
    loading,
    achievementEarned,
    achievementMessage,
    error,
  };
};
