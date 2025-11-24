"use client"

import Image from "next/image"
import { useState } from "react"
import { Plus, Heart, Sparkles } from "lucide-react"
import { useCart } from "./cart-context"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    rating?: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showAddedFeedback, setShowAddedFeedback] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    })
    setQuantity(1)
    setShowAddedFeedback(true)
    setTimeout(() => setShowAddedFeedback(false), 2000)
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group card-hover bg-card overflow-hidden animate-slide-in-up"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
        />
        {product.rating && product.rating >= 4.5 && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-float">
            <Sparkles className="w-3 h-3" />
            Premium
          </div>
        )}
        {/* Wishlist button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 p-2.5 bg-white/95 hover:bg-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              isWishlisted ? "fill-red-500 text-red-500 scale-110" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm transition-all ${
                    i < Math.floor(product.rating!) ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
          </div>
        )}
        <p className="text-2xl font-bold text-black mb-4 group-hover:text-accent transition-colors">
          ₹{(product.price * 83).toFixed(0)}
        </p>

        <div className="flex gap-2 mt-auto pt-2">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
            className="w-16 px-3 py-2 border border-border rounded-lg bg-background transition-colors focus:ring-2 focus:ring-accent text-center hover:border-accent/50"
          />
          <button
            onClick={handleAddToCart}
            className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>

        {/* Feedback message */}
        {showAddedFeedback && (
          <div className="mt-2 text-center text-sm text-green-600 font-medium animate-fade-in flex items-center justify-center gap-1">
            <span>✓</span>
            <span>Added to cart!</span>
          </div>
        )}
      </div>
    </div>
  )
}
