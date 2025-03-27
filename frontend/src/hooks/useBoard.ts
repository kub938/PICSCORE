import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { boardApi, Photo } from "../api/boardApi";

export const useGetPhotos = () => {
  return useInfiniteQuery({
    queryKey: ["photos"],
    queryFn: async ({ pageParam }) => {
      await new Promise((resolve) => setTimeout(resolve, 1800));

      const response = boardApi.getPhotos(pageParam);
      return response;
    },
    getNextPageParam: (last) => {
      console.log(
        "다음 페이지 확인할게요",
        last.data.data.currentPage,
        last.data.data.totalPages
      );
      if (last.data.data.currentPage < last.data.data.totalPages) {
        return last.data.data.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
