"use client"

import { useState, useEffect } from "react"
import { supabase } from "../supabase/client"

export function useProjects(freelancerId?: string) {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        let query = supabase
          .from("projects")
          .select(`
            *,
            project_folders(name, color),
            freelancers!inner(business_name, subdomain)
          `)
          .order("created_at", { ascending: false })

        if (freelancerId) {
          query = query.eq("freelancer_id", freelancerId)
        }

        const { data, error } = await query

        if (error) throw error
        setProjects(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [freelancerId])

  return { projects, loading, error }
}
