"use client"

import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { useToast } from "./toast-provider"

interface ContactFormProps {
  onClose: () => void
}

export function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      addToast("Please fill all required fields", "error")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    addToast("Message sent successfully! We'll get back to you soon.", "success")
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsLoading(false)
    setTimeout(onClose, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-in-up">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Mail className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">support@shophub.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Phone className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <MapPin className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">New Delhi, India</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background transition-all focus:ring-2 focus:ring-accent"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background transition-all focus:ring-2 focus:ring-accent"
            />
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background transition-all focus:ring-2 focus:ring-accent"
            />
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background transition-all focus:ring-2 focus:ring-accent resize-none"
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-all font-medium"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
