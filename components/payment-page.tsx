"use client"

import type React from "react"
import { useState } from "react"
import { useCart } from "./cart-context"
import { CreditCard, CheckCircle, Loader, AlertCircle, Truck } from "lucide-react"
import { CouponSection } from "./coupon-section"
import { useToast } from "./toast-provider"

interface PaymentPageProps {
  onBack: () => void
  onClose: () => void
}

export function PaymentPage({ onBack, onClose }: PaymentPageProps) {
  const { items, total, addOrder, clearCart } = useCart()
  const { addToast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [processing, setProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const shippingData = typeof window !== "undefined" ? sessionStorage.getItem("shippingData") : null
  const shippingInfo = shippingData ? JSON.parse(shippingData) : {}

  const finalTotal = total * 83 * (1 - discount)

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    const name = e.target.name

    if (name === "cardNumber") {
      value = value.replace(/\s/g, "").slice(0, 16)
    } else if (name === "expiryDate") {
      value = value.replace(/\D/g, "").slice(0, 4)
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2)
      }
    } else if (name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3)
    }

    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateCardData = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!cardData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required"
    } else if (cardData.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits"
    }

    if (!cardData.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required"
    }

    if (!cardData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required"
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = "Format: MM/YY"
    }

    if (!cardData.cvv.trim()) {
      newErrors.cvv = "CVV is required"
    } else if (cardData.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async () => {
    if (paymentMethod === "card" && !validateCardData()) {
      return
    }

    setProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const order = {
      id: `ORD-${Date.now()}`,
      items,
      total: finalTotal,
      status: "completed" as const,
      createdAt: new Date(),
      paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod,
      shippingInfo,
      discountApplied: discount,
    }

    addOrder(order)
    clearCart()
    setProcessing(false)
    setPaymentSuccess(true)
    addToast(`Order placed successfully via ${paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod}!`)
  }

  if (paymentSuccess) {
    return (
      <div className="text-center py-12 animate-scale-in">
        <div className="mb-4 flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-muted-foreground mb-2">Your order has been placed successfully.</p>
        <p className="text-muted-foreground mb-2">
          Order ID: <span className="font-semibold text-foreground">{`ORD-${Date.now()}`}</span>
        </p>
        {paymentMethod === "cod" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4 animate-slide-in-up">
            <p className="text-blue-900 text-sm font-medium">
              Cash on Delivery confirmed. Please pay ₹{finalTotal.toFixed(0)} to the delivery agent.
            </p>
          </div>
        )}
        <p className="text-sm text-muted-foreground mb-6">You will receive a confirmation email shortly.</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-all duration-300 hover:scale-105"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <CouponSection onApply={setDiscount} />

      {/* Payment Method Selection */}
      <div className="space-y-3 animate-slide-in-up">
        <h3 className="font-semibold">Payment Method</h3>
        <div className="space-y-2">
          <label className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-all duration-300 hover:border-accent animate-slide-in-up">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => {
                setPaymentMethod(e.target.value)
                setErrors({})
              }}
              className="mr-3"
            />
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              <div>
                <span className="font-medium">Cash on Delivery</span>
                <p className="text-xs text-muted-foreground">Pay when you receive your order</p>
              </div>
            </div>
          </label>

          {["card", "paypal", "apple"].map((method, index) => (
            <label
              key={method}
              className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-all duration-300 hover:border-accent animate-slide-in-up"
              style={{ animationDelay: `${(index + 1) * 50}ms` }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => {
                  setPaymentMethod(e.target.value)
                  setErrors({})
                }}
                className="mr-3"
              />
              <span className="capitalize font-medium">
                {method === "paypal" ? "PayPal" : method === "apple" ? "Apple Pay" : "Credit/Debit Card"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Cash on Delivery - Show Shipping Address */}
      {paymentMethod === "cod" && (
        <div className="bg-card border border-border rounded-lg p-4 animate-slide-in-up space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Truck className="w-5 h-5" />
            <span className="font-semibold">Delivery Address</span>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">
                {shippingInfo.firstName} {shippingInfo.lastName}
              </span>
            </p>
            <p className="text-muted-foreground">{shippingInfo.address}</p>
            <p className="text-muted-foreground">
              {shippingInfo.city}, {shippingInfo.zipCode}
            </p>
            <p className="text-muted-foreground">{shippingInfo.country}</p>
            <p className="pt-2 border-t border-border">
              <span className="font-medium">Email:</span> {shippingInfo.email}
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded p-3 mt-4">
            <p className="text-green-900 text-sm font-medium">
              You will pay ₹{finalTotal.toFixed(0)} in cash to the delivery agent upon delivery.
            </p>
          </div>
        </div>
      )}

      {/* Card Payment Form */}
      {paymentMethod === "card" && (
        <div className="space-y-4 border border-border rounded-lg p-4 bg-card animate-slide-in-up">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5" />
            <span className="font-semibold">Card Details</span>
          </div>

          <div>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardData.cardNumber}
              onChange={handleCardChange}
              className={`w-full px-4 py-2 border rounded-lg bg-background transition-all duration-300 focus:outline-none focus:ring-2 ${
                errors.cardNumber ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-accent"
              }`}
            />
            {errors.cardNumber && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm animate-slide-in-up">
                <AlertCircle className="w-3 h-3" />
                {errors.cardNumber}
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              name="cardName"
              placeholder="John Doe"
              value={cardData.cardName}
              onChange={handleCardChange}
              className={`w-full px-4 py-2 border rounded-lg bg-background transition-all duration-300 focus:outline-none focus:ring-2 ${
                errors.cardName ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-accent"
              }`}
            />
            {errors.cardName && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm animate-slide-in-up">
                <AlertCircle className="w-3 h-3" />
                {errors.cardName}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardData.expiryDate}
                onChange={handleCardChange}
                className={`w-full px-4 py-2 border rounded-lg bg-background transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.expiryDate ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-accent"
                }`}
              />
              {errors.expiryDate && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm animate-slide-in-up">
                  <AlertCircle className="w-3 h-3" />
                  {errors.expiryDate}
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                name="cvv"
                placeholder="123"
                value={cardData.cvv}
                onChange={handleCardChange}
                className={`w-full px-4 py-2 border rounded-lg bg-background transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.cvv ? "border-red-500 focus:ring-red-500" : "border-border focus:ring-accent"
                }`}
              />
              {errors.cvv && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm animate-slide-in-up">
                  <AlertCircle className="w-3 h-3" />
                  {errors.cvv}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Alternative Payment Methods Info */}
      {paymentMethod !== "card" && paymentMethod !== "cod" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-slide-in-up">
          <p className="text-blue-900 text-sm">
            You will be redirected to {paymentMethod === "paypal" ? "PayPal" : "Apple Pay"} to complete your payment.
          </p>
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-card border border-border rounded-lg p-4 animate-slide-in-up space-y-3">
        <h3 className="font-semibold">Order Total</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal:</span>
            <span>₹{(total * 83).toFixed(0)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({Math.round(discount * 100)}%):</span>
              <span>-₹{(total * 83 * discount).toFixed(0)}</span>
            </div>
          )}
          <div className="border-t border-border pt-2 flex justify-between text-lg font-bold">
            <span>Amount to Pay</span>
            <span className="text-accent text-2xl">₹{finalTotal.toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 animate-slide-in-up">
        <button
          onClick={onBack}
          disabled={processing}
          className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-all duration-300 disabled:opacity-50 font-medium hover:scale-105"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          disabled={processing}
          className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : paymentMethod === "cod" ? (
            `Confirm Order - ₹${(finalTotal).toFixed(0)}`
          ) : (
            `Pay ₹${(finalTotal).toFixed(0)}`
          )}
        </button>
      </div>
    </div>
  )
}
