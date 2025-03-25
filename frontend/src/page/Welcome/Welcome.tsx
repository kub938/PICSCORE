import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const messages = [
    "환영합니다!",
    "당신의 사진을 평가해 드립니다",
    "다른사람들과 경쟁하며 사진 실력을 키워보세요!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        if (activeIndex === messages.length - 1) {
          // 마지막 메시지 후 로그인 페이지로 이동
          navigate("/login");
          return;
        }
        setActiveIndex((prevIndex) => prevIndex + 1);
        setVisible(true);
      }, 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, messages.length, navigate]);

  const handleClick = () => {
    if (activeIndex === messages.length - 1) {
      // 마지막 메시지에서 클릭 시 로그인 페이지로 이동
      navigate("/login");
    } else {
      setVisible(false);
      setTimeout(() => {
        setActiveIndex((prevIndex) => prevIndex + 1);
        setVisible(true);
      }, 1000);
    }
  };

  return (
    <div
      className="flex flex-col w-full items-center justify-center h-screen bg-white cursor-pointer"
      onClick={handleClick}
    >
      {/* PIC (초록) SCORE (검정) 로고 */}
      <div className="mb-20 text-5xl font-logo">
        <span className="text-pic-primary">PIC</span>
        <span className="text-black">SCORE</span>
      </div>

      <div
        className={`text-center font-bold transition-all duration-800 ease-in-out ${
          visible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-4"
        }`}
      >
        {activeIndex === 0 && (
          <div className="text-4xl text-black font-bold mb-6">
            {messages[0]}
          </div>
        )}

        {activeIndex === 1 && (
          <div className="text-2xl text-black font-medium mb-6">
            {messages[1]}
          </div>
        )}

        {activeIndex === 2 && (
          <div className="text-2xl text-black font-medium px-6 max-w-lg mb-6">
            {messages[2]}
            <div className="text-base text-gray-600 mt-6">
              직접 사진을 찍고 점수 확인해 보세요!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Welcome;
