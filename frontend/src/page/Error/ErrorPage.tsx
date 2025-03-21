import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-15 text-5xl ">
      <div className="font-logo">
        <span className="text-pic-primary ">PIC</span>
        <span>SCORE</span>
      </div>
      <div className="font-logo">404</div>
      <div className="text-3xl font-logo">에러났어요...</div>
      <Link
        to="/"
        className="rounded-xl text-lg w-32 py-2 px-6 text-center bg-pic-primary text-white shadow shadow-gray-700 shadow-black cursor-pointer hover:bg-opacity-90"
      >
        홈으로
      </Link>
    </div>
  );
}

export default ErrorPage;
