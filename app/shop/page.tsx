"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, LogOut, User, Heart, Home, TrendingUp, BarChart3 } from "lucide-react"
import { ProductCatalog } from "@/components/product-catalog"
import { CartProvider } from "@/components/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"
import { useAuth } from "@/components/auth-context"
import { ContactForm } from "@/components/contact-form"
import { UserProfileModal } from "@/components/user-profile-modal"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { FAQSection } from "@/components/faq-section"
import { WishlistModal } from "@/components/wishlist-modal"
import { CheckoutModal } from "@/components/checkout-modal"

export default function ShopHub() {
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur animate-fade-in shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold hover:text-accent transition-colors duration-300 hover:scale-105"
            >
              <span className="text-accent">◆</span> ShopHub
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BarChart3 className="w-4 h-4 text-accent" />
                <span>50K+ Happy Customers</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm px-3 py-1 hover:bg-muted rounded-lg transition-all duration-300 flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>

              {isAuthenticated && (
                <>
                  <button
                    onClick={() => setShowContact(true)}
                    className="text-sm px-3 py-1 hover:bg-muted rounded-lg transition-all duration-300"
                  >
                    Contact
                  </button>

                  <button
                    onClick={() => setShowWishlist(true)}
                    className="p-2 hover:bg-muted rounded-lg transition-all duration-300 hover:scale-110"
                    title="Wishlist"
                  >
                    <Heart className="w-6 h-6" />
                  </button>
                </>
              )}

              {isAuthenticated && (
                <div
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted text-sm cursor-pointer hover:bg-muted/80 transition-all"
                  onClick={() => setShowProfile(true)}
                >
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                </div>
              )}

              <button
                onClick={() => setShowCart(!showCart)}
                className="p-2 hover:bg-muted rounded-lg transition-all duration-300 hover:scale-110"
              >
                <ShoppingCart className="w-6 h-6" />
              </button>

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-muted rounded-lg transition-all duration-300 hover:scale-110"
                  title="Logout"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-accent hover:bg-accent/90 rounded-lg text-accent-foreground transition-colors duration-300"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1">
            <ProductCatalog />
            <div className="max-w-7xl mx-auto px-4 py-12">
              <NewsletterSignup />
            </div>
            <FAQSection />
          </div>

          {/* Cart Sidebar */}
          {showCart && (
            <CartSidebar
              onClose={() => setShowCart(false)}
              onCheckout={() => {
                setShowCart(false)
                setShowCheckout(true)
              }}
            />
          )}
        </div>

        {/* Modals */}
        {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
        {showContact && <ContactForm onClose={() => setShowContact(false)} />}
        {showProfile && <UserProfileModal onClose={() => setShowProfile(false)} />}
        {showWishlist && <WishlistModal onClose={() => setShowWishlist(false)} />}

        <footer className="border-t border-border bg-muted/30 mt-12 py-8 text-center text-sm text-muted-foreground animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h4 className="font-bold mb-3 text-foreground">About ShopHub</h4>
              <p className="text-xs leading-relaxed">
                Premium tech products with 24/7 customer support and fast delivery across India.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-foreground">Quick Links</h4>
              <ul className="text-xs space-y-1">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Return Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-foreground">Contact Info</h4>
              <p className="text-xs">Email: support@shophub.com</p>
              <p className="text-xs">Phone: +91 8800-SHOP-HUB</p>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6">
            <p>ShopHub - E-commerce Platform by Mahavir Bardia & Shivam Dutta</p>
            <p className="text-xs mt-2">© 2025 ShopHub. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </CartProvider>
  )
}
