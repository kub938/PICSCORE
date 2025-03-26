// page/Timeattack/TimeAttackResult.tsx
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTimeAttackStore } from "../../store/timeAttackStore";
import trophyVideo from "../../assets/trophy.mp4";

// 컴포넌트 임포트
import Container from "./components/Container";
import LoadingState from "./components/LoadingState";
import FailureResult from "./components/FailureResult";
import SuccessResult from "./components/SuccessResult";
import VideoAnimation from "./components/VideoAnimation";
import { LocationState } from "../../types";
import { TimeAttackResultData } from "../../types";
import { timeAttackApi } from "../../api/timeAttackApi";

const TimeAttackResult: React.FC = () => {
  const location = useLocation() as LocationState;
  const navigate = useNavigate();

  // Zustand 상태 사용
  const result = useTimeAttackStore((state) => state.result);

  const [localResult, setLocalResult] = useState<TimeAttackResultData | null>(
    null
  );
  const [showVideo, setShowVideo] = useState<boolean>(true);
  const [showXpGained, setShowXpGained] = useState<boolean>(false);
  const [showTotalXp, setShowTotalXp] = useState<boolean>(false);
  const [currentRanking, setCurrentRanking] = useState<number | null>(null);

  const videoTimerRef = useRef<number | null>(null);
  const xpGainedTimerRef = useRef<number | null>(null);
  const totalXpTimerRef = useRef<number | null>(null);

  // 랭킹 데이터 가져오기
  useEffect(() => {
    if (location.state?.result?.success === true) {
      // 랭킹 데이터 가져오기 (1페이지)
      timeAttackApi
        .getRanking(1)
        .then((response) => {
          const rankingData = response.data.data;
          if (rankingData && rankingData.ranking) {
            // 가져온 랭킹 중에서 현재 사용자의 위치 추정
            const userRank = Math.floor(Math.random() * 5) + 1; // 임시로 랜덤 순위 사용
            setCurrentRanking(userRank);
          }
        })
        .catch((error) => {
          console.error("랭킹 데이터 가져오기 실패:", error);
        });
    }
  }, [location]);

  useEffect(() => {
    // Check if we have result data passed through location state
    if (location.state?.result) {
      setLocalResult(location.state.result);

      // If it's a failure, don't show the success video
      if (location.state.result.success === false) {
        setShowVideo(false);
      }
    } else {
      // 만약 location.state에 결과가 없으면 Zustand에 저장된 결과 사용
      setLocalResult({
        score: result.score,
        topicAccuracy: result.topicAccuracy,
        analysisData: result.analysisData,
        image: result.image,
        topic: result.topic,
        ranking: currentRanking || result.ranking,
        xpEarned: 97, // 가정
        success: result.score > 0, // 점수가 있으면 성공으로 간주
      });
    }

    // Set timers for animations (only if it's a success)
    if (!location.state?.result || location.state.result.success !== false) {
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
    }

    // Clean up timers on component unmount
    return () => {
      if (videoTimerRef.current) clearTimeout(videoTimerRef.current);
      if (xpGainedTimerRef.current) clearTimeout(xpGainedTimerRef.current);
      if (totalXpTimerRef.current) clearTimeout(totalXpTimerRef.current);
    };
  }, [location, result, currentRanking]);

  // Handle video ended event (as a backup if setTimeout fails)
  const handleVideoEnded = () => {
    setShowVideo(false);
  };

  // 다시 도전하기 버튼 핸들러
  const handleTryAgain = () => {
    navigate("/time-attack");
  };

  if (!localResult) {
    return <LoadingState />;
  }

  // Failure screen
  if (localResult.success === false) {
    return (
      <Container>
        <FailureResult
          message={
            localResult.message || "제한 시간 내에 사진을 제출하지 못했습니다."
          }
          topic={localResult.topic}
          onTryAgain={handleTryAgain}
        />
      </Container>
    );
  }

  // Trophy video screen - for successful submissions
  if (showVideo) {
    return (
      <VideoAnimation
        videoSrc={trophyVideo}
        xpGained={localResult.xpEarned || 97}
        showXpGained={showXpGained}
        showTotalXp={showTotalXp}
        onVideoEnd={handleVideoEnded}
      />
    );
  }

  // Original detailed result view after video ends (for successful submissions)
  return (
    <Container>
      <main className="flex-1 p-4">
        {localResult.score &&
          localResult.topicAccuracy &&
          localResult.analysisData && (
            <SuccessResult
              score={localResult.score}
              topicAccuracy={localResult.topicAccuracy}
              analysisData={localResult.analysisData}
              image={localResult.image || null}
              topic={localResult.topic || ""}
              ranking={currentRanking || localResult.ranking || 0}
              onTryAgain={handleTryAgain}
            />
          )}
      </main>
    </Container>
  );
};

export default TimeAttackResult;
