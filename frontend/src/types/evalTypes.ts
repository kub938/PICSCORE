export interface ImageEvalResponse {
  imageUrl: string;
  imageName: string;
  score: number;
  analysisChart: null;
  analysisText: null;
  isPublic: true;
  photoType: "article" | "timeattack" | "contest";
  hashTags: string[];
}

export interface AnalysisScoreType {
  구도: number;
  노이즈: number;
  노출: number;
  "다이나믹 레인지": number;
  선명도: number;
  화이트밸런스: number;
}

export interface AnalysisFeedbackType {
  구도: string;
  노이즈: string;
  노출: string;
  "다이나믹 레인지": string;
  선명도: string;
  화이트밸런스: string;
}

export interface ImageEvalDetailProps {
  isModalOpen: boolean;
  closeDetail: () => void;
  score: number;
  analysisScore: AnalysisScoreType;
  analysisFeedback: AnalysisFeedbackType;
}
