// import React, { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuthStore } from "../store/authStore";
// import useTermsStore from "../store/termsStore";
// import { termsApi } from "../api/termsApi";

// /**
//  * 구글 로그인 후 리다이렉트되는 컴포넌트
//  * 약관 동의 여부를 확인 후 약관 페이지 또는 홈으로 리다이렉트
//  */
// const GoogleAuthRedirect: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const login = useAuthStore((state) => state.login);
//   const { hasAgreedToRequiredTerms } = useTermsStore();

//   useEffect(() => {
//     const handleAuth = async () => {
//       // URL에서 액세스 토큰 파라미터 추출
//       const params = new URLSearchParams(location.search);
//       const accessToken = params.get("access");
//       const loginSuccess = params.get("loginSuccess");

//       if (loginSuccess === "true" && accessToken) {
//         try {
//           // 약관 동의 상태 확인 (백엔드 연동 시 실제 API 호출)
//           // const termsStatus = await termsApi.getTermsAgreementStatus();

//           // 약관 동의 여부에 따라 처리
//           if (hasAgreedToRequiredTerms) {
//             // 이미 약관에 동의한 사용자는 로그인 처리 후 홈으로
//             login(accessToken);
//             navigate("/");
//           } else {
//             // 약관에 동의하지 않은 사용자는 약관 페이지로
//             // 토큰을 쿼리 파라미터로 전달
//             navigate(`/terms?access=${accessToken}&loginSuccess=true`);
//           }
//         } catch (error) {
//           console.error("인증 처리 중 오류:", error);
//           navigate("/login", { state: { error: "인증 처리 중 오류가 발생했습니다." } });
//         }
//       } else {
//         // 로그인 실패 시 로그인 페이지로 리다이렉트
//         navigate("/login", { state: { error: "로그인에 실패했습니다." } });
//       }
//     };

//     handleAuth();
//   }, [location, login, navigate, hasAgreedToRequiredTerms]);

//   return (
//     <div className="w-full flex flex-col max-w-md mx-auto min-h-screen bg-gray-50 justify-center items-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pic-primary"></div>
//       <p className="mt-4 text-gray-600">로그인 처리 중입니다...</p>
//     </div>
//   );
// };

// export default GoogleAuthRedirect;
