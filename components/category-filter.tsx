"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Products", icon: "🛍️" },
    { id: "audio", name: "Audio & Headphones", icon: "🎧" },
    { id: "accessories", name: "Accessories", icon: "🔌" },
    { id: "computer", name: "Computer Gear", icon: "💻" },
    { id: "mobile", name: "Mobile Devices", icon: "📱" },
  ]

  return (
    <div className="bg-card rounded-lg border border-border p-4 animate-slide-in-up">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <span>Categories</span>
        <ChevronDown className="w-4 h-4" />
      </h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id)
              onCategoryChange(category.id)
            }}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium flex items-center gap-3 ${
              selectedCategory === category.id
                ? "bg-accent text-accent-foreground shadow-lg scale-105"
                : "hover:bg-muted"
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}
