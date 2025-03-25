import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../UserPage/components/Header";
import ProfileSection from "./components/ProfileSection";
import SettingsSection from "./components/SettingsSection";
import NotificationSettings from "./components/NotificationSettings";
import {
  UserProfile,
  FormErrors,
  NotificationSettings as NotificationSettingsType,
} from "../../types/userTypes";
import { useMyProfile, useUpdateProfile } from "../../hooks/useUser";
import { useAuthStore } from "../../store/authStore";

const ChangeInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore((state) => state);

  // 사용자 프로필 가져오기 hook
  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useMyProfile();

  // 프로필 업데이트 hook
  const updateProfileMutation = useUpdateProfile();

  const [profile, setProfile] = useState<UserProfile>({
    userId: "",
    nickname: "",
    bio: "",
    profileImage: null,
    email: "user@example.com", // 기본값
    isPrivate: false,
    allowPhotoDownload: true,
    notificationSettings: {
      newFollower: true,
      newComment: true,
      photoRated: false,
      contestResult: true,
    },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // API에서 가져온 프로필 데이터로 상태 업데이트
  useEffect(() => {
    if (profileData) {
      const userData = profileData.data;
      console.log("API에서 가져온 사용자 데이터:", userData);

      setProfile((prev) => ({
        ...prev,
        userId: userData.userId ? String(userData.userId) : "", // number를 string으로 변환
        nickname: userData.nickName || "", // API는 nickName으로 반환
        bio: userData.message || "", // API는 message로 반환
        profileImage: userData.profileImage,
        // 기존 값 유지
        email: prev.email,
        isPrivate: prev.isPrivate,
        allowPhotoDownload: prev.allowPhotoDownload,
        notificationSettings: prev.notificationSettings,
      }));

      setLoading(false);
    }
  }, [profileData]);

  // 로딩 상태 관리
  useEffect(() => {
    setLoading(profileLoading);
  }, [profileLoading]);

  // 오류 처리
  useEffect(() => {
    if (profileError) {
      console.error("프로필 로딩 오류:", profileError);
      setLoading(false);
    }
  }, [profileError]);

  // 로그인 확인
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev: UserProfile) => ({
      ...prev,
      [name]: value,
    }));

    // 해당 필드의 오류 지우기
    if (errors[name as keyof FormErrors]) {
      setErrors((prev: FormErrors) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleToggleChange = (name: string) => {
    setProfile((prev: UserProfile) => ({
      ...prev,
      [name]: !prev[name as keyof UserProfile],
    }));
  };

  const handleNotificationChange = (name: keyof NotificationSettingsType) => {
    setProfile((prev: UserProfile) => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [name]: !prev.notificationSettings[name],
      },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));

      // 파일을 base64로 변환하여 profile.profileImage에 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!profile.nickname.trim()) {
      newErrors.nickname = "닉네임을 입력해주세요";
      isValid = false;
    } else if (profile.nickname.length > 20) {
      newErrors.nickname = "닉네임은 20자 이하로 입력해주세요";
      isValid = false;
    }

    if (profile.bio.length > 100) {
      newErrors.bio = "상태 메시지는 100자 이하로 입력해주세요";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSaving(true);

    try {
      // API에 전송할 데이터 준비
      const updateData = {
        profileImage: profile.profileImage || "", // null일 경우 빈 문자열로 처리
        nickName: profile.nickname, // API는 nickName 형식 사용
        message: profile.bio, // API는 message 형식 사용
      };

      // API 호출
      updateProfileMutation.mutate(updateData, {
        onSuccess: () => {
          setIsSaving(false);
          navigate("/mypage");
        },
        onError: (error) => {
          console.error("프로필 업데이트 실패:", error);
          setIsSaving(false);
          // 오류 메시지 표시 (추가 구현 필요)
        },
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // 변경사항을 취소하고 마이페이지로 돌아가기
    navigate("/mypage");
  };

  if (loading) {
    return (
      <div className="flex flex-col max-w-md mx-auto min-h-screen bg-gray-50">
        <Header title="프로필 수정" />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-md mx-auto min-h-screen bg-gray-50">
      <Header title="프로필 수정" />

      <div className="flex-1 p-4">
        <ProfileSection
          profile={profile}
          previewImage={previewImage}
          errors={errors}
          onChange={handleChange}
          onImageChange={handleImageChange}
        />

        <SettingsSection
          isPrivate={profile.isPrivate}
          allowPhotoDownload={profile.allowPhotoDownload}
          onToggleChange={handleToggleChange}
        />

        <NotificationSettings
          settings={profile.notificationSettings}
          onChange={handleNotificationChange}
        />

        <div className="flex mt-6 space-x-4">
          <button
            onClick={handleCancel}
            className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving || updateProfileMutation.isPending}
            className={`flex-1 py-3 rounded-lg text-white font-medium ${
              isSaving || updateProfileMutation.isPending
                ? "bg-gray-400"
                : "bg-green-500"
            }`}
          >
            {isSaving || updateProfileMutation.isPending
              ? "저장 중..."
              : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeInfoPage;
