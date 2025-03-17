import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../page/Home/Home";
import Test from "../page/Test";
import ErrorPage from "../page/Error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, //부모 요소의 path와 일치하면 일로 보냄
        // path: "/", //다른 컴포넌트 경로 설정할때는 index 말고 다로 경로 설정
        element: <Home />,
        // loader: contactLoader, // 데이터 미리 로드
        // action: contactAction, // 폼 제출 처리
      },
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
]);

export default router;
