// 랭킹 사용자 인터페이스 (랭킹 페이지에서 사용)
export interface RankingUser {
  rank: number;
  userId: string;
  nickname: string;
  profileImage: string | null;
  score: number;
}

// 시간 프레임 타입
export type TimeFrame = "today" | "week" | "month" | "all";

// 랭킹 상태 인터페이스
export interface RankingState {
  timeframe: TimeFrame;
  rankings: RankingUser[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
}

// 페이지네이션 컴포넌트 속성 인터페이스
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

// 랭킹 리스트 컴포넌트 속성 인터페이스
export interface RankingListProps {
  rankings: RankingUser[];
  loading: boolean;
}

// 랭킹 아이템 컴포넌트 속성 인터페이스
export interface RankingItemProps {
  user: RankingUser;
}

// 트로피 카드 컴포넌트 속성 인터페이스
export interface TrophyCardProps {
  rank: number;
  trophyImage: string;
  nickname: string;
}
