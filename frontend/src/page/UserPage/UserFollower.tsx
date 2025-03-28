import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { friendApi, FollowerUser } from "../../api/friendApi";
import { useAuthStore } from "../../store/authStore";

const UserFollowerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [followers, setFollowers] = useState<FollowerUser[]>([]);
  const [filteredFollowers, setFilteredFollowers] = useState<FollowerUser[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [followingCount, setFollowingCount] = useState<number>(0);

  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 팔로워 목록 불러오기
  useEffect(() => {
    const fetchFollowers = async () => {
      if (!userId || !isLoggedIn) {
        setIsLoading(false);
        setError("사용자 정보가 없거나 로그인이 필요합니다.");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await friendApi.getUserFollowers(parseInt(userId));

        if (response.data?.data) {
          setFollowers(response.data.data);
          setFilteredFollowers(response.data.data);

          // 사용자 정보 가져오기 (닉네임 표시용)
          try {
            const userProfileResponse = await friendApi.getUserProfile(
              parseInt(userId)
            );
            if (userProfileResponse.data?.data) {
              setUserName(userProfileResponse.data.data.nickName);
              setFollowingCount(userProfileResponse.data.data.followingCnt);
            }
          } catch (profileError) {
            console.error("사용자 프로필 가져오기 실패:", profileError);
          }
        } else {
          setFollowers([]);
          setFilteredFollowers([]);
        }
      } catch (error) {
        console.error("팔로워 목록 가져오기 실패:", error);
        setError("팔로워 목록을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowers();
  }, [userId, isLoggedIn]);

  // 검색어 변경 시 필터링
  useEffect(() => {
    if (searchQuery) {
      const filtered = followers.filter((user) =>
        user.nickName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFollowers(filtered);
    } else {
      setFilteredFollowers(followers);
    }
  }, [searchQuery, followers]);

  // 팔로우 토글 핸들러
  const handleToggleFollow = async (followerId: number) => {
    try {
      await friendApi.toggleFollow(followerId);
      // 상태 업데이트 (토글 후 목록 갱신)
      setFollowers((prev) =>
        prev.map((user) => {
          if (user.userId === followerId) {
            return { ...user, isFollowing: !user.isFollowing };
          }
          return user;
        })
      );
    } catch (error) {
      console.error("팔로우 토글 실패:", error);
    }
  };

  // 뒤로 가기
  const handleGoBack = () => {
    navigate(-1);
  };

  // 사용자의 팔로잉 페이지로 이동
  const goToFollowings = () => {
    navigate(`/user/following/${userId}`);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      {/* 헤더 */}
      <div className="flex items-center p-4 bg-white border-b">
        <button onClick={handleGoBack} className="p-1">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="flex-1 text-center font-bold text-lg">
          {userName ? `${userName}님의 팔로워` : "팔로워"}
        </h1>
        <div className="w-6"></div> {/* 균형을 위한 더미 요소 */}
      </div>

      {/* 탭 */}
      <div className="flex border-b">
        <button className="flex-1 py-3 text-center font-medium border-b-2 border-black">
          {followers.length} 팔로워
        </button>
        <button
          className="flex-1 py-3 text-center text-gray-500"
          onClick={goToFollowings}
        >
          {followingCount} 팔로잉
        </button>
      </div>

      {/* 검색창 */}
      <div className="p-4 border-b">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <svg
            className="w-5 h-5 text-gray-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input
            type="text"
            placeholder="검색"
            className="bg-transparent w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 로딩 상태 */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pic-primary"></div>
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center text-red-500">
          {error}
        </div>
      ) : (
        /* 사용자 목록 */
        <div className="flex-1 overflow-y-auto">
          {filteredFollowers.length > 0 ? (
            filteredFollowers.map((user) => (
              <div
                key={user.userId}
                className="flex items-center p-4 border-b bg-white"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img
                    src={user.profileImage || "/default-profile.jpg"}
                    alt={`${user.nickName} 프로필`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/default-profile.jpg"; // 로드 실패 시 기본 이미지
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{user.nickName}</p>
                </div>
                <button
                  className={`px-4 py-1.5 rounded-md text-sm font-medium ${
                    user.isFollowing
                      ? "bg-pic-primary text-white"
                      : "border border-pic-primary text-pic-primary"
                  }`}
                  onClick={() => handleToggleFollow(user.userId)}
                >
                  {user.isFollowing ? "팔로잉" : "팔로우"}
                </button>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              {searchQuery ? "검색 결과가 없습니다." : "팔로워가 없습니다."}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserFollowerPage;
