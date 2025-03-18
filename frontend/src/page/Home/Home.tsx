import { Link } from "react-router-dom";
import profileImage from "../../assets/profile.jpg";
import contest from "../../assets/contest.png";
import time from "../../assets/time.png";
import board from "../../assets/board.png";
import ranking from "../../assets/ranking.png";

function Home() {
  return (
    <div className="p-5 bg-pic-primary min-h-screen flex flex-col items-center">
      {/* 프로필 이미지 섹션 */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-[150px] h-[150px] rounded-full overflow-hidden border-3 border-white mb-4">
          <img
<<<<<<< HEAD
            src={profileImage}
=======
            src="/path/to/sunset/image.jpg"
>>>>>>> 860d1871fa2e1f32321e3f68d610057f1f28ba71
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="font-bold text-white text-2xl mb-2">태열</h2>
        <div className="w-[200px] text-center mb-5 flex items-center justify-center">
          <span className="font-bold text-white mr-2">LV.30</span>
          <div className="bg-white/30 h-2.5 rounded-full flex-1">
            <div className="w-[30%] h-full bg-yellow-300 rounded-full"></div>
          </div>
        </div>
        <Link to="/ImageEval">
<<<<<<< HEAD
          <div className="relative transition-all duration-300 hover:scale-105">
            <div className="font-bold bg-white px-5 py-2.5 rounded-full text-pic-primary">
              <button>사진 찍기</button>
            </div>
=======
          <div className="bg-white px-5 py-2.5 rounded-full font-bold text-gray-600">
            <button>사진 찍기</button>
>>>>>>> 860d1871fa2e1f32321e3f68d610057f1f28ba71
          </div>
        </Link>
      </div>

      {/* 메뉴 그리드 섹션 */}
      <div className="grid grid-cols-2 gap-5 w-full max-w-[400px]">
<<<<<<< HEAD
        {/* 타임어택 */}
        <Link to="/Timeattack">
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
=======
        <Link to="/Time-attack">
          <div className="bg-white rounded-xl p-5 flex flex-col items-center aspect-square">
            <div className="text-4xl mb-2">⏰</div>
            <button>타임어택</button>
          </div>
        </Link>

>>>>>>> 860d1871fa2e1f32321e3f68d610057f1f28ba71
        <Link to="/Contest">
          <div className="bg-white rounded-xl p-5 flex flex-col items-center shadow-lg relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
            <div className="absolute inset-0 bg-white rounded-xl shadow-xl"></div>
            <div className="relative mb-2 z-10">
              <div className="absolute -inset-[0.625rem] rounded-full bg-pic-primary opacity-40 blur-sm -z-10 transition-opacity duration-300 group-hover:opacity-60"></div>
              <div className="w-20 h-20 rounded-full bg-pic-primary flex items-center justify-center shadow-sm relative transition-transform duration-300 hover:scale-105">
                <img src={contest} alt="트로피 아이콘" className="w-10 h-10" />
              </div>
            </div>
            <span className="font-bold text-gray-700 relative z-10">
              컨테스트
            </span>
          </div>
        </Link>

<<<<<<< HEAD
        {/* 게시글 */}
=======
>>>>>>> 860d1871fa2e1f32321e3f68d610057f1f28ba71
        <Link to="/Board">
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

<<<<<<< HEAD
        {/* 랭킹 */}
=======
>>>>>>> 860d1871fa2e1f32321e3f68d610057f1f28ba71
        <Link to="/Ranking">
          <div className="bg-white rounded-xl p-5 flex flex-col items-center shadow-lg relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
            <div className="absolute inset-0 bg-white rounded-xl shadow-xl"></div>
            <div className="relative mb-2 z-10">
              <div className="absolute -inset-[0.625rem] rounded-full bg-pic-primary opacity-40 blur-sm -z-10 transition-opacity duration-300 group-hover:opacity-60"></div>
              <div className="w-20 h-20 rounded-full bg-pic-primary flex items-center justify-center shadow-sm relative transition-transform duration-300 hover:scale-105">
                <img src={ranking} alt="차트 아이콘" className="w-10 h-10" />
              </div>
            </div>
            <span className="font-bold text-gray-700 relative z-10">랭킹</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
