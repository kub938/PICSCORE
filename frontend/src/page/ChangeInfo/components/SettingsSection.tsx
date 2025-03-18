import React from "react";
import ToggleSwitch from "./ToggleSwitch";

interface SettingsSectionProps {
  isPrivate: boolean;
  allowPhotoDownload: boolean;
  onToggleChange: (name: string) => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  isPrivate,
  allowPhotoDownload,
  onToggleChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="font-bold text-lg mb-4">개인정보 설정</h2>

      <div className="mb-4">
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">프로필 공개 여부</p>
            <p className="text-gray-500 text-sm">
              공개 프로필은 모든 사용자에게 보입니다
            </p>
          </div>
          <ToggleSwitch
            isOn={!isPrivate}
            onToggle={() => onToggleChange("isPrivate")}
          />
        </div>
      </div>

      <div className="mb-2">
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">사진 다운로드 허용</p>
            <p className="text-gray-500 text-sm">
              다른 사용자가 내 사진을 다운로드할 수 있습니다
            </p>
          </div>
          <ToggleSwitch
            isOn={allowPhotoDownload}
            onToggle={() => onToggleChange("allowPhotoDownload")}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
