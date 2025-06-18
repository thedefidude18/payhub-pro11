import { supabaseServer } from "../supabase/server"
import type { Database } from "../supabase/types"

type Freelancer = Database["public"]["Tables"]["freelancers"]["Row"]
type FreelancerInsert = Database["public"]["Tables"]["freelancers"]["Insert"]
type FreelancerUpdate = Database["public"]["Tables"]["freelancers"]["Update"]

export class FreelancerService {
  static async getAllFreelancers() {
    const { data, error } = await supabaseServer
      .from("freelancers")
      .select(`
        *,
        users!inner(*)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async getFreelancerById(id: string) {
    const { data, error } = await supabaseServer
      .from("freelancers")
      .select(`
        *,
        users!inner(*)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  }

  static async getFreelancerBySubdomain(subdomain: string) {
    const { data, error } = await supabaseServer
      .from("freelancers")
      .select(`
        *,
        users!inner(*)
      `)
      .eq("subdomain", subdomain)
      .single()

    if (error) throw error
    return data
  }

  static async updateFreelancer(id: string, updates: FreelancerUpdate) {
    const { data, error } = await supabaseServer.from("freelancers").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  static async promoteToSuperFreelancer(freelancerId: string) {
    // Update user role
    const { error: userError } = await supabaseServer
      .from("users")
      .update({ role: "superfreelancer" })
      .eq("id", freelancerId)

    if (userError) throw userError

    // Update freelancer profile
    const { data, error } = await supabaseServer
      .from("freelancers")
      .update({
        is_verified: true,
        commission_rate: 7.5, // Reduced commission for SuperFreelancers
      })
      .eq("user_id", freelancerId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async suspendFreelancer(freelancerId: string) {
    const { data, error } = await supabaseServer
      .from("users")
      .update({ status: "suspended" })
      .eq("id", freelancerId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async getFreelancerStats(freelancerId: string) {
    // Get project stats
    const { data: projectStats, error: projectError } = await supabaseServer
      .from("projects")
      .select("status, price")
      .eq("freelancer_id", freelancerId)

    if (projectError) throw projectError

    // Get payment stats
    const { data: paymentStats, error: paymentError } = await supabaseServer
      .from("payments")
      .select("amount, commission_amount, freelancer_amount, status")
      .eq("freelancer_id", freelancerId)

    if (paymentError) throw paymentError

    return {
      totalProjects: projectStats.length,
      completedProjects: projectStats.filter((p) => p.status === "delivered").length,
      totalEarnings: paymentStats
        .filter((p) => p.status === "completed")
        .reduce((sum, p) => sum + p.freelancer_amount, 0),
      totalCommissions: paymentStats
        .filter((p) => p.status === "completed")
        .reduce((sum, p) => sum + p.commission_amount, 0),
    }
  }
}
