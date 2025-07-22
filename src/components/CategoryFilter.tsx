"use client"

import { Badge } from "@/components/ui/badge"

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const categories = [
  { id: "general", name: "General", icon: "📰" },
  { id: "business", name: "Business", icon: "💼" },
  { id: "technology", name: "Technology", icon: "💻" },
  { id: "science", name: "Science", icon: "🔬" },
  { id: "health", name: "Health", icon: "🏥" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "entertainment", name: "Entertainment", icon: "🎬" },
]

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Badge
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all hover:scale-105 ${
            selectedCategory === category.id
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "hover:bg-blue-50 hover:border-blue-300"
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </Badge>
      ))}
    </div>
  )
}
