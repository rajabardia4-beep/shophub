"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useCart } from "./cart-context"
import { CheckoutForm } from "./checkout-form"
import { PaymentPage } from "./payment-page"

interface CheckoutModalProps {
  onClose: () => void
}

export function CheckoutModal({ onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<"review" | "payment">("review")
  const { items, total } = useCart()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background">
          <div>
            <h2 className="text-2xl font-bold">{step === "review" ? "Order Review" : "Payment"}</h2>
            <div className="flex gap-2 mt-2">
              <div
                className={`h-1 flex-1 rounded-full transition-colors ${step === "review" ? "bg-accent" : "bg-border"}`}
              />
              <div
                className={`h-1 flex-1 rounded-full transition-colors ${step === "payment" ? "bg-accent" : "bg-border"}`}
              />
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-all duration-300 hover:rotate-90">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 animate-fade-in">
          {step === "review" ? (
            <CheckoutForm onNext={() => setStep("payment")} onClose={onClose} />
          ) : (
            <PaymentPage onBack={() => setStep("review")} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  )
}
