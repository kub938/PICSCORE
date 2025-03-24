import { create } from "zustand";
import { TimeAttackState, TimeAttackResult } from "../types/timeAttackTypes";

interface TimeAttackStore {
  gameState: TimeAttackState;
  result: TimeAttackResult;
  setGameState: (state: Partial<TimeAttackState>) => void;
  setResult: (result: TimeAttackResult) => void;
  resetGameState: () => void;
}

const initialGameState: TimeAttackState = {
  currentStep: 1,
  timeLeft: 15,
  isTimerActive: false,
  challengeTopic: "",
  selectedImageFile: null,
};

const initialResult: TimeAttackResult = {
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
};

export const useTimeAttackStore = create<TimeAttackStore>((set) => ({
  gameState: initialGameState,
  result: initialResult,
  setGameState: (state) =>
    set((prev) => ({
      gameState: { ...prev.gameState, ...state },
    })),
  setResult: (result) => set({ result }),
  resetGameState: () =>
    set({
      gameState: initialGameState,
      result: initialResult,
    }),
}));
