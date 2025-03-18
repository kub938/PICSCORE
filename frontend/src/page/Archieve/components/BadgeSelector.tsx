import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../types";
import { achievementData } from "../achievementData";

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
  const [achievedBadges, setAchievedBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 획득한 뱃지 불러오기
    const fetchAchievedBadges = () => {
      setLoading(true);

      // 실제 구현에서는 API 호출을 사용할 것입니다.
      // const response = await axios.get('api/v1/bedge/achieved');

      // 목업 데이터 사용 - 모든 카테고리에서 달성한 뱃지 필터링
      setTimeout(() => {
        const allBadges =
          achievementData.find((cat) => cat.id === "all")?.badges || [];
        const achieved = allBadges.filter((badge) => badge.achieved);
        setAchievedBadges(achieved);
        setLoading(false);
      }, 300);
    };

    fetchAchievedBadges();
  }, []);

  const handleSelectBadge = (badge: Badge) => {
    onSelectBadge(badge);
    onClose();
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
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          ) : achievedBadges.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>획득한 뱃지가 없습니다</p>
              <button
                onClick={() => {
                  onClose();
                  // navigate("/archieve");
                }}
                className="mt-2 text-green-500 font-medium"
              >
                업적 도전하기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {achievedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-2 rounded-lg border cursor-pointer hover:bg-gray-50 transition flex flex-col items-center ${
                    currentBadge === badge.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleSelectBadge(badge)}
                >
                  <img
                    src={badge.image}
                    alt={badge.name}
                    className="w-12 h-12 object-contain mb-1"
                  />
                  <span className="text-xs text-center font-medium truncate w-full">
                    {badge.name}
                  </span>
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
                // navigate("/archieve");
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
