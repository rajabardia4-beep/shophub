"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const FAQS = [
  {
    question: "What is the return policy?",
    answer: "We offer a 30-day return policy for all products. Items must be unused and in original packaging.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide. International shipping times vary by location.",
  },
  {
    question: "Are there any hidden charges?",
    answer: "No, all prices shown include taxes. Shipping costs are calculated at checkout.",
  },
  {
    question: "How do I track my order?",
    answer: "You can track your order using the order ID sent to your email after purchase.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, PayPal, Apple Pay, and digital wallets.",
  },
]

export function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <h2 className="text-3xl font-bold mb-2 text-center">Frequently Asked Questions</h2>
      <p className="text-center text-muted-foreground mb-8">Find answers to common questions</p>

      <div className="space-y-3">
        {FAQS.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden animate-slide-in-up transition-all duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-colors"
            >
              <span className="font-semibold text-left">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""}`}
              />
            </button>
            {expandedIndex === index && (
              <div className="px-6 py-4 bg-muted/30 border-t border-border animate-slide-in-down">
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
