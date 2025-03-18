import { atom } from "recoil";

// Types
interface User {
  isLoggedIn: boolean;
  userId: string | null;
  nickname: string | null;
  profileImage: string | null;
  token: string | null;
}

interface TimeAttackState {
  currentStep: number;
  timeLeft: number;
  isTimerActive: boolean;
  challengeTopic: string;
  selectedImageFile: File | null;
}

interface AnalysisData {
  composition: number;
  lighting: number;
  subject: number;
  color: number;
  creativity: number;
}

interface TimeAttackResult {
  score: number;
  topicAccuracy: number;
  analysisData: AnalysisData;
  image: string | null;
  topic: string;
  ranking: number;
  feedback: string[];
}

interface RankingState {
  timeframe: "today" | "week" | "month" | "all";
  rankings: Array<{
    rank: number;
    userId: string;
    nickname: string;
    profileImage: string | null;
    score: number;
    topic: string;
  }>;
  isLoading: boolean;
}

// User State
export const userState = atom<User>({
  key: "userState",
  default: {
    isLoggedIn: false,
    userId: null,
    nickname: null,
    profileImage: null,
    token: null,
  },
});

// TimeAttack States
export const timeAttackState = atom<TimeAttackState>({
  key: "timeAttackState",
  default: {
    currentStep: 1, // 1: Explanation, 2: Preparation, 3: Photo Upload
    timeLeft: 15,
    isTimerActive: false,
    challengeTopic: "",
    selectedImageFile: null,
  },
});

export const timeAttackResultState = atom<TimeAttackResult>({
  key: "timeAttackResultState",
  default: {
    score: 0,
    topicAccuracy: 0,
    analysisData: {
      composition: 0,
      lighting: 0,
      subject: 0,
      color: 0,
      creativity: 0,
    },
    image: null,
    topic: "",
    ranking: 0,
    feedback: [],
  },
});

// Ranking States
export const rankingState = atom<RankingState>({
  key: "rankingState",
  default: {
    timeframe: "today", // 'today', 'week', 'month', 'all'
    rankings: [],
    isLoading: false,
  },
});
