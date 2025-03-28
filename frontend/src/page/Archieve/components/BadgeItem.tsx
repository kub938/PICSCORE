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
  const handleClick = () => {
    if (isSelectable && badge.achieved && onSelect) {
      onSelect(badge);
    }
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg border shadow-sm transition-all ${
        badge.achieved
          ? isSelected
            ? "border-pic-primary bg-green-50"
            : "border-pic-primary/20 hover:border-pic-primary/50"
          : "border-gray-200 bg-gray-50 opacity-70"
      } ${
        isSelectable && badge.achieved
          ? "cursor-pointer transform hover:scale-[1.02] hover:shadow-md"
          : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
          <img
            src={badge.image}
            alt={badge.name}
            className={`w-full h-full object-contain transition-all ${
              !badge.achieved ? "grayscale opacity-50" : ""
            }`}
          />
          {badge.achieved && (
            <div className="absolute -top-1 -right-1 bg-pic-primary text-white rounded-full p-1 shadow-sm">
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
            <div className="absolute inset-0 flex items-center justify-center bg-pic-primary/10 rounded-full animate-pulse">
              <div className="bg-pic-primary text-white rounded-full p-1 shadow-md">
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

        <h3 className="font-bold text-center mb-1">{badge.name}</h3>

        {badge.achieved ? (
          <span className="text-xs text-pic-primary font-medium mt-1 mb-2">
            {badge.achievedDate ? `${badge.achievedDate} 달성` : "달성 완료"}
          </span>
        ) : (
          <span className="text-xs text-gray-400 font-medium mt-1 mb-2">
            미달성
          </span>
        )}
      </div>

      <p className="text-xs text-gray-600 mt-1 text-center leading-relaxed">
        {badge.description}
      </p>
    </div>
  );
};

export default BadgeItem;
