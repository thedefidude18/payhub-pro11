"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type UserRole = "admin" | "freelancer" | "superfreelancer" | "client"

interface User {
  id: string
  email: string
  full_name: string
  role: UserRole
  avatar_url?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for testing
const DEMO_USERS: Record<string, User> = {
  "admin@payvidi.com": {
    id: "admin-1",
    email: "admin@payvidi.com",
    full_name: "PayVidi Admin",
    role: "admin",
  },
  "john@designer.com": {
    id: "freelancer-1",
    email: "john@designer.com",
    full_name: "John Smith",
    role: "freelancer",
  },
  "sarah@creative.com": {
    id: "freelancer-2",
    email: "sarah@creative.com",
    full_name: "Sarah Johnson",
    role: "superfreelancer",
  },
}

const DEMO_PASSWORDS: Record<string, string> = {
  "admin@payvidi.com": "admin123",
  "john@designer.com": "freelancer123",
  "sarah@creative.com": "super123",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const demoUser = DEMO_USERS[email]
    const demoPassword = DEMO_PASSWORDS[email]

    if (demoUser && demoPassword === password) {
      setUser(demoUser)
      setLoading(false)
      return {}
    }

    setLoading(false)
    return { error: "Invalid email or password" }
  }

  const signOut = () => {
    setUser(null)
  }

  const value = {
    user,
    loading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
