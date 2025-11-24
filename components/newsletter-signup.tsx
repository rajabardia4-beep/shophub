"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { useToast } from "./toast-provider"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()

  const handleSubscribe = async () => {
    if (!email) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    addToast("Successfully subscribed to our newsletter!", "success")
    setEmail("")
    setIsLoading(false)
  }

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-8 text-center animate-fade-in">
      <div className="flex items-center justify-center mb-4">
        <Mail className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
      <p className="mb-6 opacity-90">Get exclusive deals and new product announcements</p>
      <div className="flex gap-2 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubscribe()
          }}
          className="flex-1 px-4 py-3 rounded-lg bg-white text-foreground placeholder-muted-foreground transition-all focus:ring-2 focus:ring-accent"
        />
        <button
          onClick={handleSubscribe}
          disabled={isLoading || !email}
          className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-all duration-300 font-medium"
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
    </div>
  )
}
