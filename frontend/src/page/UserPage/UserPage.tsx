import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// import { userState } from "../../recoil/atoms";
import Header from "./components/Header";
import ProfileHeader from "./components/ProfileHeader";
import FollowerStats from "./components/FollowerStats";
import StatsGrid from "./components/StatsGrid";
import TabNavigation from "./components/TabNavigation";
import PhotoGrid from "./components/PhotoGrid";
import NoAuthMessage from "./components/NoAuthMessage";
import {
  UserPageProps,
  UserProfileData,
  UserStatsData,
  PhotoItem,
  Tab,
} from "./types";

// Main UserPage Component
const UserPage: React.FC<UserPageProps> = ({ userId, apiEndpoint }) => {
  const navigate = useNavigate();
  // const [user, setUser] = useRecoilState(userState);

  const isMyProfile = userId === null;

  const [profile, setProfile] = useState<UserProfileData>({
    nickname: "",
    statusMessage: "",
    profileImage: null,
    followerCount: 0,
    followingCount: 0,
    isMyProfile: isMyProfile,
    isFollowing: false,
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

  useEffect(() => {
    // Fetch user profile, stats and photos from API
    fetchUserData();
  }, [userId, activeTab, apiEndpoint]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      // In a real implementation, these would be API calls
      // const profileResponse = await axios.get(apiEndpoint);
      // const statsEndpoint = isMyProfile ? 'api/v1/user/static/me' : `api/v1/user/static/${userId}`;
      // const statsResponse = await axios.get(statsEndpoint);
      // const photosEndpoint = isMyProfile ? 'api/v1/user/photo/me' : `api/v1/user/photo/${userId}`;
      // const photosResponse = await axios.get(`${photosEndpoint}?tab=${activeTab}`);

      // setProfile(profileResponse.data);
      // setUserStats(statsResponse.data);
      // setPhotos(photosResponse.data);

      // Mock data for demonstration
      setTimeout(() => {
        setProfile({
          nickname: isMyProfile ? "김선진" : "김윤배",
          statusMessage: "상태메세지는 입력하는 창인데 표시할게요",
          profileImage: null,
          followerCount: 128,
          followingCount: 95,
          isMyProfile: isMyProfile,
          isFollowing: !isMyProfile && Math.random() > 0.5,
        });

        setUserStats({
          averageScore: 78.5,
          contestRank: "10",
          timeAttackRank: "15",
          arenaRank: "20",
        });

        // Mock photos based on active tab
        let mockPhotos: PhotoItem[] = [];

        if (activeTab === "gallery") {
          mockPhotos = [
            {
              id: "1",
              imageUrl: "https://via.placeholder.com/300",
              score: 89,
              isPrivate: false,
            },
            {
              id: "2",
              imageUrl: "https://via.placeholder.com/300",
              score: 76,
              isPrivate: isMyProfile,
            },
            {
              id: "3",
              imageUrl: "https://via.placeholder.com/300",
              score: 92,
              isPrivate: false,
            },
            {
              id: "4",
              imageUrl: "https://via.placeholder.com/300",
              score: 84,
              isPrivate: false,
            },
            {
              id: "5",
              imageUrl: "https://via.placeholder.com/300",
              score: 77,
              isPrivate: false,
            },
            {
              id: "6",
              imageUrl: "https://via.placeholder.com/300",
              score: 95,
              isPrivate: false,
            },
          ];
        } else if (activeTab === "hidden" && isMyProfile) {
          mockPhotos = [
            {
              id: "2",
              imageUrl: "https://via.placeholder.com/300",
              score: 76,
              isPrivate: true,
            },
          ];
        } else if (activeTab === "contest") {
          mockPhotos = [
            {
              id: "3",
              imageUrl: "https://via.placeholder.com/300",
              score: 92,
              isPrivate: false,
            },
            {
              id: "6",
              imageUrl: "https://via.placeholder.com/300",
              score: 95,
              isPrivate: false,
            },
          ];
        }

        setPhotos(mockPhotos);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const handleFollowClick = () => {
    // Toggle follow state
    setProfile((prev) => ({
      ...prev,
      isFollowing: !prev.isFollowing,
    }));

    // In a real implementation, this would be an API call
    // axios.post(`api/v1/user/following/me`, { userId: userId });
  };

  const handleEditClick = () => {
    // Navigate to profile edit page
    navigate("/change-info");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Get available tabs based on whether it's mypage or userdetail
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
    <div className="flex flex-col max-w-md mx-auto min-h-screen bg-gray-50">
      <Header title={profile.isMyProfile ? "마이페이지" : profile.nickname} />

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
