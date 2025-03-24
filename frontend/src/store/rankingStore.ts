import { create } from "zustand";
import { RankingState } from "../types/rankingTypes";

interface RankingStore extends RankingState {
  setTimeframe: (timeframe: "today" | "week" | "month" | "all") => void;
  setRankings: (rankings: any[]) => void;
  setLoading: (isLoading: boolean) => void;
  setPagination: (currentPage: number, totalPages: number) => void;
}

export const useRankingStore = create<RankingStore>((set) => ({
  timeframe: "today",
  rankings: [],
  isLoading: false,
  currentPage: 1,
  totalPages: 1,

  setTimeframe: (timeframe) => set({ timeframe }),
  setRankings: (rankings) => set({ rankings }),
  setLoading: (isLoading) => set({ isLoading }),
  setPagination: (currentPage, totalPages) => set({ currentPage, totalPages }),
}));
