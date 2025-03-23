import { useEffect } from "react";
import googleLoginBtn from "../../../assets/Login/google-login-btn.svg";
import { useAuthStore } from "../../../store/authStore";

function GoogleLoginBtn() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loginSuccess = params.get("loginSuccess");
    console.log(loginSuccess);
    if (loginSuccess) {
      login();
      console.log(isLoggedIn);
    }
  });

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
