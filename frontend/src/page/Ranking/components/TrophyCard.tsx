// page/Ranking/components/TrophyCard.tsx
import React from "react";

interface TrophyCardProps {
  rank: number;
  trophyImage: string;
  nickname: string;
  profileImage?: string;
}

const TrophyCard: React.FC<TrophyCardProps> = ({
  rank,
  trophyImage,
  nickname,
  profileImage,
}) => {
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
      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
        {profileImage ? (
          <img
            src={profileImage}
            alt={`${nickname} 프로필`}
            className="w-full h-full rounded-full object-cover"
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
      <div className="text-center mt-2 font-medium">{nickname}</div>
    </div>
  );
};

export default TrophyCard;
