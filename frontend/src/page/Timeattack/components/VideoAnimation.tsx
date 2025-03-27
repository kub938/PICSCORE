// page/Timeattack/components/VideoAnimation.tsx
import React, { useState, useEffect, useRef } from "react";

interface VideoAnimationProps {
  videoSrc: string;
  xpGained: number;
  showXpGained: boolean;
  showTotalXp: boolean;
  onVideoEnd: () => void;
}

const VideoAnimation: React.FC<VideoAnimationProps> = ({
  videoSrc,
  xpGained,
  showXpGained,
  showTotalXp,
  onVideoEnd,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [animateXp, setAnimateXp] = useState(false);

  // 비디오 종료 처리
  const handleVideoEnd = () => {
    setVideoEnded(true);
    setAnimateXp(true);

    // 비디오 종료 후 카운트다운 시작
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // 마지막에 onVideoEnd 콜백 실행
          setTimeout(() => {
            onVideoEnd();
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  };

  // 비디오 로드 오류 처리
  const handleVideoError = () => {
    console.error("비디오 로드 실패");
    onVideoEnd(); // 비디오 로드 실패시에도 다음 단계로 진행
  };

  // 비디오 스킵 처리
  const handleSkipVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onVideoEnd();
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black/90 z-50 flex items-center justify-center">
      {!videoEnded ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onError={handleVideoError}
          />
          <button
            onClick={handleSkipVideo}
            className="absolute bottom-10 right-10 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition z-10"
          >
            건너뛰기
          </button>
        </div>
      ) : (
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 text-center animate-fadeIn">
          <h2 className="text-3xl font-bold mb-6 text-white">축하합니다!</h2>

          {showXpGained && (
            <div
              className={`mb-6 transition-all duration-500 ${
                animateXp ? "scale-110" : "scale-100"
              }`}
            >
              <p className="text-xl text-green-300">경험치 획득!</p>
              <div className="flex items-center justify-center">
                <span className="text-5xl font-bold text-white">
                  +{xpGained}
                </span>
                <span className="text-xl text-white ml-1">XP</span>
              </div>
            </div>
          )}

          {showTotalXp && (
            <div className="mb-8">
              <p className="text-xl text-yellow-300">현재 총 경험치</p>
              <p className="text-4xl font-bold text-white">1,240 XP</p>
            </div>
          )}

          {countdown > 0 ? (
            <p className="text-gray-300 mt-6">
              {countdown}초 후 자동으로 넘어갑니다...
            </p>
          ) : (
            <p className="text-gray-300 mt-6">이동 중...</p>
          )}

          <button
            onClick={onVideoEnd}
            className="mt-4 bg-white/20 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition"
          >
            바로 이동하기
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoAnimation;
