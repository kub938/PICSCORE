import { atom } from "recoil";
import { TimeAttackState, TimeAttackResult } from "../types/timeAttackTypes";

// TimeAttack State Atom
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

// TimeAttack Result State Atom
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
