import React, { useState, useEffect, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";

// Placeholder for Recoil state that would be defined in your actual state file
// import { userState, timeAttackState } from '../recoil/atoms';

// Types
interface ContainerProps {
  children: ReactNode;
}

// Styled components using TailwindCSS classes
const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="flex flex-col max-w-md mx-auto min-h-screen bg-gray-50">
    {children}
  </div>
);

const Header: React.FC = () => (
  <header className="flex items-center p-4 border-b">
    <Link to="/" className="p-2">
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
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </Link>
    <h1 className="mx-auto text-xl font-logo">타임어택</h1>
  </header>
);

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
    navigate("/time-attack/result");
  };

  // Render different steps of the Time Attack feature
  const renderStep = (): React.ReactNode => {
    switch (step) {
      case 1: // Explanation
        return (
          <div className="flex flex-col flex-1 p-4">
            <h2 className="text-2xl font-logo mb-6 text-center">
              타임어택 룰 설명
            </h2>

            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-200 text-green-500 font-bold text-xl">
                1
              </div>
              <div className="ml-4 border p-4 rounded-lg flex-1">
                <p className="font-bold">게임시작을 누르면 3초 뒤</p>
                <p className="text-gray-600">주제가 주어집니다.</p>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-200 text-green-500 font-bold text-xl">
                2
              </div>
              <div className="ml-4 border p-4 rounded-lg flex-1">
                <p className="font-bold">주제를 확인하고 15초 내에</p>
                <p className="text-gray-600">
                  주제에 맞는 사진을 찍고 업로드하세요!
                </p>
              </div>
            </div>

            <div className="flex items-center mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-200 text-green-500 font-bold text-xl">
                3
              </div>
              <div className="ml-4 border p-4 rounded-lg flex-1">
                <p className="font-bold">정확도 및 사진점수에 따라</p>
                <p className="text-gray-600">보상이 주어집니다.</p>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded-lg mb-8">
              <h3 className="text-green-700 font-bold mb-2">TIP!</h3>
              <ul className="list-disc list-inside text-green-700">
                <li>게임 시작 전 주변 환경을 미리 둘러보세요</li>
                <li>시간이 넉넉하지 않으니 빠르게 촬영하세요</li>
              </ul>
            </div>

            <button
              onClick={handleStartGame}
              className="mt-auto bg-green-500 text-white py-4 rounded-lg text-xl font-bold hover:bg-green-600 transition"
            >
              게임 시작
            </button>
          </div>
        );

      case 2: // Preparation/Countdown
        return (
          <div className="flex flex-col items-center justify-center flex-1 p-4 text-center">
            <h2 className="text-2xl font-logo mb-6">준비하세요!</h2>
            <p className="text-gray-600 mb-8">곧 주제가 공개됩니다</p>

            <div className="flex items-center justify-center w-32 h-32 rounded-full bg-green-100 mb-16">
              <span className="text-green-500 text-8xl font-bold">
                {countdown}
              </span>
            </div>

            <div className="bg-yellow-100 p-4 rounded-lg w-full">
              <h3 className="text-yellow-700 font-bold mb-2">주의!</h3>
              <p className="text-yellow-700">
                주제 공개 후 15초 이내에
                <br />
                주어진 주제의 사진을 촬영해주세요.
              </p>
            </div>
          </div>
        );

      case 3: // Photo Upload
        return (
          <div className="flex flex-col flex-1 p-4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="text-center text-gray-600 text-sm">남은 시간</div>
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-4xl font-bold">
                  {timeLeft}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="text-center text-gray-600 text-sm">
                오늘의 주제
              </div>
              <div className="bg-gray-100 p-3 mt-2 rounded-lg text-center text-xl font-bold">
                {challengeTopic}
              </div>
            </div>

            <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 mb-4">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Captured"
                  className="max-h-full object-contain"
                />
              ) : (
                <>
                  <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                    <div className="text-green-500 mb-2">
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
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-center">
                      사진을 업로드 또는 촬영 해주세요
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </>
              )}
            </div>

            {selectedImage && (
              <button
                onClick={handleImageSubmit}
                className="mt-3 bg-green-500 text-white py-4 rounded-lg text-xl font-bold hover:bg-green-600 transition"
              >
                등록
              </button>
            )}
          </div>
        );

      default:
        return <div>에러가 발생했습니다.</div>;
    }
  };

  return (
    <Container>
      <Header />
      <main className="flex-1 flex flex-col">{renderStep()}</main>
    </Container>
  );
};

export default TimeAttack;
