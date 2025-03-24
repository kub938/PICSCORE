import React from "react";
import { useNavigate } from "react-router-dom";
import { FollowerStatsProps } from "../types";

const FollowerStats: React.FC<FollowerStatsProps> = ({
  followerCount,
  followingCount,
}) => {
  const navigate = useNavigate();

  // 클릭 핸들러 정의
  const handleFollowerClick = () => {
    navigate("/follower"); // "me"를 현재 사용자 ID로 대체 가능
  };

  const handleFollowingClick = () => {
    navigate("/following"); // "me"를 현재 사용자 ID로 대체 가능
  };

  return (
    <div className="flex justify-around py-4 border-b">
      <div className="text-center cursor-pointer" onClick={handleFollowerClick}>
        {/* 팔로워 */}
        <div className="font-bold text-xl">{followerCount}</div>
        <div className="text-gray-500 text-sm">팔로워</div>
      </div>
      <div
        className="text-center cursor-pointer"
        onClick={handleFollowingClick}
      >
        {/* 팔로잉 */}
        <div className="font-bold text-xl">{followingCount}</div>
        <div className="text-gray-500 text-sm">팔로잉</div>
      </div>
    </div>
  );
};

export default FollowerStats;
