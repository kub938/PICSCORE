import React from "react";

interface PreparationStepProps {
  countdown: number;
}

const PreparationStep: React.FC<PreparationStepProps> = ({ countdown }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4 text-center">
      <h2 className="text-2xl font-bold mb-6">준비하세요!</h2>
      <p className="text-gray-600 mb-8">곧 주제가 공개됩니다</p>

      <div className="flex items-center justify-center w-32 h-32 rounded-full bg-green-100 mb-16 shadow-md">
        <span className="text-green-500 text-8xl font-bold">{countdown}</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 w-full border border-gray-200">
        <div className="flex">
          <div className="mr-3 text-yellow-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-yellow-500 font-bold mb-1">주의!</h3>
            <p className="text-gray-700">
              주제 공개 후 15초 이내에 주어진 주제의 사진을 촬영해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationStep;
