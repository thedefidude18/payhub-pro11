import { NextResponse } from "next/server"
import { FreelancerService } from "@/lib/services/freelancer-service"

export async function GET() {
  try {
    const freelancers = await FreelancerService.getAllFreelancers()
    return NextResponse.json(freelancers)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch freelancers" }, { status: 500 })
  }
}
