"use client"

import { useState } from "react"
import { Tag } from "lucide-react"
import { useToast } from "./toast-provider"

interface CouponSectionProps {
  onApply: (discount: number) => void
}

export function CouponSection({ onApply }: CouponSectionProps) {
  const [coupon, setCoupon] = useState("")
  const { addToast } = useToast()

  const VALID_COUPONS: Record<string, number> = {
    WELCOME20: 0.2,
    SAVE10: 0.1,
    SUMMER15: 0.15,
    VIP25: 0.25,
  }

  const handleApply = () => {
    const code = coupon.toUpperCase()
    if (VALID_COUPONS[code]) {
      const discount = VALID_COUPONS[code]
      onApply(discount)
      addToast(`Coupon "${code}" applied! ${Math.round(discount * 100)}% discount`, "success")
      setCoupon("")
    } else {
      addToast("Invalid coupon code", "error")
    }
  }

  return (
    <div className="border border-border rounded-lg p-4 bg-muted/50">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-5 h-5 text-accent" />
        <span className="font-semibold">Apply Coupon Code</span>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter code (e.g., WELCOME20)"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="flex-1 px-3 py-2 border border-border rounded-lg bg-background transition-all focus:ring-2 focus:ring-accent"
        />
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all duration-300 font-medium"
        >
          Apply
        </button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Try: WELCOME20, SAVE10, SUMMER15, VIP25</p>
    </div>
  )
}
