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
    <div className="mb-4 overflow-x-auto">
      <div className="flex space-x-2 min-w-max pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeCategory === category.id
                ? "bg-pic-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors duration-200`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
