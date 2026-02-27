"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type UserRole = "admin" | "freelancer" | "superfreelancer" | "entrepreneur" | "trader" | "creator"
type AccountType = "entrepreneur" | "trader" | "creator"

interface User {
  id: string
  email: string
  full_name: string
  role: UserRole
  accountType?: AccountType
  avatar_url?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, fullName: string, accountType: AccountType) => Promise<{ error?: string }>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for testing
const DEMO_USERS: Record<string, User> = {
  "admin@payveri.com": {
    id: "admin-1",
    email: "admin@payveri.com",
    full_name: "PayVeri Admin",
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
  "entrepreneur@payveri.com": {
    id: "entrepreneur-1",
    email: "entrepreneur@payveri.com",
    full_name: "Alex Entrepreneur",
    role: "entrepreneur",
    accountType: "entrepreneur",
  },
  "trader@payveri.com": {
    id: "trader-1",
    email: "trader@payveri.com",
    full_name: "Chris Trader",
    role: "trader",
    accountType: "trader",
  },
  "creator@payveri.com": {
    id: "creator-1",
    email: "creator@payveri.com",
    full_name: "Maya Creator",
    role: "creator",
    accountType: "creator",
  },
}

const DEMO_PASSWORDS: Record<string, string> = {
  "admin@payveri.com": "admin123",
  "john@designer.com": "freelancer123",
  "sarah@creative.com": "super123",
  "entrepreneur@payveri.com": "entrepreneur123",
  "trader@payveri.com": "trader123",
  "creator@payveri.com": "creator123",
}

// Store for new signup users
let signupUsers: Record<string, { user: User; password: string }> = {}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const demoUser = DEMO_USERS[email]
    const demoPassword = DEMO_PASSWORDS[email]
    const signupUser = signupUsers[email]

    // Check demo users
    if (demoUser && demoPassword === password) {
      setUser(demoUser)
      setLoading(false)
      return {}
    }

    // Check signup users
    if (signupUser && signupUser.password === password) {
      setUser(signupUser.user)
      setLoading(false)
      return {}
    }

    setLoading(false)
    return { error: "Invalid email or password" }
  }

  const signUp = async (email: string, password: string, fullName: string, accountType: AccountType) => {
    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if email already exists
    if (DEMO_USERS[email] || signupUsers[email]) {
      setLoading(false)
      return { error: "Email already registered" }
    }

    // Create new user
    const newUser: User = {
      id: `${accountType}-${Date.now()}`,
      email,
      full_name: fullName,
      role: accountType as UserRole,
      accountType,
    }

    signupUsers[email] = { user: newUser, password }
    setUser(newUser)
    setLoading(false)
    return {}
  }

  const signOut = () => {
    setUser(null)
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
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
