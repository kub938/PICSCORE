import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../UserPage/components/Header";
import CategoryTabs from "./components/CategoryTabs";
import BadgeGrid from "./components/BadgeGrid";
import ProgressBar from "./components/ProgressBar";
import { Badge, BadgeCategory } from "./types";

const ArchievePage: React.FC = () => {
  const [categories, setCategories] = useState<BadgeCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [achievedCount, setAchievedCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    setLoading(true);
    try {
      // 실제 구현에서는 API 호출을 사용할 것입니다.
      // const response = await axios.get('api/v1/bedge');
      // setCategories(response.data);

      // 목업 데이터
      setTimeout(() => {
        const mockCategories: BadgeCategory[] = [
          {
            id: "all",
            name: "전체",
            badges: [
              {
                id: "first_photo",
                name: "첫 사진",
                description: "첫 번째 사진을 업로드하고 평가 받았습니다.",
                image: "/badges/first_photo.png",
                achieved: true,
                achievedDate: "2024.03.05",
              },
              {
                id: "timeattack_master",
                name: "타임어택 마스터",
                description: "타임어택에서 5번 연속 80점 이상을 기록했습니다.",
                image: "/badges/timeattack_master.png",
                achieved: false,
                progress: 3,
                maxProgress: 5,
              },
              {
                id: "follower_100",
                name: "인플루언서",
                description: "100명 이상의 팔로워를 달성했습니다.",
                image: "/badges/influencer.png",
                achieved: true,
                achievedDate: "2024.03.10",
              },
              {
                id: "photo_score_90",
                name: "프로 사진작가",
                description: "90점 이상의 사진을 업로드했습니다.",
                image: "/badges/pro_photographer.png",
                achieved: false,
                progress: 85,
                maxProgress: 90,
              },
              {
                id: "daily_login_30",
                name: "출석왕",
                description: "30일 연속으로 앱에 접속했습니다.",
                image: "/badges/attendance.png",
                achieved: false,
                progress: 22,
                maxProgress: 30,
              },
              {
                id: "photo_100",
                name: "다작 작가",
                description: "100장 이상의 사진을 업로드했습니다.",
                image: "/badges/prolific_author.png",
                achieved: false,
                progress: 67,
                maxProgress: 100,
              },
            ],
          },
          {
            id: "activity",
            name: "활동",
            badges: [
              {
                id: "first_photo",
                name: "첫 사진",
                description: "첫 번째 사진을 업로드하고 평가 받았습니다.",
                image: "/badges/first_photo.png",
                achieved: true,
                achievedDate: "2024.03.05",
              },
              {
                id: "daily_login_30",
                name: "출석왕",
                description: "30일 연속으로 앱에 접속했습니다.",
                image: "/badges/attendance.png",
                achieved: false,
                progress: 22,
                maxProgress: 30,
              },
              {
                id: "photo_100",
                name: "다작 작가",
                description: "100장 이상의 사진을 업로드했습니다.",
                image: "/badges/prolific_author.png",
                achieved: false,
                progress: 67,
                maxProgress: 100,
              },
            ],
          },
          {
            id: "timeattack",
            name: "타임어택",
            badges: [
              {
                id: "timeattack_master",
                name: "타임어택 마스터",
                description: "타임어택에서 5번 연속 80점 이상을 기록했습니다.",
                image: "/badges/timeattack_master.png",
                achieved: false,
                progress: 3,
                maxProgress: 5,
              },
              {
                id: "timeattack_winner",
                name: "타임어택 우승자",
                description: "타임어택에서 1위를 달성했습니다.",
                image: "/badges/timeattack_winner.png",
                achieved: true,
                achievedDate: "2024.03.15",
              },
            ],
          },
          {
            id: "photo",
            name: "사진",
            badges: [
              {
                id: "photo_score_90",
                name: "프로 사진작가",
                description: "90점 이상의 사진을 업로드했습니다.",
                image: "/badges/pro_photographer.png",
                achieved: false,
                progress: 85,
                maxProgress: 90,
              },
              {
                id: "photo_100",
                name: "다작 작가",
                description: "100장 이상의 사진을 업로드했습니다.",
                image: "/badges/prolific_author.png",
                achieved: false,
                progress: 67,
                maxProgress: 100,
              },
              {
                id: "first_photo",
                name: "첫 사진",
                description: "첫 번째 사진을 업로드하고 평가 받았습니다.",
                image: "/badges/first_photo.png",
                achieved: true,
                achievedDate: "2024.03.05",
              },
            ],
          },
          {
            id: "social",
            name: "소셜",
            badges: [
              {
                id: "follower_100",
                name: "인플루언서",
                description: "100명 이상의 팔로워를 달성했습니다.",
                image: "/badges/influencer.png",
                achieved: true,
                achievedDate: "2024.03.10",
              },
            ],
          },
        ];
        setCategories(mockCategories);

        // 전체 뱃지 수와 달성한 뱃지 수 계산
        const allBadges =
          mockCategories.find((cat) => cat.id === "all")?.badges || [];
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

  return (
    <div className="flex flex-col max-w-md mx-auto min-h-screen bg-gray-50">
      <Header title="업적" />

      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="font-bold mb-2">업적 달성도</h2>
          <div className="flex justify-between mb-1">
            <span className="text-sm">{achievedCount}개 달성</span>
            <span className="text-sm">{totalCount}개 중</span>
          </div>
          <ProgressBar progress={(achievedCount / totalCount) * 100} />
        </div>

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
          <BadgeGrid badges={getActiveBadges()} />
        )}
      </div>
    </div>
  );
};

export default ArchievePage;
