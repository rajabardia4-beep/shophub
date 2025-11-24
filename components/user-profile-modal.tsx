"use client"

import { X, LogOut } from "lucide-react"
import { useAuth } from "./auth-context"
import { useRouter } from "next/navigation"

interface UserProfileModalProps {
  onClose: () => void
}

export function UserProfileModal({ onClose }: UserProfileModalProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    onClose()
    router.push("/login")
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-background rounded-lg max-w-md w-full mx-4 animate-slide-in-up">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold">Account Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="text-sm text-muted-foreground">Name</label>
            <p className="text-lg font-medium">{user?.name}</p>
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <p className="text-lg font-medium">{user?.email}</p>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <div className="text-sm text-muted-foreground">
              <p>Member since: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
