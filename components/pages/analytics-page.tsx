"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ColorfulBadge } from "@/components/ui/colorful-badge"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Users, Briefcase, Star } from "lucide-react"

interface AnalyticsPageProps {
  userRole: string
  userId?: string
}

export function AnalyticsPage({ userRole, userId }: AnalyticsPageProps) {
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")

  // Mock analytics data
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalRevenue: userRole === "admin" ? 125000 : 15000,
      totalProjects: userRole === "admin" ? 234 : 25,
      activeClients: userRole === "admin" ? 89 : 12,
      avgRating: userRole === "admin" ? 4.7 : 4.8,
      growthRate: 12.5,
      completionRate: 94.2,
    },
    monthlyData: [
      { month: "Jan", revenue: 8500, projects: 12, clients: 8 },
      { month: "Feb", revenue: 9200, projects: 15, clients: 10 },
      { month: "Mar", revenue: 11000, projects: 18, clients: 12 },
      { month: "Apr", revenue: 12500, projects: 20, clients: 14 },
      { month: "May", revenue: 14200, projects: 22, clients: 16 },
      { month: "Jun", revenue: 15800, projects: 25, clients: 18 },
    ],
    projectCategories: [
      { name: "Logo Design", value: 35, color: "#FF6B6B" },
      { name: "Web Design", value: 25, color: "#4ECDC4" },
      { name: "Branding", value: 20, color: "#45B7D1" },
      { name: "Development", value: 15, color: "#96CEB4" },
      { name: "Other", value: 5, color: "#FFEAA7" },
    ],
    performanceMetrics: [
      { metric: "Response Time", value: 2.4, unit: "hours", trend: "down", good: true },
      { metric: "Client Satisfaction", value: 4.8, unit: "/5", trend: "up", good: true },
      { metric: "Project Completion", value: 94.2, unit: "%", trend: "up", good: true },
      { metric: "Revision Requests", value: 1.3, unit: "avg", trend: "down", good: true },
    ],
    topClients: [
      { name: "Tech Startup Inc", projects: 5, revenue: 4500, rating: 5.0 },
      { name: "Fashion Brand", projects: 3, revenue: 3500, rating: 4.9 },
      { name: "Restaurant Chain", projects: 4, revenue: 3200, rating: 4.8 },
      { name: "E-commerce Store", projects: 2, revenue: 2800, rating: 4.7 },
    ],
  })

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Revenue</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              ${analyticsData.overview.totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600 font-medium">+{analyticsData.overview.growthRate}%</span>
              <span className="text-blue-600">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Total Projects</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg">
              <Briefcase className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{analyticsData.overview.totalProjects}</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600 font-medium">+8 projects</span>
              <span className="text-green-600">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Active Clients</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{analyticsData.overview.activeClients}</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600 font-medium">+5 clients</span>
              <span className="text-purple-600">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Avg Rating</CardTitle>
            <div className="p-2 bg-yellow-500 rounded-lg">
              <Star className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{analyticsData.overview.avgRating}</div>
            <div className="flex items-center space-x-1 text-xs">
              <Star className="h-3 w-3 text-yellow-600 fill-current" />
              <span className="text-yellow-600 font-medium">Excellent</span>
              <span className="text-yellow-600">rating</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#93C5FD" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Categories</CardTitle>
                <CardDescription>Distribution of project types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.projectCategories}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {analyticsData.projectCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${metric.good ? "bg-green-100" : "bg-red-100"}`}>
                        {metric.trend === "up" ? (
                          <TrendingUp className={`h-4 w-4 ${metric.good ? "text-green-600" : "text-red-600"}`} />
                        ) : (
                          <TrendingDown className={`h-4 w-4 ${metric.good ? "text-green-600" : "text-red-600"}`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{metric.metric}</p>
                        <p className="text-sm text-muted-foreground">
                          {metric.value} {metric.unit}
                        </p>
                      </div>
                    </div>
                    <ColorfulBadge variant="status" value={metric.good ? "good" : "needs improvement"}>
                      {metric.good ? "Good" : "Needs Improvement"}
                    </ColorfulBadge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
                <CardDescription>Project completion statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Completion Rate</span>
                    <span className="font-medium">{analyticsData.overview.completionRate}%</span>
                  </div>
                  <Progress value={analyticsData.overview.completionRate} className="h-2" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">On Time Delivery</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={89} className="w-20 h-2" />
                      <span className="text-sm font-medium">89%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Client Satisfaction</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={96} className="w-20 h-2" />
                      <span className="text-sm font-medium">96%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Repeat Clients</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={73} className="w-20 h-2" />
                      <span className="text-sm font-medium">73%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Clients</CardTitle>
              <CardDescription>Your most valuable clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.projects} projects</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${client.revenue.toLocaleString()}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-sm">{client.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Growth Trends</CardTitle>
              <CardDescription>Projects and clients growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={analyticsData.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="projects" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="clients" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
