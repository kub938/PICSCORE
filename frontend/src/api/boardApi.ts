import { api } from "./api";

interface PostRequest {
  imageUrl: string;
  score: number;
  analysisChart?: number;
  analysisText?: string;
  isPublic: boolean;
}

interface Photo {
  totalPages: number;
  photos: {
    1: [
      {
        id: number;
        imageUrl: string;
      }
    ];
  };
}

export const boardApi = {
  getPhotos: () => {
    return api.get<{ data: Photo[] }>("/api/v1/photo");
  },
  postPhoto: (data: PostRequest) => {
    api.post("/api/v1/photo", data);
  },
  getTopPhotos: () => {
    api.get("/api/v1/photo/top5");
  },
  getPhoto: (id: number) => {
    api.get(`/api/v1/photo/${id}`);
  },
  deletePhoto: (id: number) => {
    api.delete(`/api/v1/photo/${id}`);
  },
  searchPhoto: (inputText: string) => {
    api.post(`/api/v1/photo/search`, { keyword: inputText });
  },
};
