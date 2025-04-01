import React from "react";

interface ProgressBarProps {
  progress: number; // 0-100 사이의 값
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // 진행도가 0-100 범위를 벗어나지 않도록 제한
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-pic-primary h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${clampedProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
