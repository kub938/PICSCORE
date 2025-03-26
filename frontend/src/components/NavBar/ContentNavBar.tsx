import { Bell, ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ContentNavbarProps {
  content: string;
}

function ContentNavBar({ content }: ContentNavbarProps) {
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1);
  };
  return (
    <nav className="w-full max-w-md bg-white shadow-2xs py-2 px-6">
      <div className="flex justify-between items-center">
        <ArrowLeftIcon className="w-10" onClick={GoBack} />
        {/* 로고 */}
        <div className="text-xl font-bold">{content}</div>

        {/* 알림 벨 아이콘 */}
        <button className="p-2 rounded-full active:bg-gray-100">
          <Bell size={24} />
        </button>
      </div>
    </nav>
  );
}

export default ContentNavBar;
