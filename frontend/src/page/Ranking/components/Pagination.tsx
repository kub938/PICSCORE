import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}) => {
  return (
    <div className="flex justify-between items-center p-4 mt-4">
      <button
        onClick={onPrevPage}
        className={`px-6 py-2 ${
          currentPage === 1 ? "text-gray-400" : "text-black"
        }`}
        disabled={currentPage === 1}
      >
        이전
      </button>

      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
        {currentPage}
      </div>

      <button
        onClick={onNextPage}
        className={`px-6 py-2 ${
          currentPage === totalPages ? "text-gray-400" : "text-black"
        }`}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
