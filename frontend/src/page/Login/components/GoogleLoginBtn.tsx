import googleLoginBtn from "../../../assets/Login/google-login-btn.svg";

function GoogleLoginBtn() {
  const locateGoogleLogin = () => {
    window.location.href = `https://j12b104.p.ssafy.io/api/v1/user`;
  };
  return (
    <button onClick={locateGoogleLogin}>
      <img
        src={googleLoginBtn}
        alt="Google Login"
        className="w-76 cursor-pointer"
      />
    </button>
  );
}

export default GoogleLoginBtn;
