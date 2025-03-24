import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useTimeAttackStore } from "../../store/timeAttackStore";

// 컴포넌트 임포트
import Container from "./components/Container";
import Header from "./components/Header";
import ExplanationStep from "./components/ExplanationStep";
import PreparationStep from "./components/PreparationStep";
import PhotoUploadStep from "./components/PhotoUploadStep";

const TimeAttack: React.FC = () => {
  // Zustand store 사용
  const user = useUserStore((state) => state.user);
  const setGameState = useTimeAttackStore((state) => state.setGameState);
  const setResult = useTimeAttackStore((state) => state.setResult);

  // Local state 관리
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1); // 1: Explanation, 2: Preparation, 3: Photo Upload
  const [timeLeft, setTimeLeft] = useState<number>(15); // Countdown timer for photo capture
  const [countdown, setCountdown] = useState<number>(3); // Countdown for preparation
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [challengeTopic, setChallengeTopic] = useState<string>("다람쥐"); // Example topic
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      // Zustand에 선택된 이미지 파일 저장
      setGameState({ selectedImageFile: file });
    }
  };

  const handleImageSubmit = (): void => {
    // Here you would implement the API call to upload and analyze the image
    // For example:
    // const formData = new FormData();
    // formData.append('photo', selectedImageFile);
    // axios.post('api/v1/photo/analysis', formData)
    //   .then(response => {
    //     // Handle the response, perhaps navigate to a results page
    //     navigate('/time-attack/result', { state: { result: response.data } });
    //   })
    //   .catch(error => {
    //     console.error('Error uploading photo:', error);
    //   });

    // 분석 결과 Zustand에 저장
    setResult({
      score: 85,
      topicAccuracy: 92,
      analysisData: {
        composition: 88,
        lighting: 82,
        subject: 90,
        color: 84,
        creativity: 87,
      },
      image: selectedImage,
      topic: challengeTopic,
      ranking: 5,
      feedback: [
        "주제에 맞는 사진을 잘 촬영했습니다.",
        "조명이 조금 더 밝으면 좋을 것 같습니다.",
      ],
    });

    // For now, just simulate going to results
    navigate("/time-attack/result", {
      state: {
        result: {
          success: true,
          score: 85,
          topicAccuracy: 92,
          analysisData: {
            composition: 88,
            lighting: 82,
            subject: 90,
            color: 84,
            creativity: 87,
          },
          image: selectedImage,
          topic: challengeTopic,
          ranking: 5,
          xpEarned: 97,
        },
      },
    });
  };

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
          />
        );

      default:
        return <div>에러가 발생했습니다.</div>;
    }
  };

  return (
    <Container>
      <Header title="타임어택" />
      <main className="flex-1 flex flex-col">{renderStep()}</main>
    </Container>
  );
};

export default TimeAttack;
