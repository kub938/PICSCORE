// Button 컴포넌트 속성 인터페이스
export interface ButtonProps {
  color: "white" | "green";
  width: number;
  height: number;
  content: string;
  onClick?: () => void;
}

// 공통 헤더 속성 인터페이스 (여러 페이지에서 공통으로 사용)
export interface CommonHeaderProps {
  title: string;
}
