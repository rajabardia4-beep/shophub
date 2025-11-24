"use client"

import { X, Package, Search } from "lucide-react"
import { useState } from "react"
import { useCart } from "./cart-context"

interface OrdersHistoryProps {
  onClose: () => void
}

export function OrdersHistory({ onClose }: OrdersHistoryProps) {
  const { orders } = useCart()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = orders.filter((order) => order.id.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background">
          <h2 className="text-2xl font-bold">Order History</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-all duration-300 hover:rotate-90">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {orders.length > 0 && (
            <div className="mb-6 relative animate-slide-in-up">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search orders by ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background transition-all duration-300 focus:ring-2 focus:ring-accent"
              />
            </div>
          )}

          {orders.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No orders yet</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-muted-foreground">No orders match your search</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order, index) => (
                <div
                  key={order.id}
                  className="border border-border rounded-lg p-4 space-y-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">${order.total.toFixed(2)}</p>
                      <p className="text-sm font-medium capitalize text-green-600 animate-pulse">{order.status}</p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="text-sm font-medium mb-2">Items:</p>
                    <div className="space-y-1">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm text-muted-foreground">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="text-sm text-muted-foreground">
                      Payment Method:{" "}
                      <span className="font-medium capitalize text-foreground">{order.paymentMethod}</span>
                    </p>
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
