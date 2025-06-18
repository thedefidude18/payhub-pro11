"use client"

import type React from "react"

import { useAuth } from "@/lib/auth/auth-context"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles?: ("admin" | "freelancer" | "superfreelancer" | "client")[]
  fallback?: React.ReactNode
}

export function AuthGuard({ children, allowedRoles, fallback }: AuthGuardProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!user) {
    return fallback || <div>Please log in to access this page.</div>
  }

  if (allowedRoles && user.role && !allowedRoles.includes(user.role)) {
    return <div>You don't have permission to access this page.</div>
  }

  return <>{children}</>
}
