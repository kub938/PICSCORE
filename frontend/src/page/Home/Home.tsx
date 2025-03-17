import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>홈페이지 입니다.</div>
      <Link to="/test">
        <button>test 페이지로 이동</button>
      </Link>
    </>
  );
}

export default Home;
