"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./product-card"
import { ArrowRight } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating?: number
}

interface ProductRecommendationsProps {
  currentProductId: string
  allProducts: Product[]
}

export function ProductRecommendations({ currentProductId, allProducts }: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([])

  useEffect(() => {
    const current = allProducts.find((p) => p.id === currentProductId)
    if (current) {
      const recommended = allProducts
        .filter((p) => p.id !== currentProductId && Math.abs(p.price - current.price) < current.price * 0.5)
        .slice(0, 4)
      setRecommendations(recommended)
    }
  }, [currentProductId, allProducts])

  if (recommendations.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-2xl font-bold">You Might Also Like</h3>
        <ArrowRight className="w-6 h-6 text-accent animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product, index) => (
          <div key={product.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-in-up">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
