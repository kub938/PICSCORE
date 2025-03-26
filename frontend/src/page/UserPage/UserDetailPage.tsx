import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "./UserPage";

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    return <div>사용자 ID가 필요합니다.</div>;
  }

  return (
    <>
      <UserPage userId={userId} apiEndpoint={`api/v1/user/profile/${userId}`} />
    </>
  );
};

export default UserDetailPage;
