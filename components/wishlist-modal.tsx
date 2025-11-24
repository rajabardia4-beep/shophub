"use client"

import { X, Heart, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useCart } from "./cart-context"
import { useToast } from "./toast-provider"

interface WishlistModalProps {
  onClose: () => void
}

export function WishlistModal({ onClose }: WishlistModalProps) {
  const [wishlist, setWishlist] = useState<Array<{ id: string; name: string; price: number; image: string }>>([])
  const { addToCart } = useCart()
  const { addToast } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem("wishlist")
    if (saved) {
      setWishlist(JSON.parse(saved))
    }
  }, [])

  const handleRemove = (id: string) => {
    const updated = wishlist.filter((item) => item.id !== id)
    setWishlist(updated)
    localStorage.setItem("wishlist", JSON.stringify(updated))
    addToast("Removed from wishlist", "success")
  }

  const handleAddToCart = (item: (typeof wishlist)[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    })
    addToast(`${item.name} added to cart!`, "success")
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-slide-in-up">
        <div className="sticky top-0 bg-background border-b border-border flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            My Wishlist
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {wishlist.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your wishlist is empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wishlist.map((item, index) => (
                <div
                  key={item.id}
                  className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-square bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>
                    <p className="text-lg font-bold text-black mb-3">₹{(item.price * 83).toFixed(0)}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all font-medium"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                      </button>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="px-3 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-all"
                      >
                        <Heart className="w-5 h-5 fill-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
