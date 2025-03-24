import React from "react";

// 차트 데이터 타입 정의
interface ImageEvalData {
  구도: number;
  조명: number;
  색상: number;
  선명도: number;
  기술: number;
}

// 컴포넌트 속성 타입 정의
interface RadarChartProps {
  data?: ImageEvalData;
}

// 포인트 좌표에 대한 타입 정의
interface Point {
  x: number;
  y: number;
}

// 레이블 포인트에 대한 타입 정의
interface LabelPoint extends Point {
  angle: number;
}

const RadarChart: React.FC<RadarChartProps> = ({
  data = {
    구도: 85,
    조명: 78,
    색상: 92,
    선명도: 83,
    기술: 88,
  },
}) => {
  // 차트의 설정값
  const centerX: number = 150;
  const centerY: number = 150;
  const maxRadius: number = 120;

  // 점수에 따른 각 축의 좌표 계산
  const calculatePoint = (
    value: number,
    index: number,
    total: number
  ): Point => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  // 차트 축 라벨의 좌표 계산
  const calculateLabelPoint = (index: number, total: number): LabelPoint => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const radius = maxRadius + 20;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      angle: angle * (180 / Math.PI),
    };
  };

  // 데이터 포인트 및 레이블 계산
  const categories: string[] = Object.keys(data);
  const total: number = categories.length;
  const points: Point[] = categories.map((category, i) =>
    calculatePoint(data[category as keyof ImageEvalData], i, total)
  );
  const labelPoints: LabelPoint[] = categories.map((_, i) =>
    calculateLabelPoint(i, total)
  );

  // 다각형 경로 생성
  const polygonPoints: string = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  // 그리드 레벨 (배경 오각형들)
  const gridLevels: number[] = [20, 40, 60, 80, 100];

  return (
    <div className="flex justify-center items-center w-full h-full">
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* 배경 그리드 오각형들 */}
        {gridLevels.map((level, i) => {
          const gridPoints: Point[] = categories.map((_, idx) =>
            calculatePoint(level, idx, total)
          );
          const gridPolygon: string = gridPoints
            .map((point) => `${point.x},${point.y}`)
            .join(" ");

          return (
            <polygon
              key={`grid-${i}`}
              points={gridPolygon}
              fill="none"
              stroke="#ddd"
              strokeWidth="1"
            />
          );
        })}

        {/* 축 선 */}
        {categories.map((_, i) => {
          const point: Point = calculatePoint(100, i, total);
          return (
            <line
              key={`axis-${i}`}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke="#ddd"
              strokeWidth="1"
            />
          );
        })}

        {/* 데이터 다각형 */}
        <polygon
          points={polygonPoints}
          fill="rgba(59, 130, 246, 0.5)"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* 데이터 포인트 */}
        {points.map((point, i) => (
          <circle
            key={`point-${i}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#3b82f6"
          />
        ))}

        {/* 카테고리 레이블 */}
        {categories.map((category, i) => {
          const labelPoint: LabelPoint = labelPoints[i];

          // 카테고리별 위치 조정 (타이틀용)
          let titleAnchor: string = "middle";
          let titleDx: number = 0;
          let titleDy: number = 0;

          // 카테고리별 위치 조정 (점수용)
          let scoreDx: number = 0;
          let scoreDy: number = 0;
          let scoreAnchor: string = "middle";

          // 카테고리별 개별 위치 조정
          if (category === "구도") {
            titleAnchor = "start";
            titleDx = -9;
            titleDy = 0;
            scoreAnchor = "start";
            scoreDx = -12;
            scoreDy = 14;
          } else if (category === "조명") {
            titleAnchor = "middle";
            titleDy = 0;
            titleDx = 0;
            scoreAnchor = "middle";
            scoreDx = 0;
            scoreDy = 14;
          } else if (category === "색상") {
            titleAnchor = "end";
            titleDx = 10;
            titleDy = 0;
            scoreAnchor = "end";
            scoreDx = 13;
            scoreDy = 14;
          } else if (category === "선명도") {
            titleAnchor = "end";
            titleDx = 17;
            titleDy = 0;
            scoreAnchor = "end";
            scoreDx = 13;
            scoreDy = 15;
          } else if (category === "기술") {
            titleAnchor = "start";
            titleDy = -2;
            titleDx = -10;
            scoreAnchor = "start";
            scoreDx = -12;
            scoreDy = 12;
          }

          return (
            <g key={`label-${i}`}>
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                dx={titleDx}
                dy={titleDy}
                textAnchor={titleAnchor}
                fontSize="12"
                fontWeight="bold"
                fill="#4b5563"
              >
                {category}
              </text>
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                dx={scoreDx}
                dy={scoreDy}
                textAnchor={scoreAnchor}
                fontSize="12"
                fontWeight="bold"
                fill="#4b5563"
              >
                ({data[category as keyof ImageEvalData]})
              </text>
            </g>
          );
        })}

        {/* 중앙 점 */}
        <circle cx={centerX} cy={centerY} r="2" fill="#6b7280" />
      </svg>
    </div>
  );
};

export default RadarChart;
