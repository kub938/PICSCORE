// page/Timeattack/Timeattack.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTimeAttackStore } from "../../store/timeAttackStore";

// 컴포넌트 임포트
import Container from "./components/Container";
import ExplanationStep from "./components/ExplanationStep";
import PreparationStep from "./components/PreparationStep";
import PhotoUploadStep from "./components/PhotoUploadStep";
import { timeAttackApi } from "../../api/timeAttackApi";

// 타임어택 주제 목록 (실제 환경에서는 서버에서 가져올 수 있음)
const TOPICS = ["dog", "cat"];

const TimeAttack: React.FC = () => {
  // Zustand store 사용
  const setGameState = useTimeAttackStore((state) => state.setGameState);
  const setResult = useTimeAttackStore((state) => state.setResult);

  // Local state 관리
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1); // 1: Explanation, 2: Preparation, 3: Photo Upload
  const [timeLeft, setTimeLeft] = useState<number>(15); // Countdown timer for photo capture
  const [countdown, setCountdown] = useState<number>(3); // Countdown for preparation
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [challengeTopic, setChallengeTopic] = useState<string>(""); // 실제 주제
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle timer countdown
  useEffect(() => {
    let timer: number | undefined;
    if (isTimerActive && timeLeft > 0) {
      timer = window.setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        // Zustand에도 현재 시간 업데이트
        setGameState({ timeLeft: timeLeft - 1 });
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [timeLeft, isTimerActive, setGameState]);

  // TimeAttack 게임 시작 시 Zustand 상태 업데이트
  useEffect(() => {
    setGameState({
      currentStep: step,
      timeLeft,
      isTimerActive,
      challengeTopic,
    });
  }, [step, timeLeft, isTimerActive, challengeTopic, setGameState]);

  const handleStartGame = (): void => {
    // 랜덤 주제 선택
    const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    setChallengeTopic(randomTopic);

    setStep(2);
    setCountdown(3);

    // Start countdown from 3 to 1
    const countdownInterval = window.setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(countdownInterval);
          // Move to step 3 (photo upload) and start the photo timer
          setTimeout(() => {
            setStep(3);
            setIsTimerActive(true);
            // Zustand 상태 업데이트
            setGameState({
              currentStep: 3,
              isTimerActive: true,
              challengeTopic: randomTopic,
            });
          }, 1000);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const handleTimeUp = (): void => {
    setIsTimerActive(false);
    setGameState({ isTimerActive: false });

    // Navigate to results page with a failure message
    navigate("/time-attack/result", {
      state: {
        result: {
          success: false,
          message: "시간 초과! 다시 도전해보세요.",
          topic: challengeTopic,
        },
      },
    });
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setSelectedImageFile(file);
      // Zustand에 선택된 이미지 파일 저장
      setGameState({ selectedImageFile: file });
    }
  };

  async function handleImageSubmit(): Promise<void> {
    if (!selectedImageFile) return;

    setIsLoading(true);

    try {
      // API 호출하여 사진 분석
      const response = await timeAttackApi.analyzePhoto(
        selectedImageFile,
        challengeTopic
      );
      const analysisData = response.data.data;

      console.log("분석 결과:", analysisData);

      // 점수 계산 (예시: 신뢰도를 백분율로 변환)
      const score = Math.round(analysisData.confidence * 100);
      const topicAccuracy = Math.round(analysisData.confidence * 100);

      // 분석 결과 Zustand에 저장
      setResult({
        score,
        topicAccuracy,
        analysisData: {
          composition: 85, // 예시 값 (실제 API에서 제공되지 않는 경우)
          lighting: 80,
          subject: topicAccuracy,
          color: 75,
          creativity: 70,
        },
        image: selectedImage,
        topic: challengeTopic,
        ranking: 10, // 임시 값
        feedback: [
          `주제 "${challengeTopic}"에 대한 연관성: ${topicAccuracy}%`,
          analysisData.name === "일치 항목 없음"
            ? "주제와 연관된 요소를 찾지 못했습니다."
            : `이미지에서 "${analysisData.name}" 항목이 식별되었습니다.`,
        ],
      });

      // 결과 페이지로 이동
      navigate("/time-attack/result", {
        state: {
          result: {
            success: true,
            score,
            topicAccuracy,
            analysisData: {
              composition: 85,
              lighting: 80,
              subject: topicAccuracy,
              color: 75,
              creativity: 70,
            },
            image: selectedImage,
            topic: challengeTopic,
            ranking: 10,
            xpEarned: Math.floor(score * 1.2), // XP 계산 예시
          },
        },
      });
    } catch (error) {
      console.error("사진 분석 오류:", error);

      // 오류 발생 시 실패 결과 페이지로 이동
      navigate("/time-attack/result", {
        state: {
          result: {
            success: false,
            message: "사진 분석 중 오류가 발생했습니다. 다시 시도해주세요.",
            topic: challengeTopic,
          },
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Render different steps of the Time Attack feature
  const renderStep = (): React.ReactNode => {
    switch (step) {
      case 1: // Explanation
        return <ExplanationStep onStartGame={handleStartGame} />;

      case 2: // Preparation/Countdown
        return <PreparationStep countdown={countdown} />;

      case 3: // Photo Upload
        return (
          <PhotoUploadStep
            timeLeft={timeLeft}
            challengeTopic={challengeTopic}
            selectedImage={selectedImage}
            onImageUpload={handleImageUpload}
            onImageSubmit={handleImageSubmit}
            isLoading={isLoading}
          />
        );

      default:
        return <div>에러가 발생했습니다.</div>;
    }
  };

  return (
    <Container>
      <main className="flex-1 flex flex-col">{renderStep()}</main>
    </Container>
  );
};

export default TimeAttack;
