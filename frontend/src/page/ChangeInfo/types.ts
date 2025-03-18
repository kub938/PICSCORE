// 사용자 프로필 타입
export interface UserProfile {
  userId: string;
  nickname: string;
  bio: string;
  profileImage: string | null;
  email: string;
  isPrivate: boolean;
  allowPhotoDownload: boolean;
  notificationSettings: NotificationSettings;
}

// 알림 설정 타입
export interface NotificationSettings {
  newFollower: boolean;
  newComment: boolean;
  photoRated: boolean;
  contestResult: boolean;
}

// 폼 에러 타입
export interface FormErrors {
  nickname?: string;
  bio?: string;
  profileImage?: string;
}
