import { atom } from "recoil";
import { RankingState } from "../types/rankingTypes";

// Ranking State Atom
export const rankingState = atom<RankingState>({
  key: "rankingState",
  default: {
    timeframe: "today", // 'today', 'week', 'month', 'all'
    rankings: [],
    isLoading: false,
    currentPage: 1,
    totalPages: 1,
  },
});
