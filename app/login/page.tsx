"use client"

import { useState } from "react"
import Link from "next/link"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <nav className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold hover:text-accent transition-colors duration-300">
            ShopHub
          </Link>
        </div>
      </nav>

      {/* Login Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <LoginForm isSignup={isSignup} onToggleMode={() => setIsSignup(!isSignup)} />
      </div>

      <footer className="border-t border-border bg-muted/30 py-6 text-center text-sm text-muted-foreground">
        <p>ShopHub - E-commerce Platform by Mahavir Bardia</p>
      </footer>
    </div>
  )
}
