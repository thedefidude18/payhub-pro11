"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "../supabase/client"

type UserRole = "admin" | "freelancer" | "superfreelancer" | "client"

interface AuthUser extends User {
  role?: UserRole
  full_name?: string
  avatar_url?: string
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: { full_name?: string; avatar_url?: string }) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        await fetchUserProfile(session.user)
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (authUser: User) => {
    try {
      const { data: profile, error } = await supabase
        .from("users")
        .select("role, full_name, avatar_url")
        .eq("id", authUser.id)
        .single()

      if (error) {
        console.error("Error fetching user profile:", error)
        setUser(authUser as AuthUser)
        return
      }

      setUser({
        ...authUser,
        role: profile.role,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
      })
    } catch (error) {
      console.error("Error in fetchUserProfile:", error)
      setUser(authUser as AuthUser)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, fullName: string, role: UserRole) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    })

    if (!error && data.user) {
      // Insert user profile
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        email: data.user.email!,
        full_name: fullName,
        role: role,
      })

      if (profileError) {
        console.error("Error creating user profile:", profileError)
      }

      // If user is a freelancer, create freelancer profile
      if (role === "freelancer" || role === "superfreelancer") {
        const { error: freelancerError } = await supabase.from("freelancers").insert({
          user_id: data.user.id,
          business_name: fullName + "'s Business",
          bio: "New freelancer on PayVidi",
          commission_rate: role === "superfreelancer" ? 7.5 : 10.0,
          is_verified: role === "superfreelancer",
        })

        if (freelancerError) {
          console.error("Error creating freelancer profile:", freelancerError)
        }
      }
    }

    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out:", error)
    }
    setUser(null)
  }

  const updateProfile = async (updates: { full_name?: string; avatar_url?: string }) => {
    if (!user) return { error: new Error("No user logged in") }

    const { error } = await supabase.from("users").update(updates).eq("id", user.id)

    if (!error) {
      setUser({ ...user, ...updates })
    }

    return { error }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
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
