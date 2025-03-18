import React from "react";
import { useNavigate } from "react-router-dom";
import { ProfileHeaderProps } from "../types";
import { achievementData } from "../../Archieve/achievementData";

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  onFollowClick,
  onEditClick,
}) => {
  const navigate = useNavigate();

  // 뱃지 아이콘 클릭 시 업적 페이지로 이동
  const handleBadgeClick = () => {
    // 선택 모드로 업적 페이지로 이동
    navigate("/archieve", {
      state: {
        selectionMode: true,
        currentBadgeId: profile.displayBadgeId,
      },
    });
  };

  // 선택된 뱃지 정보 가져오기
  const getSelectedBadge = () => {
    if (!profile.displayBadgeId) return null;

    // 모든 뱃지 중에서 선택된 뱃지 ID와 일치하는 뱃지 찾기
    const allBadges =
      achievementData.find((cat) => cat.id === "all")?.badges || [];
    return allBadges.find((badge) => badge.id === profile.displayBadgeId);
  };

  const selectedBadge = getSelectedBadge();

  return (
    <div className="bg-green-500 p-4 text-white">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt={`${profile.nickname}의 프로필`}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
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

        <div className="flex-1">
          <h2 className="text-xl font-bold">{profile.nickname}</h2>
          <p className="text-sm text-white/80">{profile.statusMessage}</p>
        </div>

        {profile.isMyProfile && (
          <div className="relative">
            <div
              className="bg-white text-green-500 rounded p-1 absolute top-0 right-0 cursor-pointer"
              onClick={handleBadgeClick}
            >
              {selectedBadge ? (
                <img
                  src={selectedBadge.image}
                  alt={selectedBadge.name}
                  className="w-6 h-6 object-contain"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              )}
            </div>
          </div>
        )}
      </div>

      {profile.isMyProfile ? (
        <button
          onClick={onEditClick}
          className="mt-4 border border-white rounded-full px-4 py-1 text-sm text-white font-medium"
        >
          편집
        </button>
      ) : (
        <button
          onClick={onFollowClick}
          className={`mt-4 rounded-full px-4 py-1 text-sm font-medium ${
            profile.isFollowing
              ? "bg-white text-green-500"
              : "border border-white text-white"
          }`}
        >
          {profile.isFollowing ? "팔로잉" : "팔로우"}
        </button>
      )}
    </div>
  );
};

export default ProfileHeader;
