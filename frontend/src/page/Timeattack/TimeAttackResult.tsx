import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
// import { timeAttackResultState } from '../../recoil/atoms';
import trophyVideo from "../../assets/trophy.mp4";

// 컴포넌트 임포트
import Container from "./components/Container";
import Header from "./components/Header";
import LoadingState from "./components/LoadingState";
import FailureResult from "./components/FailureResult";
import SuccessResult from "./components/SuccessResult";
import VideoAnimation from "./components/VideoAnimation";
import { LocationState } from "../../types";
import { TimeAttackResultData } from "../../types";

const TimeAttackResult: React.FC = () => {
  const location = useLocation() as LocationState;
  const [result, setResult] = useState<TimeAttackResultData | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(true);
  const [showXpGained, setShowXpGained] = useState<boolean>(false);
  const [showTotalXp, setShowTotalXp] = useState<boolean>(false);
  const videoTimerRef = useRef<number | null>(null);
  const xpGainedTimerRef = useRef<number | null>(null);
  const totalXpTimerRef = useRef<number | null>(null);

  // If using Recoil
  // const [timeAttackResult, setTimeAttackResult] = useRecoilState(timeAttackResultState);

  useEffect(() => {
    // Check if we have result data passed through location state
    if (location.state?.result) {
      setResult(location.state.result);

      // If it's a failure, don't show the success video
      if (location.state.result.success === false) {
        setShowVideo(false);
      }
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
        success: true,
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
  }, [location]);

  // Handle video ended event (as a backup if setTimeout fails)
  const handleVideoEnded = () => {
    setShowVideo(false);
  };

  if (!result) {
    return <LoadingState />;
  }

  // Failure screen
  if (result.success === false) {
    return (
      <Container>
        <Header title="타임어택 결과" />
        <FailureResult
          message={
            result.message || "제한 시간 내에 사진을 제출하지 못했습니다."
          }
          topic={result.topic}
        />
      </Container>
    );
  }

  // Trophy video screen - for successful submissions
  if (showVideo) {
    return (
      <VideoAnimation
        videoSrc={trophyVideo}
        xpGained={result.xpEarned || 97}
        showXpGained={showXpGained}
        showTotalXp={showTotalXp}
        onVideoEnd={handleVideoEnded}
      />
    );
  }

  // Original detailed result view after video ends (for successful submissions)
  return (
    <Container>
      <Header title="타임어택 결과" />
      <main className="flex-1 p-4">
        {result.score && result.topicAccuracy && result.analysisData && (
          <SuccessResult
            score={result.score}
            topicAccuracy={result.topicAccuracy}
            analysisData={result.analysisData}
            image={result.image || null}
            topic={result.topic || ""}
            ranking={result.ranking || 0}
          />
        )}
      </main>
    </Container>
  );
};

export default TimeAttackResult;
