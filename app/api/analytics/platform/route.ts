import { NextResponse } from "next/server"
import { AnalyticsService } from "@/lib/services/analytics-service"

export async function GET() {
  try {
    const analytics = await AnalyticsService.getPlatformAnalytics()
    return NextResponse.json(analytics)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
