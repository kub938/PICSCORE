import { evalTestApi, testApi } from "./api";
import { ImageEvalResponse } from "../types/evalTypes";

export const evalApi = {
  postTempImage: (imageFile: FormData) => {
    return evalTestApi.post("/api/v1/photo", imageFile);
  },

  saveImage: (evalResult: ImageEvalResponse) => {
    return testApi.post("/api/v1/photo/save", evalResult);
  },

  evalImage: (tempImageUrl: string) => {
    console.log(tempImageUrl);
    return testApi.get(`/api/v1/image/analyze`, {
      params: { imageUrl: tempImageUrl },
    });
  },
};
