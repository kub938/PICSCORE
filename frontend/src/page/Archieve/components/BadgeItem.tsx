import React from "react";
import { Badge } from "../../../types";
import ProgressBar from "./ProgressBar";

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
      className={`bg-white p-4 rounded-lg border shadow-sm ${
        badge.achieved
          ? isSelected
            ? "border-green-500 bg-green-50"
            : "border-green-200"
          : "border-gray-200"
      } ${
        isSelectable && badge.achieved ? "cursor-pointer hover:bg-gray-50" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 mb-2">
          <img
            src={badge.image}
            alt={badge.name}
            className={`w-full h-full object-contain ${
              !badge.achieved ? "opacity-40 grayscale" : ""
            }`}
          />
          {badge.achieved && (
            <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
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

          {/* 선택된 뱃지 표시 */}
          {isSelected && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-20 rounded-full">
              <div className="bg-green-500 text-white rounded-full p-1">
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

        {badge.achieved ? (
          <span className="text-xs text-green-500 mt-1">
            {badge.achievedDate} 달성
          </span>
        ) : (
          badge.progress !== undefined &&
          badge.maxProgress !== undefined && (
            <div className="w-full mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{badge.progress}</span>
                <span>{badge.maxProgress}</span>
              </div>
              <ProgressBar
                progress={(badge.progress / badge.maxProgress) * 100}
              />
            </div>
          )
        )}
      </div>

      <p className="text-xs text-gray-500 mt-2 text-center">
        {badge.description}
      </p>
    </div>
  );
};

export default BadgeItem;
