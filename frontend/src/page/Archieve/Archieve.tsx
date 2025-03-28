import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { testApi } from "../../api/api";

// 컴포넌트 임포트
import BadgeGrid from "./components/BadgeGrid";
import ProgressBar from "./components/ProgressBar";
import CategoryTabs from "./components/CategoryTabs";

// 배지 타입 정의
interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  achieved: boolean;
  achievedDate?: string;
}

// API 응답 인터페이스
interface ApiBadge {
  badgeId: number;
  name: string;
  image: string;
  obtainCondition: string;
  obtain: boolean; // isObtain이 아닌 obtain 속성이 API에서 반환됨
}

// 기본 카테고리 정의
const defaultCategories = [
  { id: "all", name: "전체" },
  { id: "social", name: "소셜" },
  { id: "evaluation", name: "평가" },
  { id: "content", name: "게시글" },
  { id: "timeattack", name: "타임어택" },
  { id: "master", name: "마스터" },
];

// 카테고리별 배지 필터링 함수
const filterBadgesByCategory = (
  badges: Badge[],
  categoryId: string
): Badge[] => {
  if (categoryId === "all") return badges;

  // 카테고리별 키워드 정의
  const categoryKeywords: Record<string, string[]> = {
    social: ["팔로워", "크리에이터", "인기"],
    evaluation: ["평가", "사진", "품질"],
    content: ["게시글", "콘텐츠"],
    timeattack: ["타임어택", "챔피언"],
    master: ["마스터", "달성"],
  };

  // 키워드 기반 필터링
  return badges.filter((badge) => {
    const keywords = categoryKeywords[categoryId] || [];
    return keywords.some(
      (keyword) =>
        badge.name.includes(keyword) || badge.description.includes(keyword)
    );
  });
};

const AchievementPage: React.FC = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [filteredBadges, setFilteredBadges] = useState<Badge[]>([]);
  const [achievedCount, setAchievedCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState<boolean>(false);
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | undefined>(
    undefined
  );

  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = useAuthStore((state) => state.accessToken);

  // URL 상태 확인 - 선택 모드인지 체크
  useEffect(() => {
    if (location.state) {
      const { selectionMode, currentBadgeId } = location.state as {
        selectionMode?: boolean;
        currentBadgeId?: string;
      };

      if (selectionMode) {
        setSelectionMode(true);
        setSelectedBadgeId(currentBadgeId);
      }
    }
  }, [location]);

  // API에서 배지 정보 가져오기
  useEffect(() => {
    const fetchBadges = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 배지 목록 API 호출
        const response = await testApi.get("/api/v1/badge");
        console.log("배지 API 응답:", response.data);

        if (response.data?.data && Array.isArray(response.data.data)) {
          const apiBadges: ApiBadge[] = response.data.data;

          // 디버깅: 각 배지 정보 로그 출력 (특히 7번 배지 확인)
          apiBadges.forEach((badge: any) => {
            console.log(
              `배지 ID: ${badge.badgeId}, 이름: ${badge.name}, 달성 여부: ${badge.obtain}`
            );
            if (badge.badgeId === 7) {
              console.log("7번 배지(타임어택) 정보:", badge);
            }
          });

          // API 응답에서 배지 정보 변환
          const formattedBadges: Badge[] = apiBadges.map((badge: any) => {
            // obtain 속성을 사용해 달성 여부 확인 (API 응답에서는 isObtain이 아닌 obtain이 사용됨)
            const isAchieved = badge.obtain === true;

            const formattedBadge = {
              id: badge.badgeId.toString(),
              name: badge.name,
              description: badge.obtainCondition,
              image: badge.image,
              achieved: isAchieved,
              achievedDate: isAchieved
                ? new Date().toISOString().split("T")[0]
                : undefined,
            };

            // 7번 배지 디버깅
            if (badge.badgeId === 7) {
              console.log("변환된 7번 배지 정보:", formattedBadge);
            }

            return formattedBadge;
          });

          // 상태 업데이트
          setBadges(formattedBadges);
          setFilteredBadges(
            filterBadgesByCategory(formattedBadges, activeCategory)
          );

          // 달성 카운트 업데이트
          const achieved = formattedBadges.filter((b) => b.achieved).length;
          console.log(`총 ${formattedBadges.length}개 중 ${achieved}개 달성`);
          setAchievedCount(achieved);
          setTotalCount(formattedBadges.length);
        } else {
          setError("배지 데이터 형식이 올바르지 않습니다.");
        }
      } catch (err) {
        console.error("배지 API 호출 오류:", err);
        setError("배지 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBadges();
  }, [accessToken]);

  // 카테고리 변경 시 필터링
  useEffect(() => {
    setFilteredBadges(filterBadgesByCategory(badges, activeCategory));
  }, [activeCategory, badges]);

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  // 배지 선택 핸들러 (선택 모드일 때만 사용)
  const handleSelectBadge = (badge: Badge) => {
    if (!selectionMode || !badge.achieved) return;

    // 프로필에 표시할 뱃지 API 호출 (PATCH)
    const updateProfileBadge = async () => {
      try {
        const response = await testApi.patch("/api/v1/user/profile/badge", {
          badgeId: parseInt(badge.id),
        });

        if (response.status === 200) {
          // 선택 성공 시 프로필 페이지로 돌아감
          navigate("/profile", {
            state: {
              updatedProfile: {
                displayBadgeId: badge.id,
              },
            },
          });
        }
      } catch (error) {
        console.error("프로필 배지 업데이트 실패:", error);
        setError("배지 선택 중 오류가 발생했습니다.");
      }
    };

    updateProfileBadge();
  };

  // 뒤로가기 핸들러
  const handleGoBack = () => {
    navigate("/profile");
  };

  return (
    <div className="flex flex-col max-w-md mx-auto min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white p-4 flex items-center border-b">
        <button onClick={handleGoBack} className="p-1">
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
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold flex-1 text-center">
          {selectionMode ? "프로필 배지 선택" : "업적"}
        </h1>
        <div className="w-6"></div> {/* 균형을 위한 더미 요소 */}
      </div>

      <div className="p-4">
        {/* 업적 달성도 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="font-bold mb-2">업적 달성도</h2>
          <div className="flex justify-between mb-1">
            <span className="text-sm">{achievedCount}개 달성</span>
            <span className="text-sm">{totalCount}개 중</span>
          </div>
          <ProgressBar progress={(achievedCount / totalCount) * 100} />
        </div>

        {/* 카테고리 탭 */}
        <CategoryTabs
          categories={defaultCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* 로딩 상태 */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pic-primary"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center">
            {error}
          </div>
        ) : (
          <BadgeGrid
            badges={filteredBadges}
            isSelectable={selectionMode}
            selectedBadgeId={selectedBadgeId}
            onSelectBadge={handleSelectBadge}
          />
        )}

        {/* 선택 모드 가이드 (선택 모드일 때만 표시) */}
        {selectionMode && (
          <div className="mt-4 bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
            <p>달성한 배지를 선택하면 프로필에 표시됩니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementPage;
