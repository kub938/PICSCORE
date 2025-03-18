import React, { useRef } from "react";

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

  return (
    <div className="flex flex-col max-w-md mx-auto min-h-screen bg-black relative overflow-hidden border-x border-gray-200">
      {/* Video */}
      <div className="flex-1 flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          onEnded={onVideoEnd}
          onError={onVideoEnd} // Fallback in case video fails to load
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
            +{xpGained} XP 획득!
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoAnimation;
