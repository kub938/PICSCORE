import React from "react";

interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  achieved: boolean;
  achievedDate?: string;
  progress?: number;
  maxProgress?: number;
}

interface BadgeItemProps {
  badge: Badge;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: (badge: Badge) => void;
}

const BadgeItem: React.FC<BadgeItemProps> = ({
  badge,
  isSelectable = false,
  isSelected = false,
  onSelect,
}) => {
  // 디버깅을 위한 로그 추가 - 특별히 7번 배지를 주목
  if (badge.id === "7") {
    console.log(
      `7번 배지 렌더링 - 달성 여부: ${
        badge.achieved
      }, 타입: ${typeof badge.achieved}`
    );
  }

  // achieved가 undefined인 경우 false로 처리
  const isAchieved = badge.achieved === true;

  const handleClick = () => {
    if (isSelectable && isAchieved && onSelect) {
      onSelect(badge);
    }
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg border shadow-sm ${
        isAchieved
          ? isSelected
            ? "border-pic-primary bg-green-50"
            : "border-pic-primary border-opacity-30"
          : "border-gray-300 bg-gray-100"
      } ${isSelectable && isAchieved ? "cursor-pointer hover:bg-gray-50" : ""}`}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
          <img
            src={badge.image}
            alt={badge.name}
            className={`w-full h-full object-contain ${
              !isAchieved ? "opacity-50 grayscale" : ""
            }`}
            onError={(e) => {
              console.error(`이미지 로드 오류: ${badge.image}`);
              const target = e.target as HTMLImageElement;
              target.src = "/default-badge.png"; // 기본 이미지로 대체
            }}
          />
          {isAchieved && (
            <div className="absolute -top-1 -right-1 bg-pic-primary text-white rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          )}

          {/* 선택된 배지 표시 */}
          {isSelected && (
            <div className="absolute inset-0 flex items-center justify-center bg-pic-primary bg-opacity-20 rounded-full">
              <div className="bg-pic-primary text-white rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
            </div>
          )}
        </div>

        <h3 className="font-bold text-sm text-center">{badge.name}</h3>

        {isAchieved ? (
          <span className="text-xs text-pic-primary mt-1">
            {badge.achievedDate ? `${badge.achievedDate} 달성` : "달성 완료"}
          </span>
        ) : (
          <span className="text-xs text-gray-400 mt-1">미달성</span>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-2 text-center">
        {badge.description}
      </p>
    </div>
  );
};

export default BadgeItem;
