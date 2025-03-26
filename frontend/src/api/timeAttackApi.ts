// api/timeAttackApi.ts
import { api, testApi } from "./api";

// 타임어택 API 인터페이스
interface BaseResponse<T> {
  timeStamp: string;
  message: string;
  data: T;
}

// 사진 분석 응답 인터페이스
interface AnalysisResponse {
  name: string;
  confidence: number;
}

export const timeAttackApi = {
  // 타임어택 랭킹 조회
  getRanking: (pageNum: number) => {
    return testApi.get<BaseResponse<any>>(
      `/api/v1/activity/time-attack/${pageNum}`
    );
  },

  // 사진 연관도 분석
  analyzePhoto: (imageFile: File, topic: string) => {
    const formData = new FormData();
    formData.append("imageFile", imageFile);
    formData.append("topic", topic);

    return testApi.post<BaseResponse<AnalysisResponse>>(
      "/api/v1/activity/analysis",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};
