import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { timeAttackApi } from "../../api/timeAttackApi";

// Import medal images
import goldTrophy from "../../assets/gold.png";
import silverTrophy from "../../assets/silver.png";
import bronzeTrophy from "../../assets/bronze.png";

// 랭킹 사용자 타입 정의
interface RankingUser {
  userId: number;
  nickName: string;
  profileImage: string;
  score: number;
  rank: number;
}

// 필터링 기간 타입
type TimeFrame = "today" | "week" | "month" | "all";

const RankingPage: React.FC = () => {
  // 상태 관리
  const [rankings, setRankings] = useState<RankingUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [timeframe, setTimeframe] = useState<TimeFrame>("all");
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // API 요청 중복 방지를 위한 ref
  const isRequestPending = useRef(false);

  // 랭킹 데이터 불러오기
  useEffect(() => {
    const fetchRankings = async () => {
      // 이미 요청 중이면 중복 요청 방지
      if (isRequestPending.current) return;

      isRequestPending.current = true;
      setIsLoading(true);
      setError(null);

      try {
        console.log(`Fetching rankings for page ${currentPage}`);
        const response = await timeAttackApi.getRanking(currentPage);

        const responseData = response.data;

        if (responseData && responseData.data) {
          const data = responseData.data;

          if (data.ranking && Array.isArray(data.ranking)) {
            setRankings(data.ranking);
            setTotalPages(data.totalPage || 1);
          } else {
            console.error("Invalid ranking data:", data);
            setRankings([]);
            setError("랭킹 데이터가 올바른 형식이 아닙니다.");
          }
        } else {
          console.error("Invalid API response format:", responseData);
          setRankings([]);
          setError("서버 응답 형식이 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("Error fetching rankings:", error);
        setRankings([]);
        setError("랭킹 데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
        isRequestPending.current = false;
      }
    };

    if (isLoggedIn) {
      fetchRankings();
    } else {
      setIsLoading(false);
      setError("로그인이 필요한 서비스입니다.");
    }
  }, [currentPage, isLoggedIn]); // timeframe은 백엔드에서 아직 지원 안 함

  // 페이지 이동 핸들러
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 타임프레임 변경 핸들러 (백엔드 지원 시 활성화)
  const handleTimeFrameChange = (frame: TimeFrame) => {
    // 현재는 백엔드에서 지원하지 않으므로 UI만 변경
    setTimeframe(frame);
    //setCurrentPage(1); // 필터 변경 시 첫 페이지로 리셋
  };

  // 상위 3명 추출
  const getTopThreeUsers = () => {
    if (rankings.length === 0) return [];

    // 깊은 복사를 통해 원본 배열 유지
    const topUsers = [...rankings]
      .filter((user) => user.rank <= 3)
      .sort((a, b) => a.rank - b.rank);

    return topUsers;
  };

  // 트로피 카드 컴포넌트
  const TrophyCard = ({
    user,
    rank,
    trophyImage,
  }: {
    user?: RankingUser;
    rank: number;
    trophyImage: string;
  }) => {
    if (!user) {
      return (
        <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg bg-white shadow-sm opacity-50">
          <div className="mb-4">
            <img
              src={trophyImage}
              alt={`${rank}등 트로피`}
              className="w-16 h-20 object-contain"
            />
            <div className="text-center font-bold mt-1 text-xl">{rank}</div>
          </div>
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="#AAAAAA"
              stroke="#AAAAAA"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="text-center mt-2 font-medium text-gray-400">없음</div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
        <div className="mb-4">
          <img
            src={trophyImage}
            alt={`${rank}등 트로피`}
            className="w-16 h-20 object-contain"
          />
          <div className="text-center font-bold mt-1 text-xl">{rank}</div>
        </div>
        <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={`${user.nickName} 프로필`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/default-profile.jpg"; // 로드 실패 시 기본 이미지
              }}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="#AAAAAA"
              stroke="#AAAAAA"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          )}
        </div>
        <div className="text-center mt-2 font-medium">{user.nickName}</div>
      </div>
    );
  };

  // 랭킹 아이템 컴포넌트
  const RankingItem = ({ user }: { user: RankingUser }) => (
    <li className="border-b border-gray-100 py-4 grid grid-cols-3 items-center">
      <div className="text-center text-xl font-bold">{user.rank}</div>
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center mr-2">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={`${user.nickName} 프로필`}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/default-profile.jpg"; // 로드 실패 시 기본 이미지
              }}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#AAAAAA"
              stroke="#AAAAAA"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          )}
        </div>
        <span className="truncate max-w-[100px]">{user.nickName}</span>
      </div>
      <div className="text-center font-bold text-xl">
        {typeof user.score === "number" ? user.score.toFixed(1) : user.score}
      </div>
    </li>
  );

  // 페이지네이션 컴포넌트
  const Pagination = () => (
    <div className="flex justify-between items-center p-4 mt-4">
      <button
        onClick={handlePrevPage}
        className={`px-6 py-2 ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-black cursor-pointer"
        }`}
        disabled={currentPage === 1 || isLoading}
      >
        이전
      </button>

      <div className="w-10 h-10 rounded-full bg-pic-primary flex items-center justify-center text-white font-bold">
        {currentPage}
      </div>

      <button
        onClick={handleNextPage}
        className={`px-6 py-2 ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-black cursor-pointer"
        }`}
        disabled={currentPage === totalPages || isLoading}
      >
        다음
      </button>
    </div>
  );

  // 상위 3명 데이터 가져오기
  const topThree = getTopThreeUsers();
  const firstPlace = topThree.find((user) => user.rank === 1);
  const secondPlace = topThree.find((user) => user.rank === 2);
  const thirdPlace = topThree.find((user) => user.rank === 3);

  return (
    <div className="flex flex-col w-full max-w-md min-h-screen bg-gray-50">
      {/* TOP 3 섹션 - 로딩 중이 아닐 때만 표시 */}
      {!isLoading && (
        <div className="grid grid-cols-3 gap-2 p-4">
          {/* 2등 */}
          <TrophyCard user={secondPlace} rank={2} trophyImage={silverTrophy} />

          {/* 1등 */}
          <TrophyCard user={firstPlace} rank={1} trophyImage={goldTrophy} />

          {/* 3등 */}
          <TrophyCard user={thirdPlace} rank={3} trophyImage={bronzeTrophy} />
        </div>
      )}

      {/* 랭킹 목록 섹션 */}
      <div className="p-4 mt-2 bg-white rounded-lg mx-4 border border-gray-200 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">전체 참가자 랭킹</h2>

          {/* 필터 버튼들 - 아직 백엔드에서 지원하지 않지만 UI 구현 */}
          <div className="flex space-x-2 mb-4 overflow-x-auto">
            <button
              onClick={() => handleTimeFrameChange("today")}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                timeframe === "today"
                  ? "bg-pic-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              오늘
            </button>
            <button
              onClick={() => handleTimeFrameChange("week")}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                timeframe === "week"
                  ? "bg-pic-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              이번 주
            </button>
            <button
              onClick={() => handleTimeFrameChange("month")}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                timeframe === "month"
                  ? "bg-pic-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              이번 달
            </button>
            <button
              onClick={() => handleTimeFrameChange("all")}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                timeframe === "all"
                  ? "bg-pic-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              전체
            </button>
          </div>
        </div>

        {/* 랭킹 테이블 헤더 */}
        <div className="bg-gray-100 p-3 grid grid-cols-3 text-center font-medium">
          <div>순위</div>
          <div>닉네임</div>
          <div>점수</div>
        </div>

        {/* 로딩 상태 */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pic-primary"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : rankings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            랭킹 정보가 없습니다
          </div>
        ) : (
          /* 랭킹 목록 */
          <ul>
            {rankings.map((user) => (
              <RankingItem key={user.userId} user={user} />
            ))}
          </ul>
        )}

        {/* 페이지네이션 - 로딩 중이 아니고 데이터가 있을 때만 표시 */}
        {!isLoading && rankings.length > 0 && <Pagination />}
      </div>

      {/* 타임어택 버튼 */}
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
