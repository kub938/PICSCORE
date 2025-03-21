import React from "react";
import UserPage from "./UserPage";

const MyPage: React.FC = () => {
  // 마이페이지일 경우 userId는 null, API 엔드포인트는 me로 지정
  return <UserPage userId={null} apiEndpoint="api/v1/user/profile/me" />;
};

export default MyPage;
