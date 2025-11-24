"use client"

import { Search, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
  products: Array<{ id: string; name: string }>
}

export function SearchBar({ onSearch, products }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<typeof products>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      setSuggestions(filtered.slice(0, 5))
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query, products])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative flex-1 max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(query)
              setShowSuggestions(false)
            }
          }}
          className="w-full pl-10 pr-10 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent outline-none transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("")
              setSuggestions([])
            }}
            className="absolute right-3 p-1 hover:bg-muted rounded"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 animate-slide-in-up">
          {suggestions.map((product) => (
            <button
              key={product.id}
              onClick={() => {
                setQuery(product.name)
                onSearch(product.name)
                setShowSuggestions(false)
              }}
              className="w-full text-left px-4 py-2 hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {product.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
