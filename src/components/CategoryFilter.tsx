"use client";

import { Badge } from "@/components/ui/badge";
import { categories } from "@/constants";

const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Browse by Category
      </h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`cursor-pointer px-4 py-3 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                : "hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 bg-white border-gray-300"
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            <span className="mr-2 text-base">{category.icon}</span>
            {category.name}
            {selectedCategory === category.id && (
              <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            )}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
