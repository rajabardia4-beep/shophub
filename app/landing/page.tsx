"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Star, Users, Zap, ShieldCheck, TrendingUp } from "lucide-react"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for seamless shopping experience",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "Multiple payment options with enterprise-grade security",
    },
    {
      icon: TrendingUp,
      title: "Smart Tracking",
      description: "Real-time order tracking and instant notifications",
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Dedicated customer support available around the clock",
    },
  ]

  const stats = [
    { label: "10,000+", description: "Products Available" },
    { label: "50,000+", description: "Happy Customers" },
    { label: "99.9%", description: "Uptime Guarantee" },
    { label: "24h", description: "Fast Delivery" },
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Fashion Enthusiast",
      text: "ShopHub has revolutionized my online shopping. Seamless checkout and quick delivery!",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Tech Professional",
      text: "Best prices and authentic products. The wishlist feature is incredibly helpful.",
      rating: 5,
    },
    {
      name: "Ananya Patel",
      role: "Homemaker",
      text: "Love the easy returns policy and excellent customer service. Highly recommended!",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ShopHub
          </div>
          <div className="flex items-center gap-8">
            <a href="#features" className="hover:text-blue-400 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="hover:text-blue-400 transition-colors">
              Reviews
            </a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">
              Pricing
            </a>
            <Link
              href="/"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-40 -left-40 animate-pulse"></div>
          <div
            className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -bottom-40 -right-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-full text-sm animate-fade-in">
            ✨ Trusted by 50,000+ customers worldwide
          </div>

          <h1
            className="text-6xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Your Premium
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Shopping Destination
            </span>
          </h1>

          <p
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Discover thousands of products with secure checkout, instant delivery tracking, and 24/7 customer support.
            Your perfect shopping experience starts here.
          </p>

          <div className="flex gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 font-semibold flex items-center gap-2 group"
            >
              Start Shopping <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="px-8 py-4 border border-gray-500 rounded-lg hover:border-gray-300 transition-all duration-300 hover:bg-white/5 font-semibold"
            >
              Learn More
            </a>
          </div>

          {/* Floating stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-2xl font-bold text-blue-400 group-hover:scale-110 transition-transform">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4">Why Choose ShopHub?</h2>
            <p className="text-gray-400 text-lg">Premium features designed for the modern shopper</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="p-8 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  onMouseEnter={() => setActiveFeature(idx)}
                >
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4">Loved by Customers</h2>
            <p className="text-gray-400 text-lg">Real reviews from real shoppers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 animate-fade-in group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="pt-4 border-t border-white/10">
                  <p className="font-semibold text-blue-400">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/20 rounded-2xl backdrop-blur-xl animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join thousands of happy customers and discover amazing deals today.
            </p>
            <Link
              href="/"
              className="inline-block px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 font-semibold text-lg"
            >
              Start Shopping Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 text-center text-gray-400">
        <div className="max-w-6xl mx-auto">
          <p className="mb-2">ShopHub - Your Premium E-Commerce Platform</p>
          <p className="text-sm">Designed by Mahavir Bardia & Shivam Dutta</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
