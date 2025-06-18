import { supabaseServer } from "../supabase/server"

export class AnalyticsService {
  static async getPlatformAnalytics() {
    // Get total revenue
    const { data: payments, error: paymentsError } = await supabaseServer
      .from("payments")
      .select("amount, commission_amount, status")
      .eq("status", "completed")

    if (paymentsError) throw paymentsError

    // Get freelancer count
    const { count: freelancerCount, error: freelancerError } = await supabaseServer
      .from("freelancers")
      .select("*", { count: "exact", head: true })

    if (freelancerError) throw freelancerError

    // Get project count
    const { count: projectCount, error: projectError } = await supabaseServer
      .from("projects")
      .select("*", { count: "exact", head: true })

    if (projectError) throw projectError

    // Get active projects
    const { count: activeProjects, error: activeError } = await supabaseServer
      .from("projects")
      .select("*", { count: "exact", head: true })
      .in("status", ["preview_sent", "approved"])

    if (activeError) throw activeError

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0)
    const totalCommissions = payments.reduce((sum, p) => sum + p.commission_amount, 0)

    return {
      totalRevenue,
      totalCommissions,
      freelancerCount: freelancerCount || 0,
      projectCount: projectCount || 0,
      activeProjects: activeProjects || 0,
      averageProjectValue: projectCount ? totalRevenue / projectCount : 0,
    }
  }

  static async getFreelancerAnalytics(freelancerId: string) {
    // Get projects
    const { data: projects, error: projectsError } = await supabaseServer
      .from("projects")
      .select("*")
      .eq("freelancer_id", freelancerId)

    if (projectsError) throw projectsError

    // Get payments
    const { data: payments, error: paymentsError } = await supabaseServer
      .from("payments")
      .select("*")
      .eq("freelancer_id", freelancerId)
      .eq("status", "completed")

    if (paymentsError) throw paymentsError

    // Get comments/feedback
    const { data: comments, error: commentsError } = await supabaseServer
      .from("comments")
      .select("*")
      .in(
        "project_id",
        projects.map((p) => p.id),
      )

    if (commentsError) throw commentsError

    const totalEarnings = payments.reduce((sum, p) => sum + p.freelancer_amount, 0)
    const completedProjects = projects.filter((p) => p.status === "delivered").length
    const approvalRate = projects.length ? (completedProjects / projects.length) * 100 : 0

    return {
      totalProjects: projects.length,
      completedProjects,
      totalEarnings,
      averageProjectValue: completedProjects ? totalEarnings / completedProjects : 0,
      approvalRate,
      totalComments: comments.length,
      activeProjects: projects.filter((p) => ["preview_sent", "approved"].includes(p.status)).length,
    }
  }

  static async logActivity(activity: {
    user_id?: string
    project_id?: string
    action: string
    details?: any
    ip_address?: string
    user_agent?: string
  }) {
    const { data, error } = await supabaseServer.from("activity_logs").insert(activity).select().single()

    if (error) throw error
    return data
  }
}
