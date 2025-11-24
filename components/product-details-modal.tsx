"use client"

import { X, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useCart } from "./cart-context"
import { useToast } from "./toast-provider"

interface ProductDetailsModalProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    rating?: number
  }
  onClose: () => void
}

const PRODUCT_DETAILS = {
  description: "High-quality product with premium materials and excellent craftsmanship.",
  features: ["Durable construction", "Premium quality", "Eco-friendly packaging", "1-year warranty"],
  inStock: true,
  reviews: [
    { reviewer: "John D.", rating: 5, comment: "Excellent product! Highly recommended." },
    { reviewer: "Sarah M.", rating: 4, comment: "Great quality, fast shipping." },
    { reviewer: "Mike T.", rating: 5, comment: "Worth every penny!" },
  ],
}

export function ProductDetailsModal({ product, onClose }: ProductDetailsModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()
  const { addToast } = useToast()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    })
    addToast(`${product.name} added to cart!`, "success")
    setQuantity(1)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-in-up">
        <div className="sticky top-0 bg-background border-b border-border flex items-center justify-between p-4">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Image */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>

          {/* Price and Rating */}
          <div className="space-y-2">
            <p className="text-3xl font-bold text-black">₹{(product.price * 83).toFixed(0)}</p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-sm text-muted-foreground">{product.rating || 4.5}/5 (128 reviews)</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{PRODUCT_DETAILS.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-3">Key Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {PRODUCT_DETAILS.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="flex gap-4">
            <div className="flex items-center border border-border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-muted">
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-12 text-center border-l border-r border-border bg-background"
              />
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-muted">
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-all"
            >
              Add to Cart
            </button>
          </div>

          {/* Wishlist and Share */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsWishlisted(!isWishlisted)
                addToast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", "success")
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                addToast("Link copied to clipboard!", "success")
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          {/* Reviews */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {PRODUCT_DETAILS.reviews.map((review, idx) => (
                <div key={idx} className="border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{review.reviewer}</span>
                    <span className="text-yellow-500">★ {review.rating}/5</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
