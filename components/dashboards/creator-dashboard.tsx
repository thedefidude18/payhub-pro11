import { Upload, Eye, Heart, MessageCircle, TrendingUp, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CreatorDashboard() {
  const stats = {
    totalViews: 125000,
    totalEarnings: 8500,
    followers: 4200,
    engagement: 8.7,
    content: 24,
    weeklyViews: 12500,
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-pink-800">Total Views</CardTitle>
            <div className="p-2 bg-pink-500 rounded-lg shadow-sm">
              <Eye className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-900">{(stats.totalViews / 1000).toFixed(0)}K</div>
            <p className="text-xs text-pink-600">Lifetime views</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Earnings</CardTitle>
            <div className="p-2 bg-amber-500 rounded-lg shadow-sm">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">${stats.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-amber-600">Total monetization</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">Followers</CardTitle>
            <div className="p-2 bg-red-500 rounded-lg shadow-sm">
              <Heart className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{(stats.followers / 1000).toFixed(1)}K</div>
            <p className="text-xs text-red-600">Total followers</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Engagement</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.engagement}%</div>
            <p className="text-xs text-blue-600">Avg. engagement rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Content</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg shadow-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{stats.content}</div>
            <p className="text-xs text-purple-600">Total pieces</p>
          </CardContent>
        </Card>
      </div>

      {/* Creator Tools */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-pink-600" />
              Recent Content
            </CardTitle>
            <CardDescription>Your latest creations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Summer Vlog #5", views: 2400, engagement: 9.2, status: "trending" },
              { title: "Behind the Scenes", views: 1800, engagement: 8.5, status: "popular" },
              { title: "Tutorial: Editing Tips", views: 3200, engagement: 11.4, status: "viral" },
              { title: "Q&A Session", views: 950, engagement: 6.8, status: "new" },
            ].map((content, index) => (
              <div key={index} className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm">{content.title}</p>
                  <p className="text-xs text-muted-foreground">{content.views.toLocaleString()} views</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-1">{content.status}</Badge>
                  <p className="text-xs font-semibold text-blue-600">{content.engagement}% engagement</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Creator Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Creator Tools</CardTitle>
            <CardDescription>Grow your audience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Upload className="mr-2 h-4 w-4" />
              Upload New Content
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Sparkles className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Heart className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Eye className="mr-2 h-4 w-4" />
              Audience Insights
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
