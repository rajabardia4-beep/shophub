"use client"
import { X, Trash2, ShoppingCart } from "lucide-react"
import { useCart } from "./cart-context"

interface CartSidebarProps {
  onClose: () => void
  onCheckout: () => void
}

export function CartSidebar({ onClose, onCheckout }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, total } = useCart()

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col h-screen sticky top-0 right-0 animate-slide-in-right shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-accent animate-bounce-slow" />
          <h2 className="text-xl font-bold">Shopping Cart</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-accent/20 rounded-lg transition-all duration-300 hover:rotate-90 hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground animate-fade-in flex flex-col items-center justify-center h-full">
            <ShoppingCart className="w-12 h-12 opacity-30 mb-3" />
            <p className="font-medium">Your cart is empty</p>
            <p className="text-sm">Add items to get started!</p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="p-4 flex gap-3 hover:bg-muted/50 transition-colors duration-200 animate-slide-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">₹{(item.price * 83).toFixed(0)}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 text-xs border border-border rounded hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110"
                    >
                      −
                    </button>
                    <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-xs border border-border rounded hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="border-t border-border p-4 space-y-4 bg-muted/30 animate-slide-in-up">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-2xl font-bold text-accent">₹{(total * 83).toFixed(0)}</span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full py-3 btn-premium bg-accent text-accent-foreground font-semibold"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}
