import React from "react";
import UserPage from "./UserPage";

const MyPage: React.FC = () => {
  return (
    <>
      <UserPage userId={null} apiEndpoint="api/v1/user/profile/me" />
    </>
  );
};

export default MyPage;
