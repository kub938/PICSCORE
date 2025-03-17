import React from "react";

const NoAuthMessage: React.FC = () => {
  return (
    <div className="p-4 mt-6 mx-4 bg-white rounded-lg border border-gray-200 text-center">
      <p className="text-gray-800 font-bold mb-2">
        팔로우하여 통계를 확인하세요
      </p>
      <p className="text-gray-500 text-sm">더 자세한 정보를 볼 수 있습니다</p>
    </div>
  );
};

export default NoAuthMessage;
