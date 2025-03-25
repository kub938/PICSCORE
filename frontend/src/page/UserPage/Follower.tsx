import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 팔로우 리스트에서 사용할 임시 사용자 타입
interface FollowUser {
  id: string;
  username: string;
  profileImageUrl: string | null;
  isFollowing: boolean;
}

const Follower: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dummyFollowers, setDummyFollowers] = useState<FollowUser[]>(
    Array(7)
      .fill(null)
      .map((_, index) => ({
        id: `follower-${index + 1}`,
        username: `kub938`,
        profileImageUrl: "https://via.placeholder.com/150/771796",
        isFollowing: index % 2 === 0, // 예시: 짝수 인덱스만 팔로잉 중
      }))
  );

  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // 선택된 사용자 ID

  const navigate = useNavigate();

  // 검색어로 필터링
  const filteredData = dummyFollowers.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 사용자 삭제 처리
  const handleDeleteUser = (userId: string) => {
    setDummyFollowers((prev) => prev.filter((user) => user.id !== userId));
  };

  // 버튼 클릭 시 동작
  const handleButtonClick = (user: FollowUser) => {
    // 삭제 확인 모달 표시
    setSelectedUserId(user.id);
    setShowModal(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  // 모달에서 "삭제" 버튼 클릭
  const handleConfirmDelete = () => {
    if (selectedUserId) {
      handleDeleteUser(selectedUserId); // 사용자 삭제
    }
    handleCloseModal(); // 모달 닫기
  };

  // 뒤로 가기
  const handleGoBack = () => {
    navigate(-1);
  };

  // 팔로잉 페이지로 이동
  const goToFollowings = () => {
    navigate("/following");
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
        <h1 className="flex-1 text-center font-bold text-lg">팔로워</h1>
        <div className="w-6"></div> {/* 균형을 위한 더미 요소 */}
      </div>

      {/* 탭 */}
      <div className="flex border-b">
        <button className="flex-1 py-3 text-center font-medium border-b-2 border-black">
          {dummyFollowers.length} 팔로워
        </button>
        <button
          className="flex-1 py-3 text-center text-gray-500"
          onClick={goToFollowings}
        >
          7 팔로우
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

      {/* 사용자 목록 */}
      <div className="flex-1 overflow-y-auto">
        {filteredData.length > 0 ? (
          filteredData.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-4 border-b bg-white"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                <img
                  src={user.profileImageUrl || "/default-profile.jpg"}
                  alt={`${user.username}의 프로필`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/default-profile.jpg";
                  }}
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">{user.username}</p>
              </div>
              <button
                className="px-4 py-1.5 rounded-md text-sm font-medium bg-pic-primary text-white"
                onClick={() => handleButtonClick(user)} // 버튼 클릭 시 동작
              >
                삭제
              </button>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            {searchQuery ? "검색 결과가 없습니다." : "팔로워가 없습니다."}
          </div>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <p className="text-center font-bold text-lg mb-4">
              삭제 하시겠습니까?
            </p>
            <div className="flex justify-around">
              <button
                className="px-4 py-2 bg-pic-primary text-white rounded-md"
                onClick={handleConfirmDelete} // 삭제 확인
              >
                삭제
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                onClick={handleCloseModal} // 모달 닫기
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

export default Follower;
