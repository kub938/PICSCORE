// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { termsApi } from "../api/termsApi";
// import useTermsStore from "../store/termsStore";
// import { useAuthStore } from "../store/authStore";

// /**
//  * 로그인 후 약관 동의 여부를 확인하는 훅
//  * 약관에 동의하지 않은 사용자는 약관 페이지로 리다이렉트
//  */
// export const useTermsCheck = () => {
//   const [isChecking, setIsChecking] = useState(true);
//   const navigate = useNavigate();
//   const isLoggedIn = useAuthStore(state => state.isLoggedIn);
//   const { hasAgreedToRequiredTerms } = useTermsStore();

//   useEffect(() => {
//     const checkTermsAgreement = async () => {
//       if (!isLoggedIn) {
//         setIsChecking(false);
//         return;
//       }

//       try {
//         // 로컬 스토어에서 확인
//         if (hasAgreedToRequiredTerms) {
//           setIsChecking(false);
//           return;
//         }

//         // 백엔드에서 확인 (실제 구현 시)
//         const response = await termsApi.getTermsAgreementStatus();

//         // 약관 동의 여부에 따라 처리
//         if (response.data.data?.hasAgreedToRequiredTerms) {
//           // 백엔드에서 동의했다고 하면 로컬 스토어도 업데이트
//           useTermsStore.getState().agreeToTerms(true, response.data.data.hasAgreedToMarketingTerms || false);
//           setIsChecking(false);
//         } else {
//           // 약관 동의 페이지로 리다이렉트
//           navigate("/terms");
//         }
//       } catch (error) {
//         console.error("약관 동의 상태 확인 중 오류:", error);
//         // 에러 발생 시, 일단 계속 진행 (UX를 위해)
//         setIsChecking(false);
//       }
//     };

//     checkTermsAgreement();
//   }, [isLoggedIn, hasAgreedToRequiredTerms, navigate]);

//   return { isChecking };
// };

// export default useTermsCheck;
