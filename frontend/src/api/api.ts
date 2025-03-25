import axios from "axios";

const baseURL = "https://j12b104.p.ssafy.io";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
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
      console.error("네트워크 에러:", error.request);
    } else {
      console.error("클라이언트 에러", error.message);
    }

    return Promise.reject(error);
  }
);
