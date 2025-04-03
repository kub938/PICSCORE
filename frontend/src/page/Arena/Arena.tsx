// page/Arena/Arena.tsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { arenaApi, ArenaPhoto, ArenaResultData } from "../../api/arenaApi";

// 컴포넌트 임포트
import Container from "./components/Container";
import ExplanationStep from "./components/ExplanationStep";
import PreparationStep from "./components/PreparationStep";
import GameStep from "./components/GameStep";
import LoadingState from "./components/LoadingState";
import ContentNavBar from "../../components/NavBar/ContentNavBar";
import BottomBar from "../../components/BottomBar/BottomBar";
import Modal from "../../components/Modal";

// 게임 상태 인터페이스
interface GameState {
  isActive: boolean;
  timeLeft: number;
  photos: ArenaPhoto[];
  userOrder: number[];
  completed: boolean;
}

const Arena: React.FC = () => {
  // Local state 관리
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>({
    isActive: false,
    timeLeft: 30,
    photos: [],
    userOrder: [],
    completed: false,
  });
  const [step, setStep] = useState<number>(1); // 1: Explanation, 2: Preparation, 3: Game
  const [timeLeft, setTimeLeft] = useState<number>(30); // Countdown timer
  const [countdown, setCountdown] = useState<number>(3); // Countdown for preparation
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [photos, setPhotos] = useState<ArenaPhoto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  // 타이머 ID를 위한 ref 생성 (리렌더링 방지)
  const timerRef = useRef<number | undefined>();

  // 결과 계산 - useCallback으로 최적화하여 불필요한 재계산 방지
  const calculateResult = useCallback((): ArenaResultData => {
    const { userOrder, photos, timeLeft } = gameState;

    // 점수 순서대로 정렬된 정답 배열 계산
    const correctOrder = [...photos]
      .sort((a, b) => b.score - a.score)
      .map((photo) => photo.id);

    // 전체 정답 여부 확인 (0 또는 1) - UI 표시용
    let correctCount = 0;

    // 사용자 선택과 정답 순서 일치 여부 확인
    const isFullyCorrect =
      userOrder.length === correctOrder.length &&
      userOrder.every((id, index) => id === correctOrder[index]);

    if (isFullyCorrect) {
      correctCount = 1;
    }

    // 부분적으로 맞은 개수 계산 (백엔드 전송용)
    let correct = 0;
    for (let i = 0; i < userOrder.length && i < correctOrder.length; i++) {
      if (userOrder[i] === correctOrder[i]) {
        correct++;
      }
    }

    // 소요 시간 계산 (30초에서 남은 시간 빼기)
    const timeSpent = timeLeft > 0 ? 30 - timeLeft : 30;

    // 점수 계산 (정확한 로직은 백엔드와 일치해야 함)
    // 예시: 모두 맞추면 최대 점수 + 남은 시간 보너스, 아니면 부분 점수
    const score =
      correctCount === 1 ? 100 + timeLeft * 10 : correct * 25;

    return {
      correctCount, // 전체 정답 여부 (0 또는 1) - UI용
      correct,      // 부분 정답 개수 (0~4) - 백엔드 전송용
      timeSpent,
      remainingTime: timeLeft,
      photos: gameState.photos,
      userOrder: gameState.userOrder,
      score,
    };
  }, [gameState]);

  // 결과 페이지로 이동 - useCallback으로 최적화
  const navigateToResult = useCallback((result: ArenaResultData) => {
    // 세션 스토리지에 결과 저장 (페이지 전환 시 데이터 유지를 위해)
    sessionStorage.setItem("arenaResult", JSON.stringify(result));

    // 결과 페이지로 이동
    navigate("/arena/result");
  }, [navigate]);

  const handleTimeUp = useCallback((): void => {
    setIsTimerActive(false);
    setGameState((prev) => ({
      ...prev,
      isActive: false,
    }));

    // 결과 계산 및 결과 페이지로 이동
    const result = calculateResult();
    navigateToResult(result);
  }, [calculateResult, navigateToResult]);

  // 타이머 로직을 useCallback으로 최적화
  const updateTimer = useCallback(() => {
    if (isTimerActive && timeLeft > 0) {
      setTimeLeft(prevTime => prevTime - 1);
    } else if (timeLeft === 0 && isTimerActive) {
      handleTimeUp();
    }
  }, [isTimerActive, timeLeft, handleTimeUp]);

  // timeLeft 상태가 업데이트될 때만 게임 상태 동기화
  useEffect(() => {
    if (isTimerActive) {
      setGameState(prev => ({
        ...prev,
        timeLeft: timeLeft
      }));
    }
  }, [timeLeft, isTimerActive]);

  // 타이머 설정 및 해제 로직 분리
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      // setTimeout 대신 setInterval 사용하여 메모리 효율 개선
      // 각 setTimeout 호출이 별도 스택 프레임 차지하는 대신, 
      // setInterval은 단일 타이머 인스턴스만 유지
      timerRef.current = window.setInterval(updateTimer, 1000);
    } else {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    }

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    };
  }, [isTimerActive, updateTimer]);

  // 랜덤 사진 가져오기
  const fetchRandomPhotos = async () => {
    try {
      setIsLoading(true);
      // api/v2/arena/random 엔드포인트 호출
      const response = await arenaApi.getRandomPhotos();
      const data = response.data.data;

      if (!data || !data.photos || data.photos.length !== 4) {
        throw new Error("사진 데이터를 가져오지 못했습니다");
      }

      // 사진 설정
      const photosData = data.photos;
      setPhotos(photosData);

      // 게임 상태 업데이트
      setGameState({
        isActive: true,
        timeLeft: 30,
        photos: photosData,
        userOrder: [],
        completed: false,
      });

      console.log("가져온 사진:", photosData);

      return true;
    } catch (error) {
      console.error("사진 가져오기 오류:", error);
      setError("사진을 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.");
      setShowErrorModal(true);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const startGame = async () => {
    // 사진 불러오기
    const success = await fetchRandomPhotos();

    if (success) {
      // 게임 단계로 진행
      setStep(3);
      // 타이머 시작
      setIsTimerActive(true);
      setTimeLeft(30);
    } else {
      // 오류 시 처음 단계로 돌아가기
      setStep(1);
    }
  };

  const handleStartGame = useCallback(async (): Promise<void> => {
    // 게임 시작 로직
    setStep(2);
    setCountdown(3);

    // 3초 카운트다운
    const countdownInterval = window.setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(countdownInterval);
          // 사진 불러오기 및 게임 시작
          startGame();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  }, []);

  const handlePhotoSelect = useCallback((photoId: number): void => {
    // 이미 선택된 사진이면 추가하지 않음
    if (gameState.userOrder.includes(photoId)) {
      return;
    }

    // 최대 4개까지만 추가
    if (gameState.userOrder.length >= 4) {
      return;
    }

    const newUserOrder = [...gameState.userOrder, photoId];

    // 모든 사진이 선택되었는지 확인
    const completed = newUserOrder.length === 4;

    setGameState(prev => ({
      ...prev,
      userOrder: newUserOrder,
      completed,
    }));
  }, [gameState]);

  const handleRemoveSelection = useCallback((index: number): void => {
    const newUserOrder = [...gameState.userOrder];
    newUserOrder.splice(index, 1);

    setGameState(prev => ({
      ...prev,
      userOrder: newUserOrder,
      completed: false,
    }));
  }, [gameState]);

  const handleSubmit = useCallback((): void => {
    // 타이머 중지
    setIsTimerActive(false);
    setGameState((prev) => ({
      ...prev,
      isActive: false,
    }));

    // 결과 계산 및 결과 페이지로 이동
    const result = calculateResult();
    navigateToResult(result);
  }, [calculateResult, navigateToResult]);

  // Render different steps of the Arena feature - useMemo로 최적화하여 불필요한 리렌더링 방지
  const renderStepContent = useMemo(() => {
    if (isLoading && step !== 1) {
      return <LoadingState />;
    }

    switch (step) {
      case 1: // Explanation
        return <ExplanationStep onStartGame={handleStartGame} />;

      case 2: // Preparation/Countdown
        return <PreparationStep countdown={countdown} />;

      case 3: // Game
        return (
          <GameStep
            timeLeft={timeLeft}
            photos={photos}
            userOrder={gameState.userOrder}
            onPhotoSelect={handlePhotoSelect}
            onRemoveSelection={handleRemoveSelection}
            onSubmit={handleSubmit}
            isComplete={gameState.completed}
          />
        );

      default:
        return <div>에러가 발생했습니다.</div>;
    }
  }, [
    step, 
    isLoading, 
    countdown, 
    timeLeft, 
    photos, 
    gameState.userOrder, 
    gameState.completed, 
    handleStartGame, 
    handlePhotoSelect, 
    handleRemoveSelection, 
    handleSubmit
  ]);

  return (
    <Container>
      {step !== 1 && <ContentNavBar content="사진 점수 맞추기" />}
      <main className="flex-1 flex flex-col">{renderStepContent}</main>
      {step !== 1 && <BottomBar />}

      {/* 에러 모달 */}
      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="오류"
        description={
          <div className="text-gray-600">
            <p>{error}</p>
          </div>
        }
        buttons={[
          {
            label: "확인",
            textColor: "gray",
            onClick: () => setShowErrorModal(false),
          },
        ]}
      />
    </Container>
  );
};

export default Arena;
