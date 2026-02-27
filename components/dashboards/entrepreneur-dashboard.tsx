import { DollarSign, TrendingUp, Users, Award, Building2, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function EntrepreneurDashboard() {
  const stats = {
    totalRevenue: 45000,
    growth: 28,
    activeTeam: 12,
    projects: 24,
    rating: 4.8,
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Revenue</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-blue-600">Lifetime earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Growth Rate</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg shadow-sm">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.growth}%</div>
            <p className="text-xs text-green-600">Month over month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Team Members</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg shadow-sm">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{stats.activeTeam}</div>
            <p className="text-xs text-purple-600">Active team members</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Projects</CardTitle>
            <div className="p-2 bg-orange-500 rounded-lg shadow-sm">
              <Target className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{stats.projects}</div>
            <p className="text-xs text-orange-600">Completed projects</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-pink-800">Rating</CardTitle>
            <div className="p-2 bg-pink-500 rounded-lg shadow-sm">
              <Award className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-900">⭐ {stats.rating}</div>
            <p className="text-xs text-pink-600">Client satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Business Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Business Overview
            </CardTitle>
            <CardDescription>Manage your enterprise operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Q1 Performance</span>
                <span className="text-sm text-green-600 font-semibold">+32%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Team Productivity</span>
                <span className="text-sm text-blue-600 font-semibold">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Client Retention</span>
                <span className="text-sm text-purple-600 font-semibold">89%</span>
              </div>
            </div>
            <Button className="w-full">View Business Analytics</Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Building2 className="mr-2 h-4 w-4" />
              Manage Team
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Target className="mr-2 h-4 w-4" />
              View Projects
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Invite Partners
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="mr-2 h-4 w-4" />
              Manage Finances
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
