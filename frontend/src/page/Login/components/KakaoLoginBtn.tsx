import kakaoLoginBtn from "../../../assets/Login/kakao-login-btn.svg";

function KakaoLoginBtn() {
  return (
    <button>
      <img
        src={kakaoLoginBtn}
        alt="Google Login"
        className="w-76 cursor-pointer"
      />
    </button>
  );
}

export default KakaoLoginBtn;
