// page/Timeattack/components/FailureResult.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface FailureResultProps {
  message: string;
  topic?: string;
  onTryAgain?: () => void;
}

const FailureResult: React.FC<FailureResultProps> = ({
  message,
  topic,
  onTryAgain,
}) => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    if (onTryAgain) {
      onTryAgain();
    } else {
      navigate("/time-attack");
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex-1 p-4 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-4 w-full max-w-sm text-center border border-gray-200">
        <div className="mb-4 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-red-500 mb-2">시간 초과!</h2>
        <p className="text-gray-600 mb-6">
          {message || "제한 시간 내에 사진을 제출하지 못했습니다."}
        </p>

        {topic && (
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-gray-800">
              오늘의 주제: <span className="font-bold">{topic}</span>
            </p>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={handleTryAgain}
            className="flex-1 bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
          >
            다시 도전하기
          </button>
          <button
            onClick={handleGoHome}
            className="flex-1 border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            홈으로
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-sm border border-gray-200">
        <h3 className="font-bold mb-2">타임어택 팁!</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>게임 시작 전 주변을 미리 살펴보세요.</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>시간이 넉넉하지 않으니 빠르게 대응하세요.</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>주제와 관련된 물건이나 장소를 미리 생각해두세요.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FailureResult;
