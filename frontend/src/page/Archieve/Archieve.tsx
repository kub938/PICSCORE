import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";

// 컴포넌트 임포트
import BadgeGrid from "./components/BadgeGrid";
import ProgressBar from "./components/ProgressBar";
import CategoryTabs from "./components/CategoryTabs";

// 뱃지 이미지 가져오기
import badge1 from "../../assets/badge1.png";
import badge2 from "../../assets/badge2.png";
import badge3 from "../../assets/badge3.png";
import badge4 from "../../assets/badge4.png";
import badge5 from "../../assets/badge5.png";
import badge6 from "../../assets/badge6.png";
import badge7 from "../../assets/badge7.png";
import badge8 from "../../assets/badge8.png";
import badge9 from "../../assets/badge9.png";
import badge10 from "../../assets/badge10.png";
import badge11 from "../../assets/badge11.png";
import badge12 from "../../assets/badge12.png";

// 배지 타입 정의
interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  achieved: boolean;
  achievedDate?: string;
}

// 카테고리 타입 정의
interface BadgeCategory {
  id: string;
  name: string;
  badges: Badge[];
}

// API 응답 인터페이스
interface BadgeApiResponse {
  badgeId: number;
  name: string;
  image: string;
  obtainCondition: string;
  isObtain: boolean;
}

// 하드코딩된 배지 데이터
const staticBadges: Badge[] = [
  {
    id: "1",
    name: "첫 팔로워",
    description: "첫 번째 팔로워를 얻었습니다.",
    image: badge1,
    achieved: false,
  },
  {
    id: "2",
    name: "인기 크리에이터",
    description: "30명 이상의 팔로워를 달성했습니다.",
    image: badge2,
    achieved: false,
  },
  {
    id: "3",
    name: "첫 사진 평가",
    description: "첫 번째 사진 평가를 완료했습니다.",
    image: badge3,
    achieved: false,
  },
  {
    id: "4",
    name: "평가 마스터",
    description: "30회 이상의 사진 평가를 완료했습니다.",
    image: badge4,
    achieved: false,
  },
  {
    id: "5",
    name: "첫 게시글",
    description: "첫 번째 게시글을 작성했습니다.",
    image: badge5,
    achieved: false,
  },
  {
    id: "6",
    name: "콘텐츠 크리에이터",
    description: "20개 이상의 게시글을 작성했습니다.",
    image: badge6,
    achieved: false,
  },
  {
    id: "7",
    name: "첫 타임어택",
    description: "첫 번째 타임어택에 참여했습니다.",
    image: badge7,
    achieved: false,
  },
  {
    id: "8",
    name: "타임어택 중독자",
    description: "20회 이상의 타임어택에 참여했습니다.",
    image: badge8,
    achieved: false,
  },
  {
    id: "9",
    name: "고품질 사진작가",
    description: "사진 평가에서 77점 이상을 달성했습니다.",
    image: badge9,
    achieved: false,
  },
  {
    id: "10",
    name: "타임어택 챔피언",
    description: "타임어택에서 1위를 달성했습니다.",
    image: badge10,
    achieved: false,
  },
  {
    id: "11",
    name: "인기 콘텐츠",
    description: "게시글이 좋아요 10개를 달성했습니다.",
    image: badge11,
    achieved: false,
  },
  {
    id: "12",
    name: "업적 마스터",
    description: "모든 업적을 달성했습니다.",
    image: badge12,
    achieved: false,
  },
];

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
  const [badges, setBadges] = useState<Badge[]>(staticBadges);
  const [filteredBadges, setFilteredBadges] = useState<Badge[]>(staticBadges);
  const [achievedCount, setAchievedCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(staticBadges.length);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);

  // API에서 달성 상태 가져오기
  useEffect(() => {
    const fetchAchievements = async () => {
      setIsLoading(true);

      // 기본적으로 모든 배지 표시 (미달성 상태로)
      let updatedBadges = [...staticBadges];

      // API 호출 시도 (토큰이 있는 경우)
      if (accessToken) {
        try {
          const response = await axios.get(
            "https://j12b104.p.ssafy.io/api/v1/badge",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          console.log("API 응답:", response.data);

          // 응답에서 달성 정보 있으면 업데이트
          if (response.data?.data && Array.isArray(response.data.data)) {
            const achievements = response.data.data;

            for (const achievement of achievements) {
              const id = achievement.badgeId.toString();
              const badgeIndex = updatedBadges.findIndex((b) => b.id === id);

              if (badgeIndex !== -1 && achievement.isObtain) {
                updatedBadges[badgeIndex].achieved = true;
                updatedBadges[badgeIndex].achievedDate = new Date()
                  .toISOString()
                  .split("T")[0];
              }
            }
          }
        } catch (err) {
          console.error("API 호출 오류:", err);
          // API 호출 실패해도 기본 배지는 계속 표시
        }
      }

      // 상태 업데이트
      setBadges(updatedBadges);
      setFilteredBadges(filterBadgesByCategory(updatedBadges, activeCategory));

      // 달성 카운트 업데이트
      const achieved = updatedBadges.filter((b) => b.achieved).length;
      setAchievedCount(achieved);

      setIsLoading(false);
    };

    fetchAchievements();
  }, [accessToken]);

  // 카테고리 변경 시 필터링
  useEffect(() => {
    setFilteredBadges(filterBadgesByCategory(badges, activeCategory));
  }, [activeCategory, badges]);

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  // 뒤로가기 핸들러
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col max-w-md mx-auto min-h-screen bg-gray-50">
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
          <BadgeGrid badges={filteredBadges} />
        )}
      </div>
    </div>
  );
};

export default AchievementPage;
