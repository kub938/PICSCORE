// page/Timeattack/TimeAttackResult.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTimeAttackStore } from "../../store/timeAttackStore";

// 컴포넌트 임포트
import Container from "./components/Container";
import LoadingState from "./components/LoadingState";
import FailureResult from "./components/FailureResult";
import SuccessResult from "./components/SuccessResult";
import { LocationState } from "../../types";
import { TimeAttackResultData } from "../../types";
import { timeAttackApi } from "../../api/timeAttackApi";

// 애니메이션 모달 컴포넌트
interface AnimationModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  xpGained: number;
  destination: "ranking" | "timeattack";
}

const AnimationModal: React.FC<AnimationModalProps> = ({
  isOpen,
  onClose,
  score,
  xpGained,
  destination,
}) => {
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // XP 표시 후 카운트다운 시작
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            // 카운트다운 완료 후 목적지로 이동
            setTimeout(() => {
              onClose();
              if (destination === "ranking") {
                navigate("/ranking");
              } else {
                navigate("/time-attack");
              }
            }, 500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [isOpen, navigate, onClose, destination]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center animate-fadeIn">
          <h2 className="text-3xl font-bold mb-4 text-white">축하합니다!</h2>
          <div className="mb-6">
            <p className="text-xl text-yellow-300">획득 점수</p>
            <p className="text-5xl font-bold text-white">{score}</p>
          </div>
          <div className="mb-8">
            <p className="text-xl text-green-300">경험치 획득</p>
            <div className="flex items-center justify-center">
              <span className="text-5xl font-bold text-white">+{xpGained}</span>
              <span className="text-xl text-white ml-1">XP</span>
            </div>
          </div>
          {countdown > 0 ? (
            <p className="text-gray-200">
              {countdown}초 후{" "}
              {destination === "ranking" ? "랭킹 페이지" : "타임어택 페이지"}로
              이동합니다...
            </p>
          ) : (
            <p className="text-gray-200">이동 중...</p>
          )}
          <button
            onClick={() => {
              onClose();
              if (destination === "ranking") {
                navigate("/ranking");
              } else {
                navigate("/time-attack");
              }
            }}
            className="mt-4 bg-pic-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-pic-primary/90 transition"
          >
            바로 이동하기
          </button>
        </div>
      </div>
    </div>
  );
};

const TimeAttackResult: React.FC = () => {
  const location = useLocation() as LocationState;
  const navigate = useNavigate();

  // Zustand 상태 사용
  const result = useTimeAttackStore((state) => state.result);

  const [localResult, setLocalResult] = useState<TimeAttackResultData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentRanking, setCurrentRanking] = useState<number | null>(null);
  const [noMatch, setNoMatch] = useState<boolean>(false); // 일치 항목 없음 상태

  // 애니메이션 모달 상태
  const [showModal, setShowModal] = useState(false);
  const [modalDestination, setModalDestination] = useState<
    "ranking" | "timeattack"
  >("ranking");
  const [isSaving, setIsSaving] = useState(false);

  // 컴포넌트 마운트 시 데이터 설정
  useEffect(() => {
    console.log("분석 결과 데이터:", location.state?.result);
    console.log("Zustand 결과 데이터:", result);

    // 결과 데이터 설정
    if (location.state?.result) {
      setLocalResult(location.state.result);

      // 일치 항목 없음 직접 확인
      if (location.state.result?.message?.includes("일치 항목 없음")) {
        console.log("일치 항목 없음 감지됨 (location state)");
        setNoMatch(true);
      }
    } else if (result) {
      // Zustand 상태에서 결과 가져오기
      setLocalResult({
        score: result.score,
        topicAccuracy: result.topicAccuracy,
        analysisData: result.analysisData,
        image: result.image,
        topic: result.topic,
        ranking: result.ranking,
        imageName: `timeattack_${Date.now()}.jpg`,
        success: result.score > 0,
      });

      // 피드백에서 일치 항목 없음 확인
      if (
        result.feedback &&
        Array.isArray(result.feedback) &&
        result.feedback.some(
          (item) => typeof item === "string" && item.includes("일치 항목 없음")
        )
      ) {
        console.log("일치 항목 없음 감지됨 (zustand)");
        setNoMatch(true);
      }
    }

    setIsLoading(false);
  }, [location, result]);

  // 다시 도전하기 핸들러
  const handleTryAgain = () => {
    setModalDestination("timeattack");
    setShowModal(true);
  };

  // 랭킹 보기 핸들러
  const handleViewRanking = async () => {
    setIsSaving(true);

    try {
      if (!localResult) return;

      // 타임어택 결과 저장 API 호출
      await timeAttackApi.saveTimeAttackResult({
        imageName: localResult.imageName || `timeattack_${Date.now()}.jpg`,
        topic: localResult.topic || "",
        score: localResult.score || 0,
      });

      // 랭킹 데이터 조회도 필요하다면 여기서 수행

      // 애니메이션 모달 표시 (저장 성공 후)
      setModalDestination("ranking");
      setShowModal(true);
    } catch (error) {
      console.error("결과 저장 실패:", error);
      // 오류 처리
    } finally {
      setIsSaving(false);
    }
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 로딩 중이면 로딩 화면 표시
  if (isLoading) {
    return <LoadingState />;
  }

  // 일치 항목 없음이면 실패 화면 표시
  if (noMatch) {
    return (
      <Container>
        <FailureResult
          message={`주제 "${
            localResult?.translatedTopic || localResult?.topic || ""
          }"에 맞는 항목을 찾지 못했습니다.`}
          topic={localResult?.topic}
          translatedTopic={localResult?.translatedTopic}
          image={localResult?.image} // 이미지 전달
          onTryAgain={handleTryAgain}
        />
      </Container>
    );
  }

  // 결과 화면
  return (
    <Container>
      <main className="flex-1 p-4">
        {localResult?.score !== undefined &&
          localResult?.topicAccuracy !== undefined &&
          localResult?.analysisData && (
            <SuccessResult
              score={localResult.score}
              topicAccuracy={localResult.topicAccuracy}
              analysisData={localResult.analysisData}
              image={localResult.image || null}
              topic={localResult.topic || ""}
              translatedTopic={localResult.translatedTopic}
              imageName={
                localResult.imageName || `timeattack_${Date.now()}.jpg`
              }
              ranking={currentRanking || localResult.ranking || 0}
              onTryAgain={handleTryAgain}
              onViewRanking={handleViewRanking}
              isSaving={isSaving}
            />
          )}
      </main>

      {/* 애니메이션 모달 */}
      <AnimationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        score={localResult?.score || 0}
        xpGained={Math.floor((localResult?.score || 0) * 10)} // XP 계산 로직: 점수 * 10
        destination={modalDestination}
      />
    </Container>
  );
};

export default TimeAttackResult;
