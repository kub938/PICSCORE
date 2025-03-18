// 업적(뱃지) 타입 정의
export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  achieved: boolean;
  achievedDate?: string;
  progress?: number;
  maxProgress?: number;
}

// 업적 카테고리 타입 정의
export interface BadgeCategory {
  id: string;
  name: string;
  badges: Badge[];
}
