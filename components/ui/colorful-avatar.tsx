"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ColorfulAvatarProps {
  name: string
  email?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showBorder?: boolean
}

export function ColorfulAvatar({ name, email, size = "md", className, showBorder = false }: ColorfulAvatarProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }

  const borderClasses = {
    sm: "ring-1",
    md: "ring-2",
    lg: "ring-2",
    xl: "ring-4",
  }

  // Generate DiceBear avatar URL
  const seed = email || name
  const diceBearUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&radius=50`

  // Generate initials
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  // Generate background color based on name
  const colors = [
    "bg-gradient-to-br from-pink-400 to-pink-600",
    "bg-gradient-to-br from-purple-400 to-purple-600",
    "bg-gradient-to-br from-blue-400 to-blue-600",
    "bg-gradient-to-br from-green-400 to-green-600",
    "bg-gradient-to-br from-yellow-400 to-yellow-600",
    "bg-gradient-to-br from-red-400 to-red-600",
    "bg-gradient-to-br from-indigo-400 to-indigo-600",
    "bg-gradient-to-br from-teal-400 to-teal-600",
  ]

  const colorIndex = name.charCodeAt(0) % colors.length
  const bgColor = colors[colorIndex]

  return (
    <Avatar
      className={cn(sizeClasses[size], showBorder && `${borderClasses[size]} ring-white ring-offset-2`, className)}
    >
      <AvatarImage src={diceBearUrl || "/placeholder.svg"} alt={name} />
      <AvatarFallback className={cn(bgColor, "text-white font-semibold")}>{initials}</AvatarFallback>
    </Avatar>
  )
}
