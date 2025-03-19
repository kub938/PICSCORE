import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../page/Home/Home";
import Test from "../page/Test";
import ErrorPage from "../page/Error/ErrorPage";
import ImageEval from "../page/ImageEval/ImageEval";
import RankingPage from "../page/Ranking/RankingPage";
import { MyPage, UserDetailPage } from "../page/UserPage";
import { ArchievePage } from "../page/Archieve";
import { ChangeInfoPage } from "../page/ChangeInfo";
import Board from "../page/Board/Board";
import Contest from "../page/Contest/Contest";
import Login from "../page/Login/Login";
import TimeAttack from "../page/Timeattack/Timeattack";
import TimeAttackResult from "../page/Timeattack/TimeAttackResult";

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
        path: "/time-attack",
        element: <TimeAttack />,
      },
      {
        path: "/time-attack/result",
        element: <TimeAttackResult />,
      },
      {
        path: "/ranking",
        element: <RankingPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/user/:userId",
        element: <UserDetailPage />,
      },
      {
        path: "/change-info",
        element: <ChangeInfoPage />,
      },
      {
        path: "/archieve",
        element: <ArchievePage />,
      },
      {
        path: "/imageEval",
        element: <ImageEval />,
      },
      {
        path: "/ranking",
        element: <RankingPage />,
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
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
