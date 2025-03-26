// page/Ranking/RankingPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrophyCard from "./components/TrophyCard";
import RankingList from "./components/RankingList";
import Pagination from "./components/Pagination";
import { TimeFrame } from "../../types";
import { rankingApi, RankingUser } from "../../api/rankingApi";

// Import medal images
import goldTrophy from "../../assets/gold.png";
import silverTrophy from "../../assets/silver.png";
import bronzeTrophy from "../../assets/bronze.png";

const RankingPage: React.FC = () => {
  // 상태 관리
  const [rankings, setRankings] = useState<RankingUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [timeframe, setTimeframe] = useState<TimeFrame>("all"); // 나중에 필터 기능 추가될 경우 사용

  useEffect(() => {
    fetchRankings();
  }, [currentPage]);

  const fetchRankings = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await rankingApi.getRanking(currentPage);
      const data = response.data.data;

      // 랭킹 데이터 설정
      if (data && data.ranking) {
        setRankings(data.ranking);
        setTotalPages(data.totalPage || 1);
      }
    } catch (error) {
      console.error("랭킹 데이터 가져오기 실패:", error);
      // 에러 처리: 빈 배열 또는 에러 메시지 표시
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 현재는 TimeFrame을 사용하지 않지만, 미래에 필터 기능이 추가될 경우를 대비
  const handleTimeFrameChange = (frame: TimeFrame): void => {
    setTimeframe(frame);
    setCurrentPage(1); // 필터가 변경되면 1페이지로 돌아감
  };

  // 상위 3명의 랭킹 사용자를 가져오기
  const getTopUsers = () => {
    const topUsers = [...rankings].filter((user) => user.rank <= 3);
    // 랭킹 순서대로 정렬 (1등, 2등, 3등)
    return topUsers.sort((a, b) => a.rank - b.rank);
  };

  return (
    <div className="flex flex-col max-w-md min-h-screen bg-gray-50">
      {!isLoading && rankings.length >= 3 && (
        <div className="grid grid-cols-3 gap-2 p-4">
          {/* 2위 (왼쪽) */}
          <TrophyCard
            rank={2}
            trophyImage={silverTrophy}
            nickname={
              getTopUsers().find((user) => user.rank === 2)?.nickName || ""
            }
            profileImage={
              getTopUsers().find((user) => user.rank === 2)?.profileImage || ""
            }
          />

          {/* 1위 (중앙) */}
          <TrophyCard
            rank={1}
            trophyImage={goldTrophy}
            nickname={
              getTopUsers().find((user) => user.rank === 1)?.nickName || ""
            }
            profileImage={
              getTopUsers().find((user) => user.rank === 1)?.profileImage || ""
            }
          />

          {/* 3위 (오른쪽) */}
          <TrophyCard
            rank={3}
            trophyImage={bronzeTrophy}
            nickname={
              getTopUsers().find((user) => user.rank === 3)?.nickName || ""
            }
            profileImage={
              getTopUsers().find((user) => user.rank === 3)?.profileImage || ""
            }
          />
        </div>
      )}

      <div className="p-4 mt-2 bg-white rounded-lg mx-4 border border-gray-200 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">전체 참가자 랭킹</h2>

          {/* 필터 버튼들 - 아직 백엔드에서 지원하지 않지만, UI는 구현 */}
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => handleTimeFrameChange("today")}
              className={`px-3 py-1 text-sm rounded-full ${
                timeframe === "today"
                  ? "bg-pic-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              오늘
            </button>
            <button
              onClick={() => handleTimeFrameChange("week")}
              className={`px-3 py-1 text-sm rounded-full ${
                timeframe === "week"
                  ? "bg-pic-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              이번 주
            </button>
            <button
              onClick={() => handleTimeFrameChange("month")}
              className={`px-3 py-1 text-sm rounded-full ${
                timeframe === "month"
                  ? "bg-pic-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              이번 달
            </button>
            <button
              onClick={() => handleTimeFrameChange("all")}
              className={`px-3 py-1 text-sm rounded-full ${
                timeframe === "all"
                  ? "bg-pic-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              전체
            </button>
          </div>
        </div>

        <RankingList rankings={rankings} loading={isLoading} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </div>

      <footer className="p-4 mt-auto">
        <Link
          to="/time-attack"
          className="block bg-pic-primary text-white py-3 rounded-lg text-center font-bold hover:bg-green-600 transition"
        >
          타임어택 도전하기
        </Link>
      </footer>
    </div>
  );
};

export default RankingPage;
