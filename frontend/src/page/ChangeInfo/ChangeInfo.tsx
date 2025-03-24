import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../UserPage/components/Header";
import ProfileSection from "./components/ProfileSection";
import SettingsSection from "./components/SettingsSection";
import NotificationSettings from "./components/NotificationSettings";
import { UserProfile, FormErrors } from "../../types";

const ChangeInfoPage: React.FC = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile>({
    userId: "user123",
    nickname: "김선진",
    bio: "상태메세지는 입력하는 창인데 표시할게요",
    profileImage: null,
    email: "user@example.com",
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

  useEffect(() => {
    // 실제 구현에서는 API 호출을 사용할 것입니다.
    // const fetchProfile = async () => {
    //   try {
    //     const response = await axios.get('api/v1/user/profile/me');
    //     setProfile(response.data);
    //   } catch (error) {
    //     console.error('Error fetching profile:', error);
    //   }
    // };

    // 목업 데이터 로딩 시뮬레이션
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 해당 필드의 오류 지우기
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleToggleChange = (name: string) => {
    setProfile((prev) => ({
      ...prev,
      [name]: !prev[name as keyof UserProfile],
    }));
  };

  const handleNotificationChange = (
    name: keyof UserProfile["notificationSettings"]
  ) => {
    setProfile((prev) => ({
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

      // 실제 구현에서는 파일을 FormData에 추가하여 별도로 저장할 수 있습니다.
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
      // 실제 구현에서는 API 호출을 사용할 것입니다.
      // await axios.patch('api/v1/user/profile', profile);

      // 저장 성공 시뮬레이션
      setTimeout(() => {
        setIsSaving(false);
        // 저장 성공 후 마이페이지로 이동
        navigate("/mypage");
      }, 1000);
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
            disabled={isSaving}
            className={`flex-1 py-3 rounded-lg text-white font-medium ${
              isSaving ? "bg-gray-400" : "bg-green-500"
            }`}
          >
            {isSaving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeInfoPage;
