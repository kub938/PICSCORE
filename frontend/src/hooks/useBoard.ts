import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { boardApi, Photo } from "../api/boardApi";

export const useGetPhotos = () => {
  return useInfiniteQuery({
    queryKey: ["photos"],
    queryFn: ({ pageParam }) => {
      const response = boardApi.getPhotos(pageParam);
      return response;
    },
    getNextPageParam: (last) => {
      if (last.data.data.currentPage < last.data.data.totalPages) {
        return last.data.data.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
