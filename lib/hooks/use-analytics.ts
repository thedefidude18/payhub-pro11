"use client"

import { useState, useEffect } from "react"
import { supabase } from "../supabase/client"

export function useAnalytics() {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalCommissions: 0,
    freelancerCount: 0,
    projectCount: 0,
    activeProjects: 0,
    averageProjectValue: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true)

        // Get payments data
        const { data: payments, error: paymentsError } = await supabase
          .from("payments")
          .select("amount, commission_amount, status")
          .eq("status", "completed")

        if (paymentsError) throw paymentsError

        // Get freelancer count
        const { count: freelancerCount, error: freelancerError } = await supabase
          .from("freelancers")
          .select("*", { count: "exact", head: true })

        if (freelancerError) throw freelancerError

        // Get project count
        const { count: projectCount, error: projectError } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true })

        if (projectError) throw projectError

        // Get active projects
        const { count: activeProjects, error: activeError } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .in("status", ["preview_sent", "approved"])

        if (activeError) throw activeError

        const totalRevenue = payments?.reduce((sum, p) => sum + p.amount, 0) || 0
        const totalCommissions = payments?.reduce((sum, p) => sum + p.commission_amount, 0) || 0

        setAnalytics({
          totalRevenue,
          totalCommissions,
          freelancerCount: freelancerCount || 0,
          projectCount: projectCount || 0,
          activeProjects: activeProjects || 0,
          averageProjectValue: projectCount ? totalRevenue / projectCount : 0,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch analytics")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  return { analytics, loading, error }
}
