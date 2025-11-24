"use client"

import { useState, useEffect } from "react"
import { useCart } from "./cart-context"
import { ProductCard } from "./product-card"
import { CheckoutModal } from "./checkout-modal"
import { OrdersHistory } from "./orders-history"
import { ProductDetailsModal } from "./product-details-modal"
import { SearchBar } from "./search-bar"
import { useToast } from "./toast-provider"
import { Zap, TrendingUp, ShoppingCart } from "lucide-react"

const PRODUCTS = [
  { id: "1", name: "Wireless Headphones", price: 79.99, image: "/wireless-headphones.png", rating: 4.5 },
  { id: "2", name: "Smart Watch", price: 199.99, image: "/smartwatch-lifestyle.png", rating: 4.8 },
  { id: "3", name: "USB-C Cable", price: 12.99, image: "/usb-c-cable.jpg", rating: 4.2 },
  { id: "4", name: "Phone Case", price: 24.99, image: "/colorful-phone-case.jpg", rating: 4.6 },
  { id: "5", name: "Screen Protector", price: 9.99, image: "/screen-protector.png", rating: 4.3 },
  { id: "6", name: "Portable Charger", price: 34.99, image: "/portable-charger-lifestyle.png", rating: 4.7 },
  { id: "7", name: "Bluetooth Speaker", price: 49.99, image: "/bluetooth-speaker.jpg", rating: 4.4 },
  { id: "8", name: "Webcam HD", price: 59.99, image: "/hd-webcam.jpg", rating: 4.5 },
  { id: "9", name: "Wireless Mouse", price: 29.99, image: "/wireless-mouse.png", rating: 4.4 },
  { id: "10", name: "Mechanical Keyboard", price: 89.99, image: "/mechanical-keyboard.png", rating: 4.7 },
  { id: "11", name: "Monitor Stand", price: 39.99, image: "/monitor-stand.jpg", rating: 4.3 },
  { id: "12", name: "Desk Lamp LED", price: 44.99, image: "/desk-lamp-led.jpg", rating: 4.6 },
  { id: "13", name: "Phone Stand", price: 14.99, image: "/phone-stand.jpg", rating: 4.2 },
  { id: "14", name: "USB Hub", price: 22.99, image: "/usb-hub.png", rating: 4.4 },
  { id: "15", name: "Laptop Backpack", price: 54.99, image: "/laptop-backpack.png", rating: 4.8 },
  { id: "16", name: "Wireless Charger", price: 31.99, image: "/wireless-charger.png", rating: 4.5 },
  { id: "17", name: "Screen Privacy Filter", price: 18.99, image: "/screen-privacy-filter.jpg", rating: 4.1 },
  { id: "18", name: "Cable Organizer", price: 11.99, image: "/cable-organizer.png", rating: 4.3 },
  { id: "19", name: "Phone Cooling Fan", price: 27.99, image: "/phone-cooling-fan.jpg", rating: 4.6 },
  { id: "20", name: "Tempered Glass Screen Protector", price: 16.99, image: "/tempered-glass-screen.jpg", rating: 4.5 },
  { id: "21", name: "MacBook Case", price: 35.99, image: "/macbook-case.jpg", rating: 4.7 },
  { id: "22", name: "Earbuds Case Cover", price: 7.99, image: "/stylish-earbuds-case.png", rating: 4.2 },
  { id: "23", name: "Screen Cleaning Kit", price: 13.99, image: "/screen-cleaning-kit.jpg", rating: 4.4 },
  { id: "24", name: "Gaming Mouse Pad", price: 19.99, image: "/gaming-mouse-pad.jpg", rating: 4.6 },
]

export function ProductCatalog() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [showOrders, setShowOrders] = useState(false)
  const [priceFilter, setPriceFilter] = useState("all")
  const [showPromo, setShowPromo] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<(typeof PRODUCTS)[0] | null>(null)
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high" | "rating">("name")
  const [scrollY, setScrollY] = useState(0)
  const { items } = useCart()
  const { addToast } = useToast()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under50" && product.price < 50) ||
      (priceFilter === "50-100" && product.price >= 50 && product.price < 100) ||
      (priceFilter === "over100" && product.price >= 100)
    return matchesSearch && matchesPrice
  })

  filteredProducts.sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0)
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="min-h-screen bg-background">
      {showPromo && (
        <div className="bg-gradient-to-r from-accent via-accent/80 to-accent text-accent-foreground py-4 px-4 flex items-center justify-between animate-slide-in-down shadow-lg sticky top-16 z-30">
          <div className="flex items-center gap-3 flex-1 max-w-7xl mx-auto">
            <Zap className="w-5 h-5 animate-pulse" />
            <span className="font-semibold">Limited time: Free shipping on orders over ₹4,150!</span>
          </div>
          <button
            onClick={() => setShowPromo(false)}
            className="text-sm hover:opacity-80 transition-opacity hover:rotate-90 duration-300"
          >
            ✕
          </button>
        </div>
      )}

      <div
        className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4 animate-fade-in relative overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl font-bold mb-2 animate-slide-in-up">Welcome to ShopHub</h1>
          <p className="text-xl opacity-90 animate-slide-in-up" style={{ animationDelay: "100ms" }}>
            Discover premium tech products at incredible prices
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Controls */}
        <div className="mb-8 space-y-4 animate-slide-in-up">
          <SearchBar onSearch={setSearchQuery} products={PRODUCTS} />

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-4 flex-1">
              <button
                onClick={() => setShowCheckout(true)}
                disabled={items.length === 0}
                className="px-6 py-3 btn-premium bg-accent text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100 font-semibold flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Checkout ({items.length})
              </button>
              <button
                onClick={() => setShowOrders(true)}
                className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                View Orders
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 border border-border rounded-lg bg-background transition-smooth input-premium"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background transition-smooth input-premium"
            >
              <option value="all">All Prices</option>
              <option value="under50">Under ₹4,150</option>
              <option value="50-100">₹4,150 - ₹8,300</option>
              <option value="over100">Over ₹8,300</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-muted-foreground font-medium animate-fade-in">
          <span className="inline-block px-3 py-1 bg-muted rounded-full">
            Showing {filteredProducts.length} of {PRODUCTS.length} products
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <p className="text-muted-foreground text-lg font-medium">No products found.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
      {showOrders && <OrdersHistory onClose={() => setShowOrders(false)} />}
      {selectedProduct && <ProductDetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}
