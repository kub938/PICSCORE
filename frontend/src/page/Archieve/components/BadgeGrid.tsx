import React from "react";
import BadgeItem from "./BadgeItem";

interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  achieved: boolean;
  achievedDate?: string;
}

interface BadgeGridProps {
  badges: Badge[];
  isSelectable?: boolean;
  selectedBadgeId?: string;
  onSelectBadge?: (badge: Badge) => void;
}

const BadgeGrid: React.FC<BadgeGridProps> = ({
  badges,
  isSelectable = false,
  selectedBadgeId,
  onSelectBadge,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 px-1">
      {badges.length > 0 ? (
        badges.map((badge) => (
          <BadgeItem
            key={badge.id}
            badge={badge}
            isSelectable={isSelectable}
            isSelected={badge.id === selectedBadgeId}
            onSelect={onSelectBadge}
          />
        ))
      ) : (
        <div className="col-span-2 p-10 text-center text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-3 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="font-medium">표시할 업적이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default BadgeGrid;
