import GoogleLoginBtn from "./components/GoogleLoginBtn";
import KakaoLoginBtn from "./components/KakaoLoginBtn";

function Login() {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-20">
      <div className="flex flex-col items-center">
        <div className="font-logo text-5xl mb-20">
          <span className="text-pic-primary ">PIC</span>
          <span>SCORE</span>
        </div>
        <div className="text-3xl font-bold mb-4">환영합니다!</div>
        <div>원활한 서비스이용을 위해 로그인 해주세요</div>
      </div>
      <div className="flex flex-col gap-2">
        <GoogleLoginBtn />
        <KakaoLoginBtn />
      </div>
    </div>
  );
}

export default Login;
