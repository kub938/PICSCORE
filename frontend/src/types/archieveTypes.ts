// 업적(뱃지) 인터페이스
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

// 업적 카테고리 인터페이스
export interface BadgeCategory {
  id: string;
  name: string;
  badges: Badge[];
}

// 뱃지 그리드 컴포넌트 속성 인터페이스
export interface BadgeGridProps {
  badges: Badge[];
  isSelectable?: boolean;
  selectedBadgeId?: string;
  onSelectBadge?: (badge: Badge) => void;
}

// 뱃지 아이템 컴포넌트 속성 인터페이스
export interface BadgeItemProps {
  badge: Badge;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: (badge: Badge) => void;
}

// 뱃지 선택기 컴포넌트 속성 인터페이스
export interface BadgeSelectorProps {
  onClose: () => void;
  onSelectBadge: (badge: Badge) => void;
  currentBadge?: string;
}

// 카테고리 탭 타입 (BadgeCategory의 일부 속성만 필요함)
export type Category = Pick<BadgeCategory, "id" | "name">;

// 카테고리 탭 컴포넌트 속성 인터페이스
export interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

// 진행 바 컴포넌트 속성 인터페이스
export interface ProgressBarProps {
  progress: number; // 0-100 사이의 값
}
