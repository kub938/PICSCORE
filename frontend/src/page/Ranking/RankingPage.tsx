import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import TrophyCard from "./components/TrophyCard";
import RankingList from "./components/RankingList";
import Pagination from "./components/Pagination";
import { RankingUser, TimeFrame } from "../../types";

// Import medal images
import goldTrophy from "../../assets/gold.png";
import silverTrophy from "../../assets/silver.png";
import bronzeTrophy from "../../assets/bronze.png";

const RankingPage: React.FC = () => {
  const [rankings, setRankings] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("today");

  useEffect(() => {
    fetchRankings();
  }, [currentPage, timeFrame]);

  const fetchRankings = async (): Promise<void> => {
    setLoading(true);
    try {
      // In a real implementation, this would be an API call
      // const response = await axios.get(`api/v1/activity/time-attack?page=${currentPage}&timeframe=${timeFrame}`);
      // setRankings(response.data.rankings);
      // setTotalPages(response.data.totalPages);

      // Mock data for demonstration
      setTimeout(() => {
        const mockRankings: RankingUser[] = [
          {
            rank: 1,
            userId: "user123",
            nickname: "선진",
            profileImage: null,
            score: 285,
          },
          {
            rank: 2,
            userId: "user456",
            nickname: "전진",
            profileImage: null,
            score: 284,
          },
          {
            rank: 3,
            userId: "user789",
            nickname: "선신",
            profileImage: null,
            score: 284,
          },
          {
            rank: 4,
            userId: "user101",
            nickname: "신진",
            profileImage: null,
            score: 273,
          },
          {
            rank: 5,
            userId: "user202",
            nickname: "신신",
            profileImage: null,
            score: 272,
          },
        ];
        setRankings(mockRankings);
        setTotalPages(5);
        setLoading(false);
      }, 800); // Simulate network delay
    } catch (error) {
      console.error("Error fetching rankings:", error);
      setLoading(false);
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

  const handleTimeFrameChange = (frame: TimeFrame): void => {
    setTimeFrame(frame);
    setCurrentPage(1); // Reset to page 1 when changing time frame
  };

  return (
    <div className="flex flex-col max-w-md  min-h-screen bg-gray-50">
      {!loading && rankings.length >= 3 && (
        <div className="grid grid-cols-3 gap-2 p-4">
          <TrophyCard
            rank={2}
            trophyImage={silverTrophy}
            nickname={rankings.find((user) => user.rank === 2)?.nickname || ""}
          />
          <TrophyCard
            rank={1}
            trophyImage={goldTrophy}
            nickname={rankings.find((user) => user.rank === 1)?.nickname || ""}
          />
          <TrophyCard
            rank={3}
            trophyImage={bronzeTrophy}
            nickname={rankings.find((user) => user.rank === 3)?.nickname || ""}
          />
        </div>
      )}

      <div className="p-4 mt-2 bg-white rounded-lg mx-4 border border-gray-200 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">전체 참가자 랭킹</h2>

          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => handleTimeFrameChange("today")}
              className={`px-3 py-1 text-sm rounded-full ${
                timeFrame === "today"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              오늘
            </button>
            <button
              onClick={() => handleTimeFrameChange("week")}
              className={`px-3 py-1 text-sm rounded-full ${
                timeFrame === "week"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              이번 주
            </button>
            <button
              onClick={() => handleTimeFrameChange("month")}
              className={`px-3 py-1 text-sm rounded-full ${
                timeFrame === "month"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              이번 달
            </button>
            <button
              onClick={() => handleTimeFrameChange("all")}
              className={`px-3 py-1 text-sm rounded-full ${
                timeFrame === "all"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              전체
            </button>
          </div>
        </div>

        <RankingList rankings={rankings} loading={loading} />

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
          className="block bg-green-500 text-white py-3 rounded-lg text-center font-bold hover:bg-green-600 transition"
        >
          타임어택 도전하기
        </Link>
      </footer>
    </div>
  );
};

export default RankingPage;
