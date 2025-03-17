import React from "react";
import BadgeItem from "./BadgeItem";
import { Badge } from "../types";

interface BadgeGridProps {
  badges: Badge[];
}

const BadgeGrid: React.FC<BadgeGridProps> = ({ badges }) => {
  if (badges.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        이 카테고리에 업적이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {badges.map((badge) => (
        <BadgeItem key={badge.id} badge={badge} />
      ))}
    </div>
  );
};

export default BadgeGrid;
