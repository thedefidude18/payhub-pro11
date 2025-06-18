import { supabaseServer } from "../supabase/server"
import type { Database } from "../supabase/types"

type Payment = Database["public"]["Tables"]["payments"]["Row"]
type PaymentInsert = Database["public"]["Tables"]["payments"]["Insert"]

export class PaymentService {
  static async createPayment(payment: PaymentInsert) {
    const { data, error } = await supabaseServer.from("payments").insert(payment).select().single()

    if (error) throw error
    return data
  }

  static async getPaymentsByFreelancer(freelancerId: string) {
    const { data, error } = await supabaseServer
      .from("payments")
      .select(`
        *,
        projects!inner(title, client_name)
      `)
      .eq("freelancer_id", freelancerId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async getAllPayments() {
    const { data, error } = await supabaseServer
      .from("payments")
      .select(`
        *,
        projects!inner(title),
        freelancers!inner(business_name, users!inner(full_name))
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async updatePaymentStatus(id: string, status: Payment["status"]) {
    const { data, error } = await supabaseServer
      .from("payments")
      .update({
        status,
        processed_at: status === "completed" ? new Date().toISOString() : null,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async calculateCommission(amount: number, commissionRate: number) {
    const commissionAmount = (amount * commissionRate) / 100
    const freelancerAmount = amount - commissionAmount

    return {
      commissionAmount,
      freelancerAmount,
    }
  }
}
