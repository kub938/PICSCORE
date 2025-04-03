import React from "react";
import { ArenaPhoto } from "../../../api/arenaApi";

interface ArenaResultProps {
  score: number;
  userOrder: number[];
  correctOrder: number[];
  photos: ArenaPhoto[];
  timeSpent: number;
  correctCount: number;  // 전체 정답 여부 (0 또는 1)
  partialCorrectCount: number; // 부분 정답 개수 (0~4)
  xpEarned: number;
  onPlayAgain: () => void;
  onViewRanking: () => void;
  isSaving: boolean;
}

const ArenaResult: React.FC<ArenaResultProps> = ({
  score,
  userOrder,
  correctOrder,
  photos,
  timeSpent,
  correctCount,
  partialCorrectCount,
  xpEarned,
  onPlayAgain,
  onViewRanking,
  isSaving,
}) => {
  const isAllCorrect = correctCount === 1; // 완전히 맞춘 경우

  // 정렬된 사진 배열 가져오기 (정답 순서대로)
  const getSortedPhotos = () => {
    // correctOrder를 사용하여 정렬
    return correctOrder.map(id => {
      const photo = photos.find(photo => photo.id === id);
      if (!photo) {
        console.error(`ID ${id}에 해당하는 사진을 찾을 수 없습니다.`, photos);
        // 안전하게 처리하기 위해 첫 번째 사진 반환
        return photos[0];
      }
      return photo;
    });
  };

  // 사용자가 선택한 순서대로 사진 가져오기
  const getUserOrderedPhotos = () => {
    return userOrder.map(id => {
      const photo = photos.find(photo => photo.id === id);
      if (!photo) {
        console.error(`ID ${id}에 해당하는 사진을 찾을 수 없습니다.`, photos);
        return null;
      }
      return photo;
    });
  };

  return (
    <div className="flex flex-col gap-3 pt-4">
      {/* 메인 결과 카드 */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-pic-primary/10 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-pic-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-bold text-center mb-5">
          {isAllCorrect ? "아레나 완벽 성공!" : "아레나 결과"}
        </h2>

        {/* 정답 개수, 소요 시간, 점수 - 3열 그리드로 변경 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm mb-1">정답 개수</p>
            <p className="text-lg font-bold text-pic-primary">
              {partialCorrectCount}/4
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm mb-1">소요 시간</p>
            <p className="text-lg font-bold text-pic-primary">
              {timeSpent}초
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm mb-1">점수</p>
            <p className="text-lg font-bold text-pic-primary">{score}점</p>
          </div>
        </div>

        {/* 경험치 정보 */}
        <div className="bg-gray-50 rounded-lg p-4 text-center mb-6">
          <p className="text-gray-500 text-sm mb-1">획득 경험치</p>
          <p className="text-2xl font-bold text-green-600">+{xpEarned} XP</p>
        </div>

        {/* 정답 비교 섹션 */}
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-700 mb-2">정답 순서 (점수 높은순)</h3>
          <div className="grid grid-cols-4 gap-2">
            {getSortedPhotos().map((photo, index) => (
              <div key={`correct-${photo.id}`} className="relative">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={`Rank ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/default-profile.jpg"; // 로드 실패 시 기본 이미지
                    }}
                  />
                </div>
                <div className="absolute top-0 left-0 w-6 h-6 bg-pic-primary text-white rounded-tl-lg rounded-br-lg flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="text-center mt-1 text-sm font-medium">
                  {photo.score}점
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-700 mb-2">내가 선택한 순서</h3>
          <div className="grid grid-cols-4 gap-2">
            {getUserOrderedPhotos().map((photo, index) => {
              if (!photo) return (
                <div key={`error-${index}`} className="relative aspect-square rounded-lg bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">오류</span>
                </div>
              );
              
              const correctIndex = correctOrder.indexOf(photo.id);
              const isCorrect = correctIndex === index;
              
              return (
                <div key={`user-${photo.id}`} className="relative">
                  <div className={`aspect-square rounded-lg overflow-hidden ${isCorrect ? 'border-2 border-green-500' : 'border-2 border-red-500'}`}>
                    <img
                      src={photo.imageUrl}
                      alt={`Your Rank ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/default-profile.jpg"; // 로드 실패 시 기본 이미지
                      }}
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-6 h-6 bg-pic-primary text-white rounded-tl-lg rounded-br-lg flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className={`absolute top-0 right-0 w-6 h-6 ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white rounded-tr-lg rounded-bl-lg flex items-center justify-center`}>
                    {isCorrect ? '✓' : '✗'}
                  </div>
                  <div className="text-center mt-1 text-sm font-medium">
                    {photo.score}점
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 저장 경고 메시지 */}
        <div className="bg-yellow-50 rounded-lg p-3 mb-6 border border-yellow-200">
          <p className="text-sm text-yellow-800">
            랭킹 보기를 클릭하면 결과가 저장되고 랭킹 페이지로 이동합니다.
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="space-y-3">
          <button
            onClick={onViewRanking}
            disabled={isSaving}
            className="w-full bg-pic-primary text-white py-3.5 rounded-lg font-bold hover:bg-pic-primary/90 transition-colors duration-200 shadow-sm flex items-center justify-center"
          >
            {isSaving ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                저장 중...
              </div>
            ) : (
              <span>저장 후 랭킹보기</span>
            )}
          </button>

          {/* 다시 도전하기 버튼 */}
          <button
            onClick={onPlayAgain}
            className="w-full border border-pic-primary text-pic-primary bg-white py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors duration-200"
            disabled={isSaving}
          >
            다시 도전하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArenaResult;