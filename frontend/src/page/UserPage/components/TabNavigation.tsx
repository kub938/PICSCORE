import React from "react";
import { TabNavigationProps } from "../types";

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  return (
    <div className="flex justify-around border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`py-3 px-4 ${
            activeTab === tab.id
              ? "border-b-2 border-green-500 text-green-500 font-bold"
              : "text-gray-500"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
