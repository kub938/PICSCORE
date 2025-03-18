import googleLoginBtn from "../../../assets/Login/google-login-btn.svg";

function GoogleLoginBtn() {
  const locateGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/v1/user";
  };
  return (
    <button onClick={locateGoogleLogin}>
      <img src={googleLoginBtn} alt="Google Login" className="w-76" />
    </button>
  );
}

export default GoogleLoginBtn;
