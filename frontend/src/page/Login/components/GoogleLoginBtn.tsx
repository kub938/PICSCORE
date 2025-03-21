import googleLoginBtn from "../../../assets/Login/google-login-btn.svg";

function GoogleLoginBtn() {
  const locateGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/v1/user`;
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
