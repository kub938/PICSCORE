import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../UserPage/components/Header";
import CategoryTabs from "./components/CategoryTabs";
import BadgeGrid from "./components/BadgeGrid";
import ProgressBar from "./components/ProgressBar";
import { Badge, BadgeCategory } from "../../types";
import { achievementData } from "./achievementData";

const ArchievePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state를 통해 선택 모드인지 확인
  const isSelectionMode = location.state?.selectionMode === true;
  const currentBadgeId = location.state?.currentBadgeId;

  const [categories, setCategories] = useState<BadgeCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [achievedCount, setAchievedCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | undefined>(
    currentBadgeId
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    setLoading(true);
    try {
      // 실제 구현에서는 API 호출을 사용할 것입니다.
      // const response = await axios.get('api/v1/bedge');
      // setCategories(response.data);

      // 목업 데이터 사용
      setTimeout(() => {
        setCategories(achievementData);

        // 전체 뱃지 수와 달성한 뱃지 수 계산
        const allBadges =
          achievementData.find((cat) => cat.id === "all")?.badges || [];
        const achieved = allBadges.filter((badge) => badge.achieved).length;
        const total = allBadges.length;

        setAchievedCount(achieved);
        setTotalCount(total);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching badges:", error);
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  // 현재 선택된 카테고리의 뱃지 가져오기
  const getActiveBadges = (): Badge[] => {
    const category = categories.find((cat) => cat.id === activeCategory);
    return category ? category.badges : [];
  };

  // 뱃지 선택 처리
  const handleSelectBadge = (badge: Badge) => {
    setSelectedBadgeId(badge.id);
    setShowSuccessMessage(true);

    // 실제 구현에서는 API를 통해 선택한 뱃지 저장
    // axios.patch('api/v1/user/profile', { displayBadgeId: badge.id })
    //   .then(() => {
    //     setShowSuccessMessage(true);
    //     setTimeout(() => setShowSuccessMessage(false), 3000);
    //   })
    //   .catch((error) => {
    //     console.error("Error saving badge selection:", error);
    //   });

    // 3초 후 성공 메시지 숨기기
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  // 완료 버튼 클릭 시 마이페이지로 돌아가기
  const handleComplete = () => {
    // 실제 구현에서는 API를 통해 최종 저장 처리를 할 수 있음
    // axios.patch('api/v1/user/profile', { displayBadgeId: selectedBadgeId })
    //   .then(() => {
    //     navigate("/mypage");
    //   })
    //   .catch((error) => {
    //     console.error("Error saving badge:", error);
    //   });

    // 목업 환경에서는 state를 통해 데이터 전달
    navigate("/mypage", {
      state: {
        updatedProfile: { displayBadgeId: selectedBadgeId },
      },
    });
  };

  return (
    <div className="flex flex-col max-w-md mx-auto min-h-screen bg-gray-50">
      <Header title={isSelectionMode ? "프로필 뱃지 선택" : "업적"} />

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

        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <BadgeGrid
            badges={getActiveBadges()}
            isSelectable={isSelectionMode}
            selectedBadgeId={selectedBadgeId}
            onSelectBadge={handleSelectBadge}
          />
        )}

        {isSelectionMode && (
          <div className="mt-6">
            <button
              onClick={handleComplete}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
            >
              완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchievePage;
