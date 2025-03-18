// TimeAttack 상태 인터페이스
export interface TimeAttackState {
  currentStep: number;
  timeLeft: number;
  isTimerActive: boolean;
  challengeTopic: string;
  selectedImageFile: File | null;
}

// 분석 데이터 인터페이스
export interface AnalysisData {
  composition: number;
  lighting: number;
  subject: number;
  color: number;
  creativity: number;
}

// TimeAttack 결과 인터페이스
export interface TimeAttackResult {
  score: number;
  topicAccuracy: number;
  analysisData: AnalysisData;
  image: string | null;
  topic: string;
  ranking: number;
  feedback: string[];
}

// TimeAttack 결과 데이터 인터페이스 (컴포넌트용)
export interface TimeAttackResultData {
  score?: number;
  topicAccuracy?: number;
  analysisData?: AnalysisData;
  image?: string | null;
  topic?: string;
  ranking?: number;
  success: boolean;
  message?: string;
  xpEarned?: number;
}

// Location에서 전달되는 결과 상태 인터페이스
export interface LocationState {
  state: {
    result?: TimeAttackResultData;
  };
}

// 컨테이너 컴포넌트 속성 인터페이스
export interface ContainerProps {
  children: React.ReactNode;
}

// 설명 단계 컴포넌트 속성 인터페이스
export interface ExplanationStepProps {
  onStartGame: () => void;
}

// 실패 결과 컴포넌트 속성 인터페이스
export interface FailureResultProps {
  message: string;
  topic?: string;
}

// 준비 단계 컴포넌트 속성 인터페이스
export interface PreparationStepProps {
  countdown: number;
}

// 사진 업로드 단계 컴포넌트 속성 인터페이스
export interface PhotoUploadStepProps {
  timeLeft: number;
  challengeTopic: string;
  selectedImage: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSubmit: () => void;
}

// 성공 결과 컴포넌트 속성 인터페이스
export interface SuccessResultProps {
  score: number;
  topicAccuracy: number;
  analysisData: AnalysisData;
  image: string | null;
  topic: string;
  ranking: number;
}

// 비디오 애니메이션 컴포넌트 속성 인터페이스
export interface VideoAnimationProps {
  videoSrc: string;
  xpGained: number;
  showXpGained: boolean;
  showTotalXp: boolean;
  onVideoEnd: () => void;
}
