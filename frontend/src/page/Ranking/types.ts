export interface RankingUser {
  rank: number;
  userId: string;
  nickname: string;
  profileImage: string | null;
  score: number;
}

export type TimeFrame = "today" | "week" | "month" | "all";

export interface RankingState {
  timeframe: TimeFrame;
  rankings: RankingUser[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
}
