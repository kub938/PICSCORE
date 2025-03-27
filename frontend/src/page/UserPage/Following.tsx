import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyFollowings } from "../../hooks/friend";
import { friendApi } from "../../api/friendApi";

// 팔로잉 사용자 정보 인터페이스
interface FollowingUser {
  userId: number;
  nickName: string;
  profileImage: string;
}

interface FollowingProps {
  followerCount?: number;
  followingCount?: number;
}

const Following: React.FC<FollowingProps> = ({
  followerCount,
  followingCount,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [followings, setFollowings] = useState<FollowingUser[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const navigate = useNavigate();

  // useMyFollowings 훅을 사용하여 팔로잉 데이터 가져오기
  const { data, refetch, isFetching, isLoading, isError } = useMyFollowings();

  useEffect(() => {
    if (data && data.data) {
      setFollowings(data.data); // 최신 팔로잉 데이터 설정
    }
  }, [data]);

  // 검색어로 필터링
  const filteredData = followings.filter((user) =>
    user.nickName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 뒤로 가기
  const handleGoBack = () => {
    navigate(-1);
  };

  // 팔로워 페이지로 이동
  const goToFollower = () => {
    navigate("/follower");
  };

  // 사용자 클릭 시 해당 사용자의 페이지로 이동
  const handleUserClick = (userId: number) => {
    navigate(`/user/profile/${userId}`);
  };

  // 팔로잉 버튼 클릭 시 모달 표시
  const handleFollowingButtonClick = (userId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 클릭 이벤트 방지
    setSelectedUserId(userId);
    setShowModal(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  // 팔로잉 취소 처리
  const handleUnfollow = async () => {
    if (selectedUserId) {
      try {
        setIsDeleting(true);

        // 직접 axios 요청 대신 toggleFollow 함수 사용
        await friendApi.toggleFollow(selectedUserId);

        // 로컬 상태에서 제거
        setFollowings((prev) =>
          prev.filter((user) => user.userId !== selectedUserId)
        );

        // 팔로잉 목록 다시 불러오기
        await refetch();
      } catch (error) {
        console.error("팔로잉 삭제 실패:", error);
      } finally {
        setIsDeleting(false);
        handleCloseModal();
      }
    }
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
          팔로잉
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
        {isLoading || isFetching ? (
          // 로딩 중 표시
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pic-primary"></div>
          </div>
        ) : isError ? (
          <div className="p-4 text-center text-gray-500">
            데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        ) : filteredData.length > 0 ? (
          filteredData.map((user) => (
            <div
              key={user.userId}
              className="flex items-center p-4 border-b bg-white cursor-pointer"
              onClick={() => handleUserClick(user.userId)}
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
                className="px-4 py-1.5 rounded-md text-sm font-medium bg-pic-primary text-white"
                onClick={(e) => handleFollowingButtonClick(user.userId, e)}
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

      {/* 팔로잉 취소 확인 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <p className="text-center font-bold text-lg mb-4">
              팔로잉을 취소하시겠습니까?
            </p>
            <div className="flex justify-around">
              <button
                className="px-4 py-2 bg-pic-primary text-white rounded-md flex items-center justify-center"
                onClick={handleUnfollow}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    처리 중...
                  </>
                ) : (
                  "취소하기"
                )}
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                onClick={handleCloseModal}
                disabled={isDeleting}
              >
                돌아가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Following;
