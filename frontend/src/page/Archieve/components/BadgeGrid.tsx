import React from "react";
import BadgeItem from "./BadgeItem";
import { Badge } from "../../../types";

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
    <div className="grid grid-cols-2 gap-4">
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
        <div className="col-span-2 p-8 text-center text-gray-500">
          표시할 업적이 없습니다.
        </div>
      )}
    </div>
  );
};

export default BadgeGrid;
