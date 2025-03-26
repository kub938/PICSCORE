import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BadgeGrid from "./components/BadgeGrid";
import ProgressBar from "./components/ProgressBar";
import { Badge, BadgeCategory } from "../../types";
import { useAllBadges, useSetDisplayBadge } from "../../hooks/useBadge";

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

const ArchievePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state를 통해 선택 모드인지 확인
  const isSelectionMode = location.state?.selectionMode === true;
  const currentBadgeId = location.state?.currentBadgeId;

  const [allBadges, setAllBadges] = useState<Badge[]>([]);
  const [achievedCount, setAchievedCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | undefined>(
    currentBadgeId
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  // API 호출을 통한 뱃지 데이터 가져오기
  const { data, isLoading, error } = useAllBadges();
  const setDisplayBadgeMutation = useSetDisplayBadge();

  // 뱃지 데이터 변환
  useEffect(() => {
    if (data?.data?.data) {
      const badgeData = data.data.data;

      // API 응답을 Badge 타입으로 변환
      const badges: Badge[] = badgeData.map((item: BadgeResponseData) => ({
        id: item.badgeId.toString(),
        name: item.name,
        description: item.obtainCondition,
        image: item.image,
        achieved: item.isObtain,
      }));

      setAllBadges(badges);

      // 달성 통계 업데이트
      const achieved = badges.filter((badge) => badge.achieved).length;
      const total = badges.length;

      setAchievedCount(achieved);
      setTotalCount(total);
    }
  }, [data]);

  // 뱃지 선택 처리
  const handleSelectBadge = (badge: Badge) => {
    if (!badge.achieved) return; // 달성하지 못한 뱃지는 선택할 수 없음

    setSelectedBadgeId(badge.id);
    setShowSuccessMessage(true);

    // 성공 메시지 표시 타이머
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  // 완료 버튼 클릭 시 마이페이지로 돌아가기
  const handleComplete = () => {
    if (selectedBadgeId) {
      // API를 통해 뱃지 설정
      setDisplayBadgeMutation.mutate(parseInt(selectedBadgeId), {
        onSuccess: () => {
          // 마이페이지로 이동
          navigate("/mypage", {
            state: {
              updatedProfile: { displayBadgeId: selectedBadgeId },
            },
          });
        },
        onError: (error) => {
          console.error("뱃지 설정 오류:", error);
        },
      });
    } else {
      navigate("/mypage");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col max-w-md mx-auto min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col max-w-md mx-auto min-h-screen bg-gray-50">
        <div className="p-4 text-center text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-md mx-auto min-h-screen bg-gray-50">
      {/* 성공 메시지 */}
      {showSuccessMessage && (
        <div className="fixed top-16 left-0 right-0 mx-auto max-w-md bg-green-500 text-white py-2 px-4 text-center z-50 animate-fadeIn">
          뱃지가 선택되었습니다!
        </div>
      )}

      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="font-bold mb-2">업적 달성도</h2>
          <div className="flex justify-between mb-1">
            <span className="text-sm">{achievedCount}개 달성</span>
            <span className="text-sm">{totalCount}개 중</span>
          </div>
          <ProgressBar progress={(achievedCount / totalCount) * 100} />
        </div>

        {isSelectionMode && (
          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <p className="text-yellow-800 text-sm">
              프로필에 표시할 뱃지를 선택해주세요. 달성한 뱃지만 선택할 수
              있습니다.
            </p>
          </div>
        )}

        <BadgeGrid
          badges={allBadges}
          isSelectable={isSelectionMode}
          selectedBadgeId={selectedBadgeId}
          onSelectBadge={handleSelectBadge}
        />

        {isSelectionMode && (
          <div className="mt-6">
            <button
              onClick={handleComplete}
              className={`w-full py-3 rounded-lg font-bold ${
                setDisplayBadgeMutation.isPending
                  ? "bg-gray-400 text-white"
                  : "bg-green-500 text-white hover:bg-green-600"
              } transition`}
              disabled={setDisplayBadgeMutation.isPending}
            >
              {setDisplayBadgeMutation.isPending ? "처리 중..." : "완료"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchievePage;
