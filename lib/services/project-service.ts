import { supabaseServer } from "../supabase/server"
import type { Database } from "../supabase/types"

type Project = Database["public"]["Tables"]["projects"]["Row"]
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"]
type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"]

export class ProjectService {
  static async getProjectsByFreelancer(freelancerId: string) {
    const { data, error } = await supabaseServer
      .from("projects")
      .select(`
        *,
        project_folders(name, color),
        comments(count),
        payments(*)
      `)
      .eq("freelancer_id", freelancerId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async getProjectById(id: string) {
    const { data, error } = await supabaseServer
      .from("projects")
      .select(`
        *,
        freelancers!inner(*),
        comments(*),
        payments(*)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  }

  static async createProject(project: ProjectInsert) {
    const { data, error } = await supabaseServer.from("projects").insert(project).select().single()

    if (error) throw error
    return data
  }

  static async updateProject(id: string, updates: ProjectUpdate) {
    const { data, error } = await supabaseServer.from("projects").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  static async searchProjects(
    query: string,
    filters?: {
      status?: string
      category?: string
      freelancerId?: string
    },
  ) {
    let queryBuilder = supabaseServer.from("projects").select(`
        *,
        freelancers!inner(business_name, subdomain)
      `)

    if (query) {
      queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    }

    if (filters?.status) {
      queryBuilder = queryBuilder.eq("status", filters.status)
    }

    if (filters?.category) {
      queryBuilder = queryBuilder.eq("category", filters.category)
    }

    if (filters?.freelancerId) {
      queryBuilder = queryBuilder.eq("freelancer_id", filters.freelancerId)
    }

    const { data, error } = await queryBuilder.order("created_at", { ascending: false })

    if (error) throw error
    return data
  }
}
