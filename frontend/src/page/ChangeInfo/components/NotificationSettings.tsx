import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import { NotificationSettings as NotificationSettingsType } from "../../..//types";

interface NotificationSettingsProps {
  settings: NotificationSettingsType;
  onChange: (name: keyof NotificationSettingsType) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="font-bold text-lg mb-4">알림 설정</h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <p className="font-medium">새 팔로워</p>
          <ToggleSwitch
            isOn={settings.newFollower}
            onToggle={() => onChange("newFollower")}
          />
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <p className="font-medium">새 댓글</p>
          <ToggleSwitch
            isOn={settings.newComment}
            onToggle={() => onChange("newComment")}
          />
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <p className="font-medium">사진 평가</p>
          <ToggleSwitch
            isOn={settings.photoRated}
            onToggle={() => onChange("photoRated")}
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <p className="font-medium">컨테스트 결과</p>
          <ToggleSwitch
            isOn={settings.contestResult}
            onToggle={() => onChange("contestResult")}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
