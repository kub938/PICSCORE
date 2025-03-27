// page/Timeattack/components/SuccessResult.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { timeAttackApi } from "../../../api/timeAttackApi";

interface AnalysisData {
  composition: number;
  lighting: number;
  subject: number;
  color: number;
  creativity: number;
}

interface SuccessResultProps {
  score: number;
  topicAccuracy: number;
  analysisData: AnalysisData;
  image: string | null;
  topic: string;
  translatedTopic?: string;
  imageName: string;
  ranking: number;
  onTryAgain?: () => void;
}

const SuccessResult: React.FC<SuccessResultProps> = ({
  score,
  topicAccuracy,
  analysisData,
  image,
  topic,
  translatedTopic,
  imageName,
  ranking,
  onTryAgain,
}) => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTryAgain = () => {
    if (onTryAgain) {
      onTryAgain();
    } else {
      navigate("/time-attack");
    }
  };

  const handleViewRanking = async () => {
    setIsSaving(true);
    setErrorMessage(null);

    try {
      // 1. 분석 차트와 텍스트를 JSON 문자열로 변환
      const analysisChart = JSON.stringify(analysisData);
      const analysisText = JSON.stringify([
        `주제 "${translatedTopic || topic}"에 대한 연관성: ${topicAccuracy}%`,
        `이미지 점수: ${score}점`,
      ]);

      // 2. 이미지 영구 저장 API 호출
      const saveResponse = await timeAttackApi.savePhoto({
        imageUrl: image || "",
        imageName: imageName,
        score: score,
        analysisChart: analysisChart,
        analysisText: analysisText,
        isPublic: true, // 타임어택 결과는 기본적으로 공개
        photoType: "timeattack", // 타임어택용 사진 타입
      });

      console.log("사진 저장 성공:", saveResponse);

      // 3. 타임어택 결과 저장 API 호출
      const saveTimeAttackResponse = await timeAttackApi.saveTimeAttackResult({
        imageName: imageName,
        topic: topic,
        score: score,
      });

      console.log("타임어택 결과 저장 성공:", saveTimeAttackResponse);

      // 4. 랭킹 페이지로 이동
      navigate("/ranking");
    } catch (error) {
      console.error("결과 저장 실패:", error);
      setErrorMessage("결과 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  // 분석 결과에서 피드백 생성
  const generateFeedback = () => {
    const feedbacks = [];

    // 주제 관련 피드백
    if (topicAccuracy >= 80) {
      feedbacks.push(
        `• 주제 "${translatedTopic || topic}"에 매우 적합한 사진입니다.`
      );
    } else if (topicAccuracy >= 50) {
      feedbacks.push(
        `• 주제 "${translatedTopic || topic}"와 관련성이 있습니다.`
      );
    } else {
      feedbacks.push(
        `• 주제 "${translatedTopic || topic}"와의 연관성이 낮습니다.`
      );
    }

    // 구도 피드백
    if (analysisData.composition >= 80) {
      feedbacks.push("• 구도가 잘 잡혀있어 시각적으로 매력적입니다.");
    } else if (analysisData.composition >= 60) {
      feedbacks.push("• 구도는 양호하지만 개선의 여지가 있습니다.");
    }

    // 조명 피드백
    if (analysisData.lighting >= 80) {
      feedbacks.push("• 조명이 적절하게 사용되었습니다.");
    } else if (analysisData.lighting >= 60) {
      feedbacks.push("• 조명이 조금 더 밝으면 좋을 것 같습니다.");
    }

    return feedbacks;
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
        <h2 className="text-xl font-bold text-center mb-2">분석 결과</h2>

        <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg mb-4 overflow-hidden">
          {image && (
            <img
              src={image}
              alt="Uploaded"
              className="object-cover w-full h-full"
            />
          )}
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-600">주제</p>
            <p className="text-xl font-bold">{translatedTopic || topic}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">주제 정확도</p>
            <p className="text-xl font-bold text-green-500">{topicAccuracy}%</p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold">총점</p>
            <p className="text-2xl font-bold text-green-500">{score}</p>
          </div>

          <div className="h-2 bg-gray-300 rounded-full mb-4">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{ width: `${score}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">구도</p>
              <div className="flex items-center">
                <div
                  className="h-1 bg-green-500 rounded-full"
                  style={{ width: `${analysisData.composition}%` }}
                ></div>
                <p className="ml-2">{analysisData.composition}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm">조명</p>
              <div className="flex items-center">
                <div
                  className="h-1 bg-green-500 rounded-full"
                  style={{ width: `${analysisData.lighting}%` }}
                ></div>
                <p className="ml-2">{analysisData.lighting}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm">주제</p>
              <div className="flex items-center">
                <div
                  className="h-1 bg-green-500 rounded-full"
                  style={{ width: `${analysisData.subject}%` }}
                ></div>
                <p className="ml-2">{analysisData.subject}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm">색상</p>
              <div className="flex items-center">
                <div
                  className="h-1 bg-green-500 rounded-full"
                  style={{ width: `${analysisData.color}%` }}
                ></div>
                <p className="ml-2">{analysisData.color}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg mb-4">
          <p className="font-bold text-yellow-800 mb-1">현재 랭킹</p>
          <p className="text-3xl font-bold text-yellow-800">{ranking}위</p>
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {errorMessage}
          </div>
        )}

        <div className="flex space-x-2">
          <button
            onClick={handleTryAgain}
            className="flex-1 bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
            disabled={isSaving}
          >
            다시 도전
          </button>
          <button
            onClick={handleViewRanking}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition"
            disabled={isSaving}
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
              "랭킹 보기"
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h2 className="text-xl font-bold mb-4">피드백</h2>
        <div className="space-y-2">
          {generateFeedback().map((feedback, index) => (
            <p key={index}>{feedback}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default SuccessResult;
