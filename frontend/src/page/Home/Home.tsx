import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>홈페이지 입니다.</div>
      <Link to="/time-attack">
        <button className="bg-green-500 text-white py-2 px-4 rounded">
          타임어택 바로가기
        </button>
      </Link>
      <div className="mt-4 space-y-2">
        <Link to="/mypage">
          <button className="bg-blue-500 text-white py-2 px-4 rounded w-full">
            마이페이지 테스트
          </button>
        </Link>
        <Link to="/user/user123">
          <button className="bg-purple-500 text-white py-2 px-4 rounded w-full">
            다른 사용자 프로필 테스트
          </button>
        </Link>
      </div>
      <Link to="/test">
        <button>test 페이지로 이동</button>
      </Link>
    </>
  );
}

export default Home;
