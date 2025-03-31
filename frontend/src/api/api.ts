import axios from "axios";
import { useAuthStore } from "../store";

const baseURL = import.meta.env.VITE_BASE_URL;

export const evalTestApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

// evalTestApi.interceptors.request.use((config) => {
//   // 요청 시점에 스토어에서 최신 토큰 가져오기
//   const accessToken = useAuthStore.getState().accessToken;

//   // 토큰이 있으면 요청 헤더에 추가
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return config;
// });

// export const testApi = axios.create({
//   baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 요청 인터셉터를 사용하여 매 요청마다 최신 토큰 사용
// testApi.interceptors.request.use((config) => {
//   // 요청 시점에 스토어에서 최신 토큰 가져오기
//   const accessToken = useAuthStore.getState().accessToken;

//   // 토큰이 있으면 요청 헤더에 추가
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return config;
// });

export const testApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 치킨받기 API - 토큰 인증 없이 사용 가능한 공개 API

testApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const errorStatus = error.response.status;
      console.error("서버 응답 에러:", errorStatus);

      switch (errorStatus) {
        case 401:
          console.error(`${errorStatus} Unauthorized: 인증 오류`);
          break;
        case 403:
          console.error(`${errorStatus} Forbidden: 권한 오류`);
          break;
        case 404:
          console.error(
            `${errorStatus} Not Found: 요청한 리소스가 서버에 없음`
          );
          break;
        case 422:
          console.error(
            `${errorStatus} Unprocessable Entity: 요청은 유효하나 처리 실패`
          );
          break;
      }
    } else if (error.request) {
      console.log(axios);
      console.error("네트워크 에러:", error.request);
    } else {
      console.error("클라이언트 에러", error.message);
    }

    return Promise.reject(error);
  }
);
