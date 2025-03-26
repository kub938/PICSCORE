import { Link } from "react-router-dom";
import profileImage from "../../assets/profile.jpg";
import contest from "../../assets/contest.png";
import time from "../../assets/time.png";
import board from "../../assets/board.png";
import ranking from "../../assets/ranking.png";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "@tanstack/react-query";
import HomeNavBar from "../../components/NavBar/HomeNavBar";
import axios from "axios";
import { useLogout } from "../../hooks/useUser";

function Home() {
  /*
  원래 로직
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const login = useAuthStore((state) => state.login);
  const params = new URLSearchParams(window.location.search);
  const loginSuccess = params.get("loginSuccess");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get("/api/v1/user/info");
      return response.data.data;
    },
    enabled: !!loginSuccess, // loginSuccess가 true일 때만 쿼리 실행
  });

   useEffect(() => {
    if (data) {
      login(data);
    }
  }, [data]);
  
  if (isLoading) {
    return <>로딩중..</>;
  }
  if (isError) {
    return <>유저 정보 호출 에러</>;
  }
  */

  /* 테스트 로직 */
  const logout = useAuthStore((state) => state.logout);

  const useUserData = () => {
    const accessToken = useAuthStore((state) => state.accessToken);

    return useQuery({
      queryKey: ["userData"],
      queryFn: async () => {
        const response = await axios.get(
          "https://j12b104.p.ssafy.io/api/v1/user/info",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      },
    });
  };

  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        logout();
      },
    });
  };

  const { isLoading, isError } = useUserData();
  if (isLoading) {
    return <>로딩중 입니다</>;
  }
  if (isError) {
    return <>에러입니다</>;
  }

  return (
    <>
      <div className="flex flex-col w-full items-center">
        <HomeNavBar />

        {/* 프로필 이미지 섹션 */}
        <Link
          to="/mypage"
          className="flex flex-col items-center mb-10 border-2 border-gray-300 rounded-3xl shadow-lg p-5 bg-white w-[90%]"
          cursor-pointer
        >
          <div className="flex flex-row items-center w-full px-15 gap-10">
            {/* 프로필 이미지 */}
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-white">
              <img
                src={profileImage}
                alt="프로필 이미지"
                className="w-full h-full object-cover"
              />
            </div>
            {/* 이름 */}
            <h2 className="font-bold text-gray-800 text-2xl">태열</h2>
          </div>

          {/* 레벨과 레벨 바 */}
          <div className="w-[200px] text-center flex items-center mt-4">
            <span className="font-bold text-gray-800 mr-2">LV.30</span>
            <div className="bg-gray-200 h-2.5 rounded-full flex-1">
              <div className="w-[30%] h-full bg-pic-primary rounded-full"></div>
            </div>
          </div>
        </Link>
        <Link to="/image-upload">
          <div className="relative transition-all duration-300 hover:scale-105">
            <div className="font-bold bg-white px-5 py-2.5 rounded-full text-pic-primary">
              <button>사진 분석</button>
            </div>
          </div>
        </Link>
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
