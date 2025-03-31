import { evalTestApi } from "./api";
import { ImageEvalResponse } from "../types/evalTypes";

export const evalApi = {
  postTempImage: (imageFile: FormData) => {
    return evalTestApi.post("/api/v1/photo", imageFile);
  },

  saveImage: (evalResult: ImageEvalResponse) => {
    return evalTestApi.post("/api/v1/photo/save", evalResult);
  },

  evalImage: (tempImageUrl: string) => {
    return evalTestApi.get(`/api/image/analyze/${tempImageUrl}`);
  },
};
