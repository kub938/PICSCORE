// page/Arena/components/ExplanationStep.tsx
import React from "react";

interface ExplanationStepProps {
  onStartGame: () => void;
}

const ExplanationStep: React.FC<ExplanationStepProps> = ({ onStartGame }) => {
  return (
    <div className="flex flex-col flex-1 p-4 items-center justify-center">
      <div className="w-full max-w-sm mb-5">
        <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200 mb-5">
          <h2 className="text-2xl font-bold mb-5 text-center text-pic-primary">
            사진 점수 맞추기 아레나
          </h2>

          <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pic-primary text-white font-bold text-xl">
                1
              </div>
              <div className="ml-4 flex-1">
                <p className="font-bold">게시판에서 무작위로 선택된</p>
                <p className="text-gray-600">4장의 사진이 표시됩니다.</p>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pic-primary text-white font-bold text-xl">
                2
              </div>
              <div className="ml-4 flex-1">
                <p className="font-bold">사진의 점수 순서를</p>
                <p className="text-gray-600">
                  높은 순서부터 맞춰주세요!
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pic-primary text-white font-bold text-xl">
                3
              </div>
              <div className="ml-4 flex-1">
                <p className="font-bold">정확도와 남은 시간에 따라</p>
                <p className="text-gray-600">점수와 경험치가 부여됩니다.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <h3 className="text-pic-primary font-bold mb-2">TIP!</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-pic-primary mr-2">•</span>
                <span>30초의 제한 시간 내에 정답을 맞춰야 합니다</span>
              </li>
              <li className="flex items-start">
                <span className="text-pic-primary mr-2">•</span>
                <span>모든 순서 맞추면: 100점 + 남은 시간 × 10점</span>
              </li>
              <li className="flex items-start">
                <span className="text-pic-primary mr-2">•</span>
                <span>일부 맞추면: 맞춘 개수 × 25점</span>
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={onStartGame}
          className="w-full bg-pic-primary text-white py-3.5 rounded-lg text-lg font-bold hover:bg-pic-primary/90 transition shadow-sm"
        >
          게임 시작
        </button>
      </div>
    </div>
  );
};

export default ExplanationStep;
