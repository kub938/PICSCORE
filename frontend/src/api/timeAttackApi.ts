// api/timeAttackApi.ts
import { api, testApi } from "./api";
import {
  TimeAttackApiResponse,
  AnalysisResponse,
  RankingData,
  SaveTimeAttackRequest,
} from "../types/timeAttackTypes";
interface BaseResponse<T> {
  data: T;
  message: string;
  status: number;
  statusText: string;
  timeStamp: string;
}

export const timeAttackApi = {
  // 타임어택 랭킹 조회
  getRanking: (pageNum: number) => {
    return testApi.get<TimeAttackApiResponse<RankingData>>(
      `/api/v1/activity/time-attack/${pageNum}`
    );
  },

  // 사진 연관도 분석
  analyzePhoto: (imageFile: File, topic: string) => {
    const formData = new FormData();
    formData.append("imageFile", imageFile);
    formData.append("topic", topic);

    return testApi.post<TimeAttackApiResponse<AnalysisResponse>>(
      "/api/v1/activity/analysis",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  // 타임어택 결과 저장
  // api/timeAttackApi.ts - 타임어택 결과 저장 API 수정
  saveTimeAttackResult: (data: SaveTimeAttackRequest) => {
    return testApi.post<BaseResponse<void>>("/api/v1/activity/save", data, {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: function (status) {
        return status >= 200 && status < 400; // 302 포함 성공으로 처리
      },
    });
  },

  // 내 타임어택 기록 조회
  getMyTimeAttackHistory: () => {
    return testApi.get<TimeAttackApiResponse<any>>(
      "/api/v1/activity/my-history"
    );
  },

  // 특정 사용자의 타임어택 기록 조회
  getUserTimeAttackHistory: (userId: number) => {
    return testApi.get<TimeAttackApiResponse<any>>(
      `/api/v1/activity/user-history/${userId}`
    );
  },
};
