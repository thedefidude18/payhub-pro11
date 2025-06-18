"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ColorfulBadgeProps {
  children: React.ReactNode
  variant?: "role" | "status" | "category" | "priority" | "default"
  value?: string
  className?: string
}

export function ColorfulBadge({ children, variant = "default", value, className }: ColorfulBadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "role":
        return getRoleStyles(value || children?.toString() || "")
      case "status":
        return getStatusStyles(value || children?.toString() || "")
      case "category":
        return getCategoryStyles(value || children?.toString() || "")
      case "priority":
        return getPriorityStyles(value || children?.toString() || "")
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleStyles = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300 shadow-sm"
      case "superfreelancer":
        return "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300 shadow-sm"
      case "freelancer":
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300 shadow-sm"
      case "client":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 shadow-sm"
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300 shadow-sm"
    }
  }

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 shadow-sm"
      case "suspended":
        return "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300 shadow-sm"
      case "pending":
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300 shadow-sm"
      case "approved":
        return "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-300 shadow-sm"
      case "rejected":
        return "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300 shadow-sm"
      case "completed":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 shadow-sm"
      case "preview_sent":
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300 shadow-sm"
      case "draft":
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300 shadow-sm"
      case "paid":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 shadow-sm"
      case "delivered":
        return "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300 shadow-sm"
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300 shadow-sm"
    }
  }

  const getCategoryStyles = (category: string) => {
    switch (category.toLowerCase()) {
      case "logo design":
        return "bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 border-pink-300 shadow-sm"
      case "web design":
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300 shadow-sm"
      case "branding":
        return "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300 shadow-sm"
      case "development":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 shadow-sm"
      case "marketing":
        return "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-300 shadow-sm"
      default:
        return "bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 border-indigo-300 shadow-sm"
    }
  }

  const getPriorityStyles = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300 shadow-sm"
      case "medium":
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300 shadow-sm"
      case "low":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 shadow-sm"
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300 shadow-sm"
    }
  }

  return <Badge className={cn(getVariantStyles(), "font-medium", className)}>{children}</Badge>
}
