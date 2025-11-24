"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "./cart-context"
import { AlertCircle } from "lucide-react"

interface CheckoutFormProps {
  onNext: () => void
  onClose: () => void
}

export function CheckoutForm({ onNext, onClose }: CheckoutFormProps) {
  const { items, total } = useCart()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
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

  const handleBlur = (field: string) => {
    setTouchedFields((prev) => ({
      ...prev,
      [field]: true,
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) {
      // Store shipping data in session storage for payment confirmation
      sessionStorage.setItem("shippingData", JSON.stringify(formData))
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-card border border-border rounded-lg p-4 animate-fade-in">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm animate-slide-in-up">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{(item.price * item.quantity * 83).toFixed(0)}</span>
            </div>
          ))}
          <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-black text-lg">₹{(total * 83).toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Shipping Form */}
      <div className="space-y-4 animate-fade-in">
        <h3 className="font-semibold">Shipping Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={() => handleBlur("firstName")}
              className={`w-full px-4 py-2 border rounded-lg bg-background transition-all duration-300 focus:outline-none focus:ring-2 ${
                errors.firstName && touchedFields.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-border focus:ring-accent"
              }`}
            />
            {errors.firstName && touchedFields.firstName && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm animate-slide-in-up">
                <AlertCircle className="w-3 h-3" />
                {errors.firstName}
              </div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={() => handleBlur("lastName")}
              className={`w-full px-4 py-2 border rounded-lg bg-background transition-all duration-300 focus:outline-none focus:ring-2 ${
                errors.lastName && touchedFields.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-border focus:ring-accent"
              }`}
            />
            {errors.lastName && touchedFields.lastName && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm animate-slide-in-up">
                <AlertCircle className="w-3 h-3" />
                {errors.lastName}
              </div>
            )}
          </div>
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            className={`w-full px-4 py-2 border rounded-lg bg-background transition-all duration-300 focus:outline-none focus:ring-2 ${
              errors.email && touchedFields.email
                ? "border-red-500 focus:ring-red-500"
                : "border-border focus:ring-accent"
            }`}
          />
          {errors.email && touchedFields.email && (
            <div className="flex items-center gap-1 mt-1 text-red-500 text-sm animate-slide-in-up">
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </div>
          )}
        </div>

        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            onBlur={() => handleBlur("address")}
            className={`w-full px-4 py-2 border rounded-lg bg-background transition-all duration-300 focus:outline-none focus:ring-2 ${
              errors.address && touchedFields.address
                ? "border-red-500 focus:ring-red-500"
                : "border-border focus:ring-accent"
            }`}
          />
          {errors.address && touchedFields.address && (
            <div className="flex items-center gap-1 mt-1 text-red-500 text-sm animate-slide-in-up">
              <AlertCircle className="w-3 h-3" />
              {errors.address}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              onBlur={() => handleBlur("city")}
              className={`w-full px-4 py-2 border rounded-lg bg-background transition-all duration-300 focus:outline-none focus:ring-2 ${
                errors.city && touchedFields.city
                  ? "border-red-500 focus:ring-red-500"
                  : "border-border focus:ring-accent"
              }`}
            />
            {errors.city && touchedFields.city && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm animate-slide-in-up">
                <AlertCircle className="w-3 h-3" />
                {errors.city}
              </div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              value={formData.zipCode}
              onChange={handleChange}
              onBlur={() => handleBlur("zipCode")}
              className={`w-full px-4 py-2 border rounded-lg bg-background transition-all duration-300 focus:outline-none focus:ring-2 ${
                errors.zipCode && touchedFields.zipCode
                  ? "border-red-500 focus:ring-red-500"
                  : "border-border focus:ring-accent"
              }`}
            />
            {errors.zipCode && touchedFields.zipCode && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm animate-slide-in-up">
                <AlertCircle className="w-3 h-3" />
                {errors.zipCode}
              </div>
            )}
          </div>
        </div>

        <div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            onBlur={() => handleBlur("country")}
            className={`w-full px-4 py-2 border rounded-lg bg-background transition-all duration-300 focus:outline-none focus:ring-2 ${
              errors.country && touchedFields.country
                ? "border-red-500 focus:ring-red-500"
                : "border-border focus:ring-accent"
            }`}
          />
          {errors.country && touchedFields.country && (
            <div className="flex items-center gap-1 mt-1 text-red-500 text-sm animate-slide-in-up">
              <AlertCircle className="w-3 h-3" />
              {errors.country}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 animate-fade-in">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-all duration-300 hover:scale-105 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  )
}
