import React from "react";
import { FollowerStatsProps } from "../types";

const FollowerStats: React.FC<FollowerStatsProps> = ({
  followerCount,
  followingCount,
}) => {
  return (
    <div className="flex justify-around py-4 border-b">
      <div className="text-center">
        <div className="font-bold text-xl">{followerCount}</div>
        <div className="text-gray-500 text-sm">팔로워</div>
      </div>
      <div className="text-center">
        <div className="font-bold text-xl">{followingCount}</div>
        <div className="text-gray-500 text-sm">팔로잉</div>
      </div>
    </div>
  );
};

export default FollowerStats;
