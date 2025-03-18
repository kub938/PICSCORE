import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../page/Home/Home";
import Test from "../page/Test";
import ErrorPage from "../page/Error/ErrorPage";
import ImageEval from "../page/ImageEval/ImageEval";
import Ranking from "../page/Ranking/Ranking";
import Board from "../page/Board/Board";
import Contest from "../page/Contest/Contest";
import Timeattack from "../page/Timeattack/Timeattack";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // 부모 요소의 path와 일치하면 일로 보냄
        element: <Home />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/imageEval",
        element: <ImageEval />,
      },
      {
        path: "/ranking",
        element: <Ranking />,
      },
      {
        path: "/board",
        element: <Board />,
      },
      {
        path: "/contest",
        element: <Contest />,
      },
      {
        path: "/timeattack",
        element: <Timeattack />,
      },
    ],
  },
]);

export default router;
