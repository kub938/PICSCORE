import React from "react";
import { Link } from "react-router-dom";
import { HeaderProps } from "../types";

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex items-center p-4 border-b">
      <Link to="/" className="p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </Link>
      <h1 className="mx-auto text-xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;
