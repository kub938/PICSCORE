import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "./UserPage";

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    return <div>사용자 ID가 필요합니다.</div>;
  }

  // 다른 사용자의 프로필을 보는 경우 userId와 해당 사용자의 API 엔드포인트를 전달
  return (
    <UserPage userId={userId} apiEndpoint={`api/v1/user/profile/${userId}`} />
  );
};

export default UserDetailPage;
