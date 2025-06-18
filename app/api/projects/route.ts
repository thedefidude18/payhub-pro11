import { type NextRequest, NextResponse } from "next/server"
import { ProjectService } from "@/lib/services/project-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""
    const status = searchParams.get("status") || undefined
    const category = searchParams.get("category") || undefined
    const freelancerId = searchParams.get("freelancer_id") || undefined

    const projects = await ProjectService.searchProjects(query, {
      status,
      category,
      freelancerId,
    })

    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const project = await request.json()
    const newProject = await ProjectService.createProject(project)
    return NextResponse.json(newProject)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
