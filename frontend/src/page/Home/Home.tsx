import { Link } from "react-router-dom";
import BottomBar from "../../components/BottomBar/BottomBar";
import NavBar from "../../components/NavBar/NavBar";
import profileImage from "../../assets/profile.jpg";
import contest from "../../assets/contest.png";
import time from "../../assets/time.png";
import board from "../../assets/board.png";
import ranking from "../../assets/ranking.png";
import { useAuthStore } from "../../store/authStore";
import { useEffect } from "react";

function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loginSuccess = params.get("loginSuccess");
    if (loginSuccess) {
      login();
    }
  });
  return (
    <>
      <div className="flex flex-col w-full items-center ">
        {/* 프로필 이미지 섹션 */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden border-3 border-white mb-4">
            <img
              src={profileImage}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="font-bold text-ffffff text-2xl mb-2">태열</h2>
          <div className="w-[200px] text-center mb-5 flex items-center justify-center">
            <span className="font-bold text-ffffff mr-2">LV.30</span>
            <div className="bg-white/30 h-2.5 rounded-full flex-1">
              <div className="w-[30%] h-full bg-yellow-300 rounded-full"></div>
            </div>
          </div>
          <Link to="/image-upload">
            <div className="relative transition-all duration-300 hover:scale-105">
              <div className="font-bold bg-white px-5 py-2.5 rounded-full text-pic-primary">
                <button>사진 찍기</button>
              </div>
            </div>
          </Link>
        </div>
        {/* 메뉴 그리드 섹션 */}
        <div className="grid grid-cols-2 gap-5 w-full p-4 max-w-[400px]">
          {/* 타임어택 */}
          <Link to="/time-attack">
            <div className="bg-white rounded-xl p-5 flex flex-col items-center shadow-lg relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
              <div className="absolute inset-0 bg-white rounded-xl shadow-xl"></div>
              <div className="relative mb-2 z-10">
                <div className="absolute -inset-[0.625rem] rounded-full bg-pic-primary opacity-40 blur-sm -z-10 transition-opacity duration-300 group-hover:opacity-60"></div>
                <div className="w-20 h-20 rounded-full bg-pic-primary flex items-center justify-center shadow-sm relative transition-transform duration-300 hover:scale-105">
                  <img src={time} alt="시계 아이콘" className="w-10 h-10" />
                </div>
              </div>
              <span className="font-bold text-gray-700 relative z-10">
                타임어택
              </span>
            </div>
          </Link>

          {/* 컨테스트 */}
          <Link to="/contest">
            <div className="bg-white rounded-xl p-5 flex flex-col items-center shadow-lg relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
              <div className="absolute inset-0 bg-white rounded-xl shadow-xl"></div>
              <div className="relative mb-2 z-10">
                <div className="absolute -inset-[0.625rem] rounded-full bg-pic-primary opacity-40 blur-sm -z-10 transition-opacity duration-300 group-hover:opacity-60"></div>
                <div className="w-20 h-20 rounded-full bg-pic-primary flex items-center justify-center shadow-sm relative transition-transform duration-300 hover:scale-105">
                  <img
                    src={contest}
                    alt="트로피 아이콘"
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <span className="font-bold text-gray-700 relative z-10">
                컨테스트
              </span>
            </div>
          </Link>

          {/* 게시글 */}
          <Link to="/board">
            <div className="bg-white rounded-xl p-5 flex flex-col items-center shadow-lg relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
              <div className="absolute inset-0 bg-white rounded-xl shadow-xl"></div>
              <div className="relative mb-2 z-10">
                <div className="absolute -inset-[0.625rem] rounded-full bg-pic-primary opacity-40 blur-sm -z-10 transition-opacity duration-300 group-hover:opacity-60"></div>
                <div className="w-20 h-20 rounded-full bg-pic-primary flex items-center justify-center shadow-sm relative transition-transform duration-300 hover:scale-105">
                  <img src={board} alt="게시판 아이콘" className="w-10 h-10" />
                </div>
              </div>
              <span className="font-bold text-gray-700 relative z-10">
                게시글
              </span>
            </div>
          </Link>

          {/* 랭킹 */}
          <Link to="/ranking">
            <div className="bg-white rounded-xl p-5 flex flex-col items-center shadow-lg relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
              <div className="absolute inset-0 bg-white rounded-xl shadow-xl"></div>
              <div className="relative mb-2 z-10">
                <div className="absolute -inset-[0.625rem] rounded-full bg-pic-primary opacity-40 blur-sm -z-10 transition-opacity duration-300 group-hover:opacity-60"></div>
                <div className="w-20 h-20 rounded-full bg-pic-primary flex items-center justify-center shadow-sm relative transition-transform duration-300 hover:scale-105">
                  <img src={ranking} alt="차트 아이콘" className="w-10 h-10" />
                </div>
              </div>
              <span className="font-bold text-gray-700 relative z-10">
                랭킹
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
