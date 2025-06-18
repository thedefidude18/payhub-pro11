"use client"

import { useState, useEffect } from "react"
import { supabase } from "../supabase/client"

export function useFreelancers() {
  const [freelancers, setFreelancers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFreelancers() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("freelancers")
          .select(`
            *,
            users!inner(*)
          `)
          .order("created_at", { ascending: false })

        if (error) throw error
        setFreelancers(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch freelancers")
      } finally {
        setLoading(false)
      }
    }

    fetchFreelancers()
  }, [])

  const promoteFreelancer = async (freelancerId: string) => {
    try {
      // Update user role to superfreelancer
      const { error: userError } = await supabase
        .from("users")
        .update({ role: "superfreelancer" })
        .eq("id", freelancerId)

      if (userError) throw userError

      // Update freelancer profile
      const { error: freelancerError } = await supabase
        .from("freelancers")
        .update({
          is_verified: true,
          commission_rate: 7.5,
        })
        .eq("user_id", freelancerId)

      if (freelancerError) throw freelancerError

      // Update local state
      setFreelancers((prev) =>
        prev.map((f) =>
          f.user_id === freelancerId
            ? { ...f, is_verified: true, commission_rate: 7.5, users: { ...f.users, role: "superfreelancer" } }
            : f,
        ),
      )
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to promote freelancer")
    }
  }

  const suspendFreelancer = async (freelancerId: string) => {
    try {
      const { error } = await supabase.from("users").update({ status: "suspended" }).eq("id", freelancerId)

      if (error) throw error

      // Update local state
      setFreelancers((prev) =>
        prev.map((f) => (f.user_id === freelancerId ? { ...f, users: { ...f.users, status: "suspended" } } : f)),
      )
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to suspend freelancer")
    }
  }

  return { freelancers, loading, error, promoteFreelancer, suspendFreelancer }
}
