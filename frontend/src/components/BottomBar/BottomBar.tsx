import React from "react";
import { Link } from "react-router-dom";

import board_bar from "../../assets/board_bar.png";
import ranking_bar from "../../assets/Ranking_bar.png";
import Home_bar from "../../assets/Home_bar.png";
import Camera_bar from "../../assets/Camera_bar.png";
import User_bar from "../../assets/User_bar.png";

const BottomBar: React.FC<{ activeTab?: string }> = ({
  activeTab = "Home",
}) => {
  const tabs = [
    { name: "Board", label: "게시글", path: "/board", icon: board_bar },
    { name: "Ranking", label: "랭킹", path: "/ranking", icon: ranking_bar },
    { name: "Home", label: "홈", path: "/", icon: Home_bar },
    { name: "Camera", label: "카메라", path: "/camera", icon: Camera_bar },
    { name: "Profile", label: "프로필", path: "/profile", icon: User_bar },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-300 flex justify-around items-center h-16">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          to={tab.path}
          className={`flex flex-col items-center justify-center ${
            activeTab === tab.name ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <div className="w-6 h-6 mb-1">
            <img
              src={tab.icon}
              alt={`${tab.label} 아이콘`}
              className={`w-full h-full ${
                activeTab === tab.name ? "opacity-100" : "opacity-50"
              }`}
            />
          </div>
          <span className="text-xs">{tab.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomBar;
