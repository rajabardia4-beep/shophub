"use client"
import { X } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating?: number
}

interface ComparisonViewProps {
  onClose: () => void
  products?: Product[]
}

export function ComparisonView({ onClose, products = [] }: ComparisonViewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-card rounded-xl shadow-2xl max-w-4xl w-full max-h-96 overflow-auto animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-2xl font-bold">Product Comparison</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-all hover:rotate-90">
            <X className="w-6 h-6" />
          </button>
        </div>

        {products.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p>No products selected for comparison</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4 font-bold min-w-40">Product</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 min-w-48 border-l border-border">
                      <div className="flex flex-col items-center">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="object-cover mb-2 rounded"
                        />
                        <p className="font-semibold text-sm text-center">{product.name}</p>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-bold">Price</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 border-l border-border text-center">
                      <span className="text-xl font-bold text-accent">₹{(product.price * 83).toFixed(0)}</span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-bold">Rating</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 border-l border-border text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="font-semibold">{product.rating || "N/A"}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
