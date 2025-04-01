import React from "react";
import { PhotoGridProps, PhotoItem } from "../types";
import { useNavigate } from "react-router-dom";

const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  activeTab,
  isMyProfile,
}) => {
  const navigate = useNavigate();

  const handlePhotoClick = (photoId: string) => {
    navigate(`/photo/${parseInt(photoId)}`);
  };
  
  if (photos.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        {activeTab === "hidden"
          ? "비공개 사진이 없습니다"
          : activeTab === "contest"
          ? "컨테스트 참여 사진이 없습니다"
          : "등록된 사진이 없습니다"}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 p-1">
      {photos.map((photo) => (
        <div 
          key={photo.id} 
          className="aspect-square relative cursor-pointer" 
          onClick={() => handlePhotoClick(photo.id)}
        >
          <img
            src={photo.imageUrl}
            alt="사진"
            className="w-full h-full object-cover"
          />
          {activeTab !== "hidden" && photo.isPrivate && (
            <div className="absolute top-1 right-1 bg-gray-800 text-white rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0110 0v4"></path>
              </svg>
            </div>
          )}
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white rounded px-1 text-xs">
            {photo.score}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
