import { useEffect, useState } from "react";

function Loading() {
  const [opacity, setOpacity] = useState(1);

  // 페이드 인/아웃 애니메이션을 위한 effect
  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((prev) => (prev === 1 ? 0.3 : 1));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // PICSCORE 각 글자를 개별적으로 배치하기 위한 상수
  const letters = ["P", "I", "C", "S", "C", "O", "R", "E"];
  const radius = 100; // 원의 반지름
  const containerSize = 250; // 컨테이너 크기

  return (
    <div className="fixed h-screen min-w-md bg-white/80 flex flex-col justify-center items-center">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
        }}
      >
        {/* 회전하는 원 - 전체가 한 번에 회전합니다 */}
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
                className="absolute font-bold text-2xl"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  color: index < 3 ? "#8BC34A" : "#000",
                  // 글자 자체는 회전하지 않도록 수정했습니다
                  transform: "translate(-50%, -50%)",
                }}
              >
                {letter}
              </div>
            );
          })}
        </div>

        {/* 페이드 인/아웃되는 "분석중" 텍스트 */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transition: "opacity 0.8s ease-in-out",
            opacity: opacity,
          }}
        >
          <span className="text-xl font-semibold text-gray-800">분석중</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
