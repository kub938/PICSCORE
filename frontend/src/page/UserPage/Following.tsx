// page/UserPage/Following.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { followApi, FollowingUser } from "../../api/followApi";

const Following: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [followings, setFollowings] = useState<FollowingUser[]>([]);
  const [filteredFollowings, setFilteredFollowings] = useState<FollowingUser[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const navigate = useNavigate();

  // 팔로잉 목록 불러오기
  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        setIsLoading(true);
        const response = await followApi.getMyFollowings();
        setFollowings(response.data.data);
        setFilteredFollowings(response.data.data);
      } catch (error) {
        console.error("팔로잉 목록 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowings();
  }, []);

  // 검색어 변경 시 필터링
  useEffect(() => {
    if (searchQuery) {
      const filtered = followings.filter((user) =>
        user.nickName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFollowings(filtered);
    } else {
      setFilteredFollowings(followings);
    }
  }, [searchQuery, followings]);

  // 팔로우/언팔로우 토글
  const handleToggleFollow = async (userId: number) => {
    try {
      await followApi.toggleFollow(userId);
      // UI 상태 업데이트 (이 경우 팔로잉을 취소하면 목록에서 제거)
      setFollowings((prev) => prev.filter((user) => user.userId !== userId));
    } catch (error) {
      console.error("팔로잉 상태 변경 실패:", error);
    }
  };

  // 버튼 클릭 시 동작
  const handleButtonClick = (user: FollowingUser) => {
    setSelectedUserId(user.userId);
    setShowModal(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  // 모달에서 "팔로잉 취소" 버튼 클릭
  const handleConfirmUnfollow = () => {
    if (selectedUserId) {
      handleToggleFollow(selectedUserId);
    }
    handleCloseModal();
  };

  // 뒤로 가기
  const handleGoBack = () => {
    navigate(-1);
  };

  // 팔로워 페이지로 이동
  const goToFollower = () => {
    navigate("/follower");
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
        <h1 className="flex-1 text-center font-bold text-lg">팔로잉</h1>
        <div className="w-6"></div> {/* 균형을 위한 더미 요소 */}
      </div>

      {/* 탭 */}
      <div className="flex border-b">
        <button
          className="flex-1 py-3 text-center text-gray-500"
          onClick={goToFollower}
        >
          팔로워
        </button>
        <button className="flex-1 py-3 text-center font-medium border-b-2 border-black">
          {followings.length} 팔로우
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
      ) : (
        /* 사용자 목록 */
        <div className="flex-1 overflow-y-auto">
          {filteredFollowings.length > 0 ? (
            filteredFollowings.map((user) => (
              <div
                key={user.userId}
                className="flex items-center p-4 border-b bg-white"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img
                    src={user.profileImage || "/default-profile.jpg"}
                    alt={`${user.nickName}의 프로필`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/default-profile.jpg";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{user.nickName}</p>
                </div>
                <button
                  className="px-4 py-1.5 rounded-md text-sm font-medium bg-pic-primary text-white shadow-2xl"
                  onClick={() => handleButtonClick(user)}
                >
                  팔로잉
                </button>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              {searchQuery
                ? "검색 결과가 없습니다."
                : "팔로잉한 사용자가 없습니다."}
            </div>
          )}
        </div>
      )}

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <p className="text-center font-bold text-lg mb-4">
              팔로잉 취소하시겠습니까?
            </p>
            <div className="flex justify-around">
              <button
                className="px-4 py-2 bg-pic-primary text-white rounded-md"
                onClick={handleConfirmUnfollow}
              >
                팔로잉 취소
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                onClick={handleCloseModal}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Following;
