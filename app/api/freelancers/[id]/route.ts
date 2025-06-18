import { type NextRequest, NextResponse } from "next/server"
import { FreelancerService } from "@/lib/services/freelancer-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const freelancer = await FreelancerService.getFreelancerById(params.id)
    return NextResponse.json(freelancer)
  } catch (error) {
    return NextResponse.json({ error: "Freelancer not found" }, { status: 404 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()
    const freelancer = await FreelancerService.updateFreelancer(params.id, updates)
    return NextResponse.json(freelancer)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update freelancer" }, { status: 500 })
  }
}
