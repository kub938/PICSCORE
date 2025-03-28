import { useEffect, useState } from "react";

function Loading() {
  const [dotCount, setDotCount] = useState(0);

  // 로딩 점(...) 애니메이션을 위한 effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // 점의 개수에 따른 텍스트
  const loadingText = `분석중${"".padEnd(dotCount, ".")}`;

  // PICSCORE 각 글자를 개별적으로 배치하기 위한 상수
  const letters = ["P", "I", "C", "S", "C", "O", "R", "E"];
  const radius = 20;
  const size = 20;
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {/* 회전하는 원 */}
        <div
          className="absolute w-full h-full animate-spin"
          style={{
            animationDuration: "8s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {letters.map((letter, index) => {
            const angle = index * 45 * (Math.PI / 180);
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 font-bold"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  fontSize: "20px",
                  color: index < 3 ? "#8BC34A" : "#000",
                  // 글자 자체는 회전하지 않도록 반대 방향으로 회전 보정
                  transform: "translate(-50%, -50%) rotate(0deg)",
                }}
              >
                {letter}
              </div>
            );
          })}
        </div>

        {/* 가운데 텍스트 - 애니메이션 적용 */}
        <div className="absolute flex items-center justify-center text-center">
          <span className="text-lg font-semibold text-gray-800 min-w-20 text-center">
            {loadingText}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
