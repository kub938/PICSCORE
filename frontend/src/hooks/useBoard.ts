import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { boardApi, Photo } from "../api/boardApi";
import { testApi } from "../api/api";

interface PhotoResponse {
  analysisChart: [];
  analysisText: [];
  createdAt: Date;
  hashTag: [];
  imageUrl: string;
  likeCnt: number;
  nickName: string;
  photoId: number;
  profileImage: string;
  score: number;
  userId: number;
}

interface SearchPhotoResponse {
  id: number;
  imageUrl: string;
}

export const useGetPhotos = () => {
  return useInfiniteQuery({
    queryKey: ["photos"],
    queryFn: async ({ pageParam }) => {
      const response = await boardApi.getPhotos(pageParam);
      return response.data.data;
    },
    getNextPageParam: (last) => {
      console.log("다음 페이지 확인할게요", last.currentPage, last.totalPages);
      if (last.currentPage < last.totalPages) {
        return last.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export const useGetPhoto = (photoId: number | null) => {
  return useQuery<PhotoResponse>({
    queryKey: ["photo", photoId],
    queryFn: async () => {
      if (!photoId) {
        throw new Error("photo id가 필요합니다");
      }
      const response = await boardApi.getPhoto(photoId);
      return response.data.data;
    },
    enabled: !!photoId,
  });
};

export const useDeletePhoto = (photoId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["photo-delete"],
    mutationFn: async () => {
      const response = await boardApi.deletePhoto(photoId);
      return response;
    },
    onSuccess: () => {
      console.log("게시글 삭제 성공");
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
    onError: (error) => {
      console.log("게시글 삭제 실패", error);
    },
  });
};

export const useSearchPhotos = (inputText: string) => {
  return useQuery({
    queryKey: ["search-photos", inputText],
    queryFn: async () => {
      if (!inputText || inputText.trim() === "") {
        return [];
      }

      const response = await boardApi.searchPhoto(inputText);
      console.log(response);
      return response.data.data;
    },
    enabled: !!inputText && inputText.trim() !== "",
  });
};
