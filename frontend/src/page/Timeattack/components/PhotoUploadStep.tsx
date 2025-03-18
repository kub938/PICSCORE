import React from "react";

interface PhotoUploadStepProps {
  timeLeft: number;
  challengeTopic: string;
  selectedImage: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSubmit: () => void;
}

const PhotoUploadStep: React.FC<PhotoUploadStepProps> = ({
  timeLeft,
  challengeTopic,
  selectedImage,
  onImageUpload,
  onImageSubmit,
}) => {
  return (
    <div className="flex flex-col flex-1 p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
          <div className="text-center text-gray-600 text-sm mb-1">
            남은 시간
          </div>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold">
              {timeLeft}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
          <div className="text-center text-gray-600 text-sm mb-1">
            오늘의 주제
          </div>
          <div className="bg-gray-100 p-2 rounded-lg text-center text-xl font-bold flex items-center justify-center h-16">
            {challengeTopic}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
        <div className="h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="촬영된 사진"
              className="max-h-full object-contain rounded"
            />
          ) : (
            <>
              <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                <div className="text-green-500 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>
                <p className="text-gray-500 text-center font-medium">
                  사진을 촬영하거나 업로드하세요
                </p>
                <p className="text-gray-400 text-sm text-center mt-1">
                  주제 "{challengeTopic}"에 맞는 사진을 찾아보세요!
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  className="hidden"
                />
              </label>
            </>
          )}
        </div>
      </div>

      {selectedImage ? (
        <button
          onClick={onImageSubmit}
          className="bg-green-500 text-white py-4 rounded-lg text-xl font-bold hover:bg-green-600 transition shadow-sm"
        >
          제출하기
        </button>
      ) : (
        <button
          disabled
          className="bg-gray-300 text-white py-4 rounded-lg text-xl font-bold shadow-sm"
        >
          사진 선택 후 제출 가능
        </button>
      )}
    </div>
  );
};

export default PhotoUploadStep;
