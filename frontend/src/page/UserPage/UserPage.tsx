import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

// 컴포넌트
import ProfileHeader from "./components/ProfileHeader";
import FollowerStats from "./components/FollowerStats";
import StatsGrid from "./components/StatsGrid";
import TabNavigation from "./components/TabNavigation";
import PhotoGrid from "./components/PhotoGrid";
import NoAuthMessage from "./components/NoAuthMessage";

// API
import { userApi } from "../../api/userApi";

import {
  UserPageProps,
  UserProfileData,
  UserStatsData,
  PhotoItem,
} from "./types";

// Main UserPage Component
const UserPage: React.FC<UserPageProps> = ({ userId, apiEndpoint }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isMyProfile = userId === null;

  const [profile, setProfile] = useState<UserProfileData>({
    nickname: "",
    statusMessage: "",
    profileImage: null,
    followerCount: 0,
    followingCount: 0,
    isMyProfile: isMyProfile,
    isFollowing: false,
    displayBadgeId: undefined,
  });

  const [userStats, setUserStats] = useState<UserStatsData>({
    averageScore: 0,
    contestRank: "0",
    timeAttackRank: "0",
    arenaRank: "0",
  });

  const [activeTab, setActiveTab] = useState<string>("gallery");
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 업적 페이지에서 선택한 뱃지 처리
  useEffect(() => {
    if (
      location.state &&
      location.state.updatedProfile &&
      location.state.updatedProfile.displayBadgeId
    ) {
      setProfile((prev) => ({
        ...prev,
        displayBadgeId: location.state.updatedProfile.displayBadgeId,
      }));

      localStorage.setItem(
        "selectedBadgeId",
        location.state.updatedProfile.displayBadgeId
      );

      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    fetchUserData();
  }, [userId, activeTab, apiEndpoint]);

  const fetchUserData = async () => {
    setLoading(true);

    try {
      if (isMyProfile) {
        // 내 프로필 데이터 조회
        const profileResponse = await userApi.getMyProfile();
        const statsResponse = await userApi.getMyStatistics();
        const photosResponse = await userApi.getMyPhotos(true);

        console.log("profileResponse", profileResponse);
        console.log("statsResponse", statsResponse);
        console.log("photosResponse", photosResponse);

        // 프로필 정보 처리
        setProfile({
          nickname: profileResponse.data.nickName,
          statusMessage: profileResponse.data.message,
          profileImage: profileResponse.data.profileImage,
          followerCount: profileResponse.data.followerCnt,
          followingCount: profileResponse.data.followingCnt,
          isMyProfile: true,
          isFollowing: false,
          displayBadgeId: localStorage.getItem("selectedBadgeId") || undefined,
        });

        // 통계 정보 처리
        setUserStats({
          averageScore: statsResponse.data.scoreAvg,
          contestRank: "N/A",
          timeAttackRank: statsResponse.data.timeAttackRank.toString(),
          arenaRank: "N/A",
        });

        // 사진 정보 처리
        const photoItems: PhotoItem[] = photosResponse.data.map(
          (photo: any) => ({
            id: photo.id.toString(),
            imageUrl: photo.imageUrl,
            score: photo.score,
            isPrivate: !photo.isPublic,
          })
        );

        setPhotos(photoItems);
      } else if (userId) {
        // 다른 사용자 프로필 데이터 조회
        const profileResponse = await userApi.getUserProfile(parseInt(userId));
        const statsResponse = await userApi.getUserStatistics(parseInt(userId));
        const photosResponse = await userApi.getUserPhotos(
          parseInt(userId),
          true
        );

        // 프로필 정보 처리
        setProfile({
          nickname: profileResponse.data.nickName,
          statusMessage: profileResponse.data.message,
          profileImage: profileResponse.data.profileImage,
          followerCount: profileResponse.data.followerCnt,
          followingCount: profileResponse.data.followingCnt,
          isMyProfile: false,
          isFollowing: profileResponse.data.isFollowing,
          displayBadgeId: undefined,
        });

        // 통계 정보 처리
        setUserStats({
          averageScore: statsResponse.data.scoreAvg,
          contestRank: "N/A",
          timeAttackRank: statsResponse.data.timeAttackRank.toString(),
          arenaRank: "N/A",
        });

        // 사진 정보 처리
        const photoItems: PhotoItem[] = photosResponse.data.map(
          (photo: any) => ({
            id: photo.id.toString(),
            imageUrl: photo.imageUrl,
            score: photo.score,
            isPrivate: false,
          })
        );

        setPhotos(photoItems);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowClick = async () => {
    if (userId) {
      try {
        await userApi.toggleFollow(parseInt(userId));

        setProfile((prev) => ({
          ...prev,
          isFollowing: !prev.isFollowing,
        }));
      } catch (error) {
        console.error("팔로우 요청 실패:", error);
      }
    }
  };

  const handleEditClick = () => {
    navigate("/change-info");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const getTabs = () => {
    if (isMyProfile) {
      return [
        { id: "gallery", label: "게시글" },
        { id: "hidden", label: "비공개" },
        { id: "contest", label: "컨테스트" },
      ];
    } else {
      return [
        { id: "gallery", label: "게시글" },
        { id: "contest", label: "컨테스트" },
      ];
    }
  };

  return (
    <div className="w-full flex flex-col max-w-md mx-auto min-h-screen bg-gray-50">
      <ProfileHeader
        profile={profile}
        onFollowClick={handleFollowClick}
        onEditClick={handleEditClick}
      />

      <FollowerStats
        followerCount={profile.followerCount}
        followingCount={profile.followingCount}
      />

      {profile.isMyProfile || profile.isFollowing ? (
        <StatsGrid stats={userStats} />
      ) : (
        <NoAuthMessage />
      )}

      <div className="mt-4">
        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabs={getTabs()}
        />

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <PhotoGrid
            photos={photos}
            activeTab={activeTab}
            isMyProfile={isMyProfile}
          />
        )}
      </div>
    </div>
  );
};

export default UserPage;
