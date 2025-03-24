import { useQuery } from "@tanstack/react-query";
import { boardApi } from "../api/boardApi";

export const useGetPhotos = () => {
  return useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      const response = await boardApi.getPhotos();
      console.log(response.data);
      return response;
    },
  });
};
