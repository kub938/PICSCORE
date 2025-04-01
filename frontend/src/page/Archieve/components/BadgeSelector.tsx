import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../../types";
import { useAllBadges } from "../../../hooks/useBadge"; // 실제 API 훅 사용

// API 응답 타입 정의
interface BadgeResponseData {
  badgeId: number;
  name: string;
  image: string;
  obtainCondition: string;
  isObtain: boolean;
}

interface ApiResponse {
  data: {
    data: BadgeResponseData[];
    message: string;
    timeStamp: string;
  };
}

interface BadgeSelectorProps {
  onClose: () => void;
  onSelectBadge: (badge: Badge) => void;
  currentBadge?: string;
}

const BadgeSelector: React.FC<BadgeSelectorProps> = ({
  onClose,
  onSelectBadge,
  currentBadge,
}) => {
  const navigate = useNavigate();
  const [badges, setBadges] = useState<Badge[]>([]);

  // 실제 API 데이터 가져오기
  const { data, isLoading, error } = useAllBadges();

  useEffect(() => {
    if (data?.data?.data) {
      // API 응답을 Badge 타입으로 변환
      const apiData: Badge[] = data.data.data.map(
        (item: BadgeResponseData) => ({
          id: item.badgeId.toString(),
          name: item.name,
          description: item.obtainCondition,
          image: item.image,
          achieved: item.isObtain,
        })
      );

      setBadges(apiData);
    }
  }, [data]);

  const handleSelectBadge = (badge: Badge) => {
    // 달성한 뱃지만 선택 가능하도록 유지
    if (badge.achieved) {
      onSelectBadge(badge);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-80 max-h-[80vh] rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold text-lg">프로필 뱃지 선택</h3>
          <button onClick={onClose} className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">
              <p>뱃지 정보를 불러오는데 실패했습니다</p>
            </div>
          ) : badges.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>표시할 뱃지가 없습니다</p>
              <button
                onClick={() => {
                  onClose();
                  navigate("/archieve");
                }}
                className="mt-2 text-green-500 font-medium"
              >
                업적 도전하기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-2 rounded-lg border ${
                    currentBadge === badge.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  } ${
                    badge.achieved
                      ? "cursor-pointer hover:bg-gray-50"
                      : "cursor-not-allowed"
                  } transition flex flex-col items-center`}
                  onClick={() => handleSelectBadge(badge)}
                >
                  <div
                    className={`relative ${
                      !badge.achieved ? "opacity-40 grayscale" : ""
                    }`}
                  >
                    <img
                      src={badge.image}
                      alt={badge.name}
                      className="w-12 h-12 object-contain mb-1"
                    />
                    {badge.achieved && (
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 text-xs">
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
                  </div>
                  <span className="text-xs text-center font-medium truncate w-full">
                    {badge.name}
                  </span>
                  {!badge.achieved && (
                    <span className="text-xs text-gray-400">미달성</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded text-gray-700 font-medium"
            >
              취소
            </button>
            <button
              onClick={() => {
                onClose();
                navigate("/archieve");
              }}
              className="flex-1 py-2 bg-green-500 text-white rounded font-medium"
            >
              업적 페이지
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeSelector;
