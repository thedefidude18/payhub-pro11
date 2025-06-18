import { type NextRequest, NextResponse } from "next/server"
import { FreelancerService } from "@/lib/services/freelancer-service"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const freelancer = await FreelancerService.promoteToSuperFreelancer(params.id)
    return NextResponse.json(freelancer)
  } catch (error) {
    return NextResponse.json({ error: "Failed to promote freelancer" }, { status: 500 })
  }
}
