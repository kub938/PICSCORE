import React from "react";

// 카테고리 타입 정의
type Category = {
  id: string;
  name: string;
};

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="overflow-x-auto hide-scrollbar">
      <div className="flex space-x-2 min-w-max pb-1 px-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shadow-sm ${
              activeCategory === category.id
                ? "bg-pic-primary text-white shadow"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
