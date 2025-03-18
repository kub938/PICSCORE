import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

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
      console.error("서버 응답 에러:", error.response.status);

      if (error.response.status === 401) {
      }
    } else if (error.request) {
      console.error("네트워크 에러:", error.request);
    } else {
      console.error("클라이언트 에러", error.message);
    }

    return Promise.reject(error);
  }
);
