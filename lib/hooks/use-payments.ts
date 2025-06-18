"use client"

import { useState, useEffect } from "react"
import { supabase } from "../supabase/client"

export function usePayments(freelancerId?: string) {
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPayments() {
      try {
        setLoading(true)
        let query = supabase
          .from("payments")
          .select(`
            *,
            projects!inner(title, client_name),
            freelancers!inner(business_name, users!inner(full_name))
          `)
          .order("created_at", { ascending: false })

        if (freelancerId) {
          query = query.eq("freelancer_id", freelancerId)
        }

        const { data, error } = await query

        if (error) throw error
        setPayments(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch payments")
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [freelancerId])

  return { payments, loading, error }
}
