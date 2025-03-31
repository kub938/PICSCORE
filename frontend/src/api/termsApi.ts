// import axios from "axios";
// import { customInstance, createHeaders } from "./customInstance";

// interface TermsAgreementRequest {
//   requiredTerms: boolean;
//   marketingTerms: boolean;
// }

// export const termsApi = {
//   /**
//    * 약관 동의 상태 저장
//    */
//   submitTermsAgreement: async (data: TermsAgreementRequest) => {
//     return await customInstance.post("/api/v1/user/terms-agreement", data, {
//       headers: createHeaders(),
//     });
//   },

//   /**
//    * 사용자의 약관 동의 상태 확인
//    */
//   getTermsAgreementStatus: async () => {
//     return await customInstance.get("/api/v1/user/terms-agreement", {
//       headers: createHeaders(),
//     });
//   }
// };
