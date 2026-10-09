"use client";

import { Badge } from "@/components/ui/badge";
import { categories } from "@/constants";

const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <div className="mb-8">
      <h3 className="mb-4 font-display text-2xl font-semibold text-[var(--ink)]">
        Browse by Category
      </h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`cursor-pointer px-4 py-3 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
              selectedCategory === category.id
                ?                 "bg-[var(--neon-blue)] text-[var(--ink)] shadow-lg"
                :                 "border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-raised)]"
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            <span className="mr-2 text-base">{category.icon}</span>
            {category.name}
            {selectedCategory === category.id && (
              <div className="ml-2 h-2 w-2 animate-pulse rounded-full bg-[var(--neon-blue)]"></div>
            )}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
