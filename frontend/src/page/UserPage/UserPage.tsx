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
        const photosResponse = await userApi.getMyPhotos(activeTab !== "hidden");

        console.log("profileResponse", profileResponse);
        console.log("statsResponse", statsResponse);
        console.log("photosResponse", photosResponse);

        // 프로필 정보 처리
        const profileData = profileResponse.data.data;
        setProfile({
          nickname: profileData.nickName,
          statusMessage: profileData.message,
          profileImage: profileData.profileImage,
          followerCount: profileData.followerCnt,
          followingCount: profileData.followingCnt,
          isMyProfile: true,
          isFollowing: false,
          displayBadgeId: localStorage.getItem("selectedBadgeId") || undefined,
        });

        // 통계 정보 처리
        const statsData = statsResponse.data.data;
        setUserStats({
          averageScore: statsData.scoreAvg,
          contestRank: "N/A",
          timeAttackRank: statsData.timeAttackRank.toString(),
          arenaRank: "N/A",
        });

        // 사진 정보 처리
        const photoItems: PhotoItem[] = photosResponse.data.data.map(
          (photo: any) => ({
            id: photo.id.toString(),
            imageUrl: photo.imageUrl,
            score: photo.score,
            isPrivate: activeTab === "hidden" // 비공개 탭이면 모든 사진은 비공개로 표시
          })
        );

        console.log("photoItems", photoItems);
        setPhotos(photoItems);
      } else if (userId) {
        // 다른 사용자 프로필 데이터 조회
        const profileResponse = await userApi.getUserProfile(parseInt(userId));
        const statsResponse = await userApi.getUserStatistics(parseInt(userId));
        const photosResponse = await userApi.getUserPhotos(
          parseInt(userId),
          true // 다른 유저의 경우 항상 공개 사진만 볼 수 있음
        );

        // 프로필 정보 처리
        const profileData = profileResponse.data.data;
        setProfile({
          nickname: profileData.nickName,
          statusMessage: profileData.message,
          profileImage: profileData.profileImage,
          followerCount: profileData.followerCnt,
          followingCount: profileData.followingCnt,
          isMyProfile: false,
          isFollowing: profileData.isFollowing,
          displayBadgeId: undefined,
        });

        // 통계 정보 처리
        const statsData = statsResponse.data.data;
        setUserStats({
          averageScore: statsData.scoreAvg,
          contestRank: "N/A",
          timeAttackRank: statsData.timeAttackRank.toString(),
          arenaRank: "N/A",
        });

        // 사진 정보 처리 - 다른 사용자의 경우 모두 공개 사진
        const photoItems: PhotoItem[] = photosResponse.data.data.map(
          (photo: any) => ({
            id: photo.id.toString(),
            imageUrl: photo.imageUrl,
            score: photo.score,
            isPrivate: false // 다른 사용자의 경우 모두 공개 사진
          })
        );

        console.log("other user photoItems", photoItems);
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
        userId={userId} // 다른 사용자의 ID 전달 (내 프로필이면 null)
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pic-primary"></div>
          </div>
        ) : activeTab === "contest" ? (
          // 컨테스트 탭일 경우 "준비중입니다" 메시지 표시
          <div className="p-8 text-center my-4">
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto text-gray-400"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="15"></line>
                <line x1="15" y1="9" x2="9" y2="15"></line>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              컨테스트 게시판 준비 중
            </h3>
            <p className="text-gray-500">
              현재 컨테스트 기능을 준비 중입니다.<br />곧 서비스를 이용하실 수 있습니다.
            </p>
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
