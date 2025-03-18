import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// import { timeAttackResultState } from '../recoil/atoms';
// 상대 경로로 수정 - 정확한 경로에 맞게 조정 필요
import trophyVideo from "../../assets/trophy.mp4";

// Types
interface AnalysisData {
  composition: number;
  lighting: number;
  subject: number;
  color: number;
  creativity: number;
}

interface TimeAttackResultData {
  score: number;
  topicAccuracy: number;
  analysisData: AnalysisData;
  image: string | null;
  topic: string;
  ranking: number;
  success?: boolean;
  message?: string;
  xpEarned?: number;
}

interface LocationState {
  state: {
    result?: TimeAttackResultData;
  };
}

const TimeAttackResult: React.FC = () => {
  const location = useLocation() as LocationState;
  const navigate = useNavigate();
  const [result, setResult] = useState<TimeAttackResultData | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(true);
  const [showXpGained, setShowXpGained] = useState<boolean>(false);
  const [showTotalXp, setShowTotalXp] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoTimerRef = useRef<number | null>(null);
  const xpGainedTimerRef = useRef<number | null>(null);
  const totalXpTimerRef = useRef<number | null>(null);

  // If using Recoil
  // const [timeAttackResult, setTimeAttackResult] = useRecoilState(timeAttackResultState);

  useEffect(() => {
    // Check if we have result data passed through location state
    if (location.state?.result) {
      setResult(location.state.result);
    } else {
      // If not, we might want to fetch it or redirect back to the time attack page
      // For demo purposes, we'll use mock data
      setResult({
        score: 85,
        topicAccuracy: 92,
        analysisData: {
          composition: 88,
          lighting: 82,
          subject: 90,
          color: 84,
          creativity: 87,
        },
        image: null,
        topic: "다람쥐",
        ranking: 5,
        xpEarned: 97,
      });
    }

    // Set timers for animations
    // 1.5 seconds after video starts, show the XP gained
    xpGainedTimerRef.current = window.setTimeout(() => {
      setShowXpGained(true);
    }, 1500);

    // 3 seconds after video starts, show total XP
    totalXpTimerRef.current = window.setTimeout(() => {
      setShowTotalXp(true);
    }, 3000);

    // 5 seconds after video starts, transition to result screen
    videoTimerRef.current = window.setTimeout(() => {
      setShowVideo(false);
    }, 5000);

    // Clean up timers on component unmount
    return () => {
      if (videoTimerRef.current) clearTimeout(videoTimerRef.current);
      if (xpGainedTimerRef.current) clearTimeout(xpGainedTimerRef.current);
      if (totalXpTimerRef.current) clearTimeout(totalXpTimerRef.current);
    };
  }, [location]);

  // Handle video ended event (as a backup if setTimeout fails)
  const handleVideoEnded = () => {
    setShowVideo(false);
  };

  if (!result) {
    return (
      <div className="flex flex-col max-w-md mx-auto min-h-screen bg-gray-50 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        <p className="mt-4 text-gray-600">결과를 불러오는 중...</p>
      </div>
    );
  }

  // Trophy video screen
  if (showVideo) {
    return (
      <div className="flex flex-col max-w-md mx-auto min-h-screen bg-black relative overflow-hidden">
        {/* Video */}
        <div className="flex-1 flex items-center justify-center">
          <video
            ref={videoRef}
            src={trophyVideo}
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            onError={() => setShowVideo(false)} // Fallback in case video fails to load
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* XP Display with animations */}
        <div className="absolute top-35 left-0 right-0 flex flex-col items-center">
          {/* Total XP - shows 3 seconds after video starts */}
          {showTotalXp && (
            <div className="text-6xl font-bold text-green-400 mb-2 animate-fadeIn">
              289 XP
            </div>
          )}

          {/* XP Gained - shows 1.5 seconds after video starts */}
          {showXpGained && (
            <div className="text-xl font-bold text-green-400 animate-fadeIn">
              +{result.xpEarned || 97} XP 획득!
            </div>
          )}
        </div>
      </div>
    );
  }

  // Original detailed result view after video ends
  return (
    <div className="flex flex-col max-w-md mx-auto min-h-screen bg-gray-50">
      <header className="flex items-center p-4 border-b">
        <Link to="/" className="p-2">
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
        </Link>
        <h1 className="mx-auto text-xl font-logo">타임어택 결과</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-xl font-bold text-center mb-2">분석 결과</h2>

          <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg mb-4 overflow-hidden">
            {result.image && (
              <img
                src={result.image}
                alt="Uploaded"
                className="object-cover w-full h-full"
              />
            )}
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-600">주제</p>
              <p className="text-xl font-bold">{result.topic}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">주제 정확도</p>
              <p className="text-xl font-bold text-green-500">
                {result.topicAccuracy}%
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-bold">총점</p>
              <p className="text-2xl font-bold text-green-500">
                {result.score}
              </p>
            </div>

            <div className="h-2 bg-gray-300 rounded-full mb-4">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${result.score}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">구도</p>
                <div className="flex items-center">
                  <div
                    className="h-1 bg-green-500 rounded-full"
                    style={{ width: `${result.analysisData.composition}%` }}
                  ></div>
                  <p className="ml-2">{result.analysisData.composition}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm">조명</p>
                <div className="flex items-center">
                  <div
                    className="h-1 bg-green-500 rounded-full"
                    style={{ width: `${result.analysisData.lighting}%` }}
                  ></div>
                  <p className="ml-2">{result.analysisData.lighting}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm">주제</p>
                <div className="flex items-center">
                  <div
                    className="h-1 bg-green-500 rounded-full"
                    style={{ width: `${result.analysisData.subject}%` }}
                  ></div>
                  <p className="ml-2">{result.analysisData.subject}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm">색상</p>
                <div className="flex items-center">
                  <div
                    className="h-1 bg-green-500 rounded-full"
                    style={{ width: `${result.analysisData.color}%` }}
                  ></div>
                  <p className="ml-2">{result.analysisData.color}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <p className="font-bold text-yellow-800 mb-1">현재 랭킹</p>
            <p className="text-3xl font-bold text-yellow-800">
              {result.ranking}위
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => navigate("/time-attack")}
              className="flex-1 bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
            >
              다시 도전
            </button>
            <button
              onClick={() => navigate("/ranking")}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition"
            >
              랭킹 보기
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-bold mb-4">피드백</h2>
          <div className="space-y-2">
            <p>• 주제에 맞는 사진을 잘 촬영했습니다.</p>
            <p>• 조명이 조금 더 밝으면 좋을 것 같습니다.</p>
            <p>• 구도가 잘 잡혀있어 시각적으로 매력적입니다.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TimeAttackResult;
