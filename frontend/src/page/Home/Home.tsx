import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../store/userState";

function Home() {
  useEffect(() => {
    // 로그인 후 리다이렉트 처리
    const [userStateValue, setUserState] = useRecoilState(userState);
    const urlParams = new URLSearchParams(location.search);
    const loginSuccess = urlParams.get("loginSuccess");
    if (loginSuccess === "true") {
      setUserState(true);
      console.log("userStateValue 세팅 완료 ", userStateValue);
    }
  }, [location]);

  return (
    <div className="p-5 bg-[#a4d675] min-h-screen flex flex-col items-center">
      {/* 프로필 이미지 섹션 */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-[150px] h-[150px] rounded-full overflow-hidden border-3 border-white mb-4">
          <img
            src="/path/to/sunset/image.jpg"
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-white text-2xl mb-2">태열</h2>
        <div className="w-[200px] text-center mb-5">
          <span className="text-white">LV.30</span>
          <div className="bg-white/30 h-2.5 rounded-full mt-1">
            <div className="w-[30%] h-full bg-yellow-300 rounded-full"></div>
          </div>
        </div>
        <Link to="/ImageEval">
          <div className="bg-white px-5 py-2.5 rounded-full font-bold text-gray-600">
            <button>사진 찍기</button>
          </div>
        </Link>
      </div>

      {/* 메뉴 그리드 섹션 */}
      <div className="grid grid-cols-2 gap-5 w-full max-w-[400px]">
        <Link to="/Time-attack">
          <div className="bg-white rounded-xl p-5 flex flex-col items-center aspect-square">
            <div className="text-4xl mb-2">⏰</div>
            <button>타임어택</button>
          </div>
        </Link>

        <Link to="/Contest">
          <div className="bg-white rounded-xl p-5 flex flex-col items-center aspect-square">
            <div className="text-4xl mb-2">🏆</div>
            <button>컨테스트</button>
          </div>
        </Link>

        <Link to="/Board">
          <div className="bg-white rounded-xl p-5 flex flex-col items-center aspect-square">
            <div className="text-4xl mb-2">📝</div>
            <button>게시글</button>
          </div>
        </Link>

        <Link to="/Ranking">
          <div className="bg-white rounded-xl p-5 flex flex-col items-center aspect-square">
            <div className="text-4xl mb-2">📊</div>
            <button>랭킹</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
