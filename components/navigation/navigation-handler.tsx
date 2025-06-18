"use client"

import { useState } from "react"
import {
  Home,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  Briefcase,
  MessageSquare,
  FileText,
  Calendar,
  HelpCircle,
} from "lucide-react"

export type NavigationPage =
  | "dashboard"
  | "freelancers"
  | "projects"
  | "payments"
  | "analytics"
  | "messages"
  | "settings"
  | "notifications"
  | "profile"
  | "calendar"
  | "help"

export interface NavigationItem {
  id: NavigationPage
  icon: any
  label: string
  active?: boolean
}

export const adminNavItems: NavigationItem[] = [
  { id: "dashboard", icon: Home, label: "Dashboard" },
  { id: "freelancers", icon: Users, label: "Freelancers" },
  { id: "projects", icon: FileText, label: "Projects" },
  { id: "payments", icon: CreditCard, label: "Payments" },
  { id: "analytics", icon: BarChart3, label: "Analytics" },
  { id: "messages", icon: MessageSquare, label: "Messages" },
  { id: "settings", icon: Settings, label: "Settings" },
  { id: "notifications", icon: Bell, label: "Notifications" },
]

export const freelancerNavItems: NavigationItem[] = [
  { id: "dashboard", icon: Home, label: "Dashboard" },
  { id: "projects", icon: Briefcase, label: "Projects" },
  { id: "messages", icon: MessageSquare, label: "Messages" },
  { id: "analytics", icon: BarChart3, label: "Analytics" },
  { id: "calendar", icon: Calendar, label: "Calendar" },
  { id: "settings", icon: Settings, label: "Settings" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "help", icon: HelpCircle, label: "Help" },
]

export function useNavigation(userRole: string) {
  const [activePage, setActivePage] = useState<NavigationPage>("dashboard")

  const navItems = userRole === "admin" ? adminNavItems : freelancerNavItems

  const activeNavItems = navItems.map((item) => ({
    ...item,
    active: item.id === activePage,
  }))

  return {
    activePage,
    setActivePage,
    navItems: activeNavItems,
  }
}
