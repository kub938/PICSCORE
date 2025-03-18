import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// import { userState, timeAttackState } from '../../recoil/atoms';

// 컴포넌트 임포트
import Container from "./components/Container";
import Header from "./components/Header";
import ExplanationStep from "./components/ExplanationStep";
import PreparationStep from "./components/PreparationStep";
import PhotoUploadStep from "./components/PhotoUploadStep";

const TimeAttack: React.FC = () => {
  // State management
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
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [timeLeft, isTimerActive]);

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
          }, 1000);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const handleTimeUp = (): void => {
    setIsTimerActive(false);
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
