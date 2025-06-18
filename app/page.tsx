"use client"

import { useState, useEffect } from "react"
import {
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  Settings,
  Bell,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Star,
  Briefcase,
  BarChart3,
  PlusCircle,
  Upload,
  CheckCircle,
  Crown,
  Target,
  Edit,
  Send,
  ChevronRight,
  UserX,
  Loader2,
  LogOut,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Component imports
import { ProfileModal } from "@/components/profile/profile-modal"
import { ProjectTimeline } from "@/components/projects/project-timeline"
import { MessagesPage } from "@/components/pages/messages-page"
import { NotificationsPage } from "@/components/pages/notifications-page"
import { useNavigation } from "@/components/navigation/navigation-handler"
import { ColorfulAvatar } from "@/components/ui/colorful-avatar"
import { ColorfulBadge } from "@/components/ui/colorful-badge"
import { AnalyticsPage } from "@/components/pages/analytics-page"
import { CalendarPage } from "@/components/pages/calendar-page"
import { HelpPage } from "@/components/pages/help-page"
import { AdminSettingsPage } from "@/components/pages/admin-settings-page"
import { FreelancerSettingsPage } from "@/components/pages/freelancer-settings-page"
import { AdminFreelancersPage } from "@/components/pages/admin-freelancers-page"
import { AdminProjectsPage } from "@/components/pages/admin-projects-page"
import { LandingPage } from "@/components/landing/landing-page"
import { CreateProjectModal } from "@/components/modals/create-project-modal"
import { UploadFilesModal } from "@/components/modals/upload-files-modal"

// Auth
import { AuthProvider, useAuth } from "@/lib/auth/simple-auth"

// Mock data functions
async function fetchAnalytics() {
  return {
    totalRevenue: 125000,
    totalCommissions: 12500,
    freelancerCount: 45,
    projectCount: 234,
    activeProjects: 28,
    averageProjectValue: 534,
  }
}

async function fetchFreelancers() {
  return [
    {
      id: "1",
      user_id: "freelancer-1",
      users: {
        full_name: "John Smith",
        email: "john@designer.com",
        avatar_url: null,
        status: "active",
        role: "freelancer",
      },
      business_name: "John Design Studio",
      subdomain: "johndesign",
      subdomain_status: "approved",
      total_earnings: 15000,
      total_projects: 25,
      approval_rating: 4.8,
      is_verified: false,
      commission_rate: 10.0,
      created_at: "2024-01-15",
    },
    {
      id: "2",
      user_id: "freelancer-2",
      users: {
        full_name: "Sarah Johnson",
        email: "sarah@creative.com",
        avatar_url: null,
        status: "active",
        role: "superfreelancer",
      },
      business_name: "Sarah Creative Agency",
      subdomain: "sarahcreative",
      subdomain_status: "approved",
      total_earnings: 45000,
      total_projects: 78,
      approval_rating: 4.9,
      is_verified: true,
      commission_rate: 7.5,
      created_at: "2023-08-20",
    },
  ]
}

async function fetchProjects() {
  return [
    {
      id: "1",
      freelancer_id: "freelancer-1",
      title: "Logo Design for Tech Startup",
      client_name: "Tech Startup Inc",
      client_email: "client1@example.com",
      price: 500,
      status: "preview_sent",
      category: "Logo Design",
      created_at: "2024-01-20",
      deadline: "2024-02-01",
      tags: ["logo", "tech", "startup"],
    },
    {
      id: "2",
      freelancer_id: "freelancer-1",
      title: "Website Redesign",
      client_name: "Restaurant Chain",
      client_email: "client2@example.com",
      price: 2500,
      status: "approved",
      category: "Web Design",
      created_at: "2024-01-18",
      deadline: "2024-02-15",
      tags: ["website", "restaurant", "redesign"],
    },
  ]
}

async function fetchPayments() {
  return [
    {
      id: "1",
      freelancer_id: "freelancer-2",
      amount: 3500,
      commission_amount: 262.5,
      freelancer_amount: 3237.5,
      status: "completed",
      client_email: "client3@example.com",
      created_at: "2024-01-15",
      projects: { title: "Brand Identity Package" },
      freelancers: { business_name: "Sarah Creative Agency" },
    },
  ]
}

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
  </div>
)

// User Profile Dropdown Component
function UserProfileDropdown() {
  const { user, signOut } = useAuth()
  const [showProfile, setShowProfile] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <ColorfulAvatar name={user?.full_name || "User"} email={user?.email} size="md" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.full_name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              <ColorfulBadge variant="role" value={user?.role} className="w-fit text-xs">
                {user?.role}
              </ColorfulBadge>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowProfile(true)}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileModal open={showProfile} onOpenChange={setShowProfile} />
    </>
  )
}

// Admin Dashboard Component
const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalCommissions: 0,
    freelancerCount: 0,
    projectCount: 0,
    activeProjects: 0,
    averageProjectValue: 0,
  })
  const [freelancers, setFreelancers] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const [analyticsData, freelancersData, paymentsData] = await Promise.all([
          fetchAnalytics(),
          fetchFreelancers(),
          fetchPayments(),
        ])

        setAnalytics(analyticsData)
        setFreelancers(freelancersData)
        setPayments(paymentsData)
      } catch (error) {
        console.error("Error loading data:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  const handlePromoteFreelancer = async (freelancerId: string, freelancerName: string) => {
    setActionLoading(freelancerId)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setFreelancers((prev) =>
        prev.map((f) =>
          f.user_id === freelancerId
            ? {
                ...f,
                is_verified: true,
                commission_rate: 7.5,
                users: { ...f.users, role: "superfreelancer" },
              }
            : f,
        ),
      )

      toast({
        title: "Success",
        description: `${freelancerName} has been promoted to SuperFreelancer!`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to promote freelancer",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleSuspendFreelancer = async (freelancerId: string, freelancerName: string) => {
    setActionLoading(freelancerId)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setFreelancers((prev) =>
        prev.map((f) => (f.user_id === freelancerId ? { ...f, users: { ...f.users, status: "suspended" } } : f)),
      )

      toast({
        title: "Success",
        description: `${freelancerName} has been suspended.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to suspend freelancer",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Revenue</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">${analytics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-blue-600">Platform lifetime revenue</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Commission Earned</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg shadow-sm">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">${analytics.totalCommissions.toLocaleString()}</div>
            <p className="text-xs text-green-600">Total platform commissions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Active Freelancers</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg shadow-sm">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{analytics.freelancerCount}</div>
            <p className="text-xs text-purple-600">Registered freelancers</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Active Projects</CardTitle>
            <div className="p-2 bg-orange-500 rounded-lg shadow-sm">
              <FileText className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{analytics.activeProjects}</div>
            <p className="text-xs text-orange-600">Projects in progress</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="freelancers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="freelancers">Freelancers</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="settings">Platform Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="freelancers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Freelancer Management</CardTitle>
              <CardDescription>Manage freelancers, approve subdomains, and handle promotions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Freelancer</TableHead>
                    <TableHead>Subdomain</TableHead>
                    <TableHead>Earnings</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {freelancers.map((freelancer) => (
                    <TableRow key={freelancer.id}>
                      <TableCell className="flex items-center space-x-3">
                        <ColorfulAvatar name={freelancer.users.full_name} email={freelancer.users.email} size="md" />
                        <div>
                          <div className="font-medium">{freelancer.users.full_name}</div>
                          <div className="text-sm text-muted-foreground">{freelancer.business_name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{freelancer.subdomain}.payvidi.com</span>
                          {freelancer.is_verified && <Crown className="h-4 w-4 text-yellow-500" />}
                        </div>
                      </TableCell>
                      <TableCell>${freelancer.total_earnings.toLocaleString()}</TableCell>
                      <TableCell>{freelancer.total_projects}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{freelancer.approval_rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <ColorfulBadge variant="status" value={freelancer.users.status}>
                          {freelancer.users.status}
                        </ColorfulBadge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              disabled={actionLoading === freelancer.user_id}
                            >
                              {actionLoading === freelancer.user_id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <MoreHorizontal className="h-4 w-4" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            {!freelancer.is_verified && freelancer.users.status === "active" && (
                              <DropdownMenuItem
                                onClick={() => handlePromoteFreelancer(freelancer.user_id, freelancer.users.full_name)}
                              >
                                <Crown className="mr-2 h-4 w-4" />
                                Promote to SuperFreelancer
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {freelancer.users.status === "active" && (
                              <DropdownMenuItem
                                onClick={() => handleSuspendFreelancer(freelancer.user_id, freelancer.users.full_name)}
                                className="text-red-600"
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Suspend Account
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Management</CardTitle>
              <CardDescription>Track payments, commissions, and transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              {payments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No payments found. Payments will appear here once freelancers start receiving payments.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Freelancer</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.projects.title}</TableCell>
                        <TableCell>{payment.freelancers.business_name}</TableCell>
                        <TableCell>{payment.client_email}</TableCell>
                        <TableCell>${payment.amount.toLocaleString()}</TableCell>
                        <TableCell>${payment.commission_amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={payment.status === "completed" ? "default" : "secondary"}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Commission Settings</CardTitle>
                <CardDescription>Configure platform commission rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Commission Rate (%)</Label>
                  <Slider defaultValue={[10]} max={25} step={0.5} className="w-full" />
                  <p className="text-sm text-muted-foreground">Current: 10%</p>
                </div>
                <div className="space-y-2">
                  <Label>SuperFreelancer Commission Rate (%)</Label>
                  <Slider defaultValue={[7.5]} max={25} step={0.5} className="w-full" />
                  <p className="text-sm text-muted-foreground">Current: 7.5%</p>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Limits</CardTitle>
                <CardDescription>Configure file and project limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Maximum File Size (MB)</Label>
                  <Input type="number" defaultValue="500" />
                </div>
                <div className="space-y-2">
                  <Label>Preview Duration Limit (seconds)</Label>
                  <Input type="number" defaultValue="300" />
                </div>
                <div className="space-y-2">
                  <Label>Download Link Expiry (hours)</Label>
                  <Input type="number" defaultValue="168" />
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Enhanced Freelancer Dashboard with Functional Cards
const FreelancerDashboard = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [showUploadFiles, setShowUploadFiles] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const [projectsData, paymentsData] = await Promise.all([fetchProjects(), fetchPayments()])

        // Filter data for current user
        const userProjects = projectsData.filter((p) => p.freelancer_id === user?.id)
        const userPayments = paymentsData.filter((p) => p.freelancer_id === user?.id)

        setProjects(userProjects)
        setPayments(userPayments)
      } catch (error) {
        console.error("Error loading freelancer data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user?.id])

  const analytics = {
    totalEarnings: payments.reduce((sum, p) => sum + (p.status === "completed" ? p.freelancer_amount : 0), 0),
    totalProjects: projects.length,
    completedProjects: projects.filter((p) => p.status === "delivered").length,
    activeProjects: projects.filter((p) => ["preview_sent", "approved"].includes(p.status)).length,
    approvalRate: projects.length
      ? (projects.filter((p) => p.status !== "cancelled").length / projects.length) * 100
      : 0,
    averageProjectValue: projects.length ? projects.reduce((sum, p) => sum + p.price, 0) / projects.length : 0,
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Total Earnings</CardTitle>
              <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">${analytics.totalEarnings.toLocaleString()}</div>
              <p className="text-xs text-blue-600">From completed projects</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Active Projects</CardTitle>
              <div className="p-2 bg-green-500 rounded-lg shadow-sm">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{analytics.activeProjects}</div>
              <p className="text-xs text-green-600">In progress</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Approval Rate</CardTitle>
              <div className="p-2 bg-purple-500 rounded-lg shadow-sm">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{analytics.approvalRate.toFixed(1)}%</div>
              <p className="text-xs text-purple-600">Project success rate</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">Avg Project Value</CardTitle>
              <div className="p-2 bg-orange-500 rounded-lg shadow-sm">
                <Target className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">${analytics.averageProjectValue.toFixed(0)}</div>
              <p className="text-xs text-orange-600">Average project price</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Now Functional */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow hover:scale-105 transform duration-200"
            onClick={() => setShowCreateProject(true)}
          >
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <PlusCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Create New Project</h3>
                <p className="text-sm text-muted-foreground">Start a new project for a client</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow hover:scale-105 transform duration-200"
            onClick={() => setShowUploadFiles(true)}
          >
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <Upload className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Upload Files</h3>
                <p className="text-sm text-muted-foreground">Add files to existing projects</p>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow hover:scale-105 transform duration-200">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">View Analytics</h3>
                <p className="text-sm text-muted-foreground">Track your performance</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <CreateProjectModal open={showCreateProject} onOpenChange={setShowCreateProject} />
      <UploadFilesModal open={showUploadFiles} onOpenChange={setShowUploadFiles} />
    </>
  )
}

// Enhanced Freelancer Projects Page with Timeline
const FreelancerProjectsPage = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [showTimeline, setShowTimeline] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const projectsData = await fetchProjects()
        const userProjects = projectsData.filter((p) => p.freelancer_id === user?.id)
        setProjects(userProjects)
      } catch (error) {
        console.error("Error loading freelancer data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user?.id])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <PlusCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Create New Project</h3>
                <p className="text-sm text-muted-foreground">Start a new project for a client</p>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Upload className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Upload Files</h3>
                <p className="text-sm text-muted-foreground">Add files to existing projects</p>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">View Analytics</h3>
                <p className="text-sm text-muted-foreground">Track your performance</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Projects</CardTitle>
                <CardDescription>Manage your projects and client interactions</CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No projects found. Create your first project to get started!
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{project.title}</div>
                          <div className="text-sm text-muted-foreground">{project.category}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{project.client_name}</div>
                          <div className="text-sm text-muted-foreground">{project.client_email}</div>
                        </div>
                      </TableCell>
                      <TableCell>${project.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <ColorfulBadge variant="status" value={project.status}>
                          {project.status.replace("_", " ")}
                        </ColorfulBadge>
                      </TableCell>
                      <TableCell>
                        {project.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedProject(project)
                                setShowTimeline(true)
                              }}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              View Timeline
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              Send Preview
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Project Timeline Dialog */}
      {selectedProject && (
        <Dialog open={showTimeline} onOpenChange={setShowTimeline}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Project Timeline</DialogTitle>
              <DialogDescription>Communication and activity timeline for {selectedProject.title}</DialogDescription>
            </DialogHeader>
            <ProjectTimeline
              projectId={selectedProject.id}
              projectTitle={selectedProject.title}
              clientEmail={selectedProject.client_email}
              freelancerName={user?.full_name || ""}
              currentStatus={selectedProject.status}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

// Settings Page
const SettingsPage = () => {
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"

  return isAdmin ? <AdminSettingsPage /> : <FreelancerSettingsPage />
}

// Main Dashboard Component with Role-Based Access
function Dashboard() {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { activePage, setActivePage, navItems } = useNavigation(user?.role || "freelancer")

  const isAdmin = user?.role === "admin"

  const renderPageContent = () => {
    switch (activePage) {
      case "dashboard":
        return isAdmin ? <AdminDashboard /> : <FreelancerDashboard />
      case "messages":
        return <MessagesPage />
      case "notifications":
        return <NotificationsPage />
      case "projects":
        return isAdmin ? <AdminProjectsPage /> : <FreelancerProjectsPage />
      case "freelancers":
        return isAdmin ? <AdminFreelancersPage /> : null
      case "payments":
        return isAdmin ? <AdminPaymentsPage /> : <FreelancerPaymentsPage />
      case "analytics":
        return <AnalyticsPage userRole={user?.role || "freelancer"} userId={user?.id} />
      case "calendar":
        return <CalendarPage />
      case "help":
        return <HelpPage />
      case "settings":
        return <SettingsPage />
      default:
        return isAdmin ? <AdminDashboard /> : <FreelancerDashboard />
    }
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar - responsive */}
        <div
          className={`${sidebarOpen ? "w-64" : "w-16"} bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 ${!sidebarOpen && "lg:w-16"}`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className={`flex items-center space-x-3 ${!sidebarOpen && "justify-center"}`}>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PV</span>
              </div>
              {sidebarOpen && <span className="font-bold text-xl">PayVidi</span>}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={!sidebarOpen ? "mx-auto" : ""}
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {/* User Info */}
          {sidebarOpen && (
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <ColorfulAvatar name={user?.full_name || "User"} email={user?.email} size="md" showBorder />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.full_name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  <ColorfulBadge variant="role" value={user?.role} className="text-xs mt-1">
                    {user?.role}
                  </ColorfulBadge>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={item.active ? "default" : "ghost"}
                    className={`w-full justify-start ${!sidebarOpen && "px-2"}`}
                    onClick={() => setActivePage(item.id)}
                  >
                    <item.icon className="h-4 w-4" />
                    {sidebarOpen && <span className="ml-3">{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {!sidebarOpen && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header - responsive */}
          <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                  {navItems.find((item) => item.active)?.label || "Dashboard"}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 hidden sm:block">
                  {isAdmin ? "Manage your platform and freelancers" : "Manage your projects and clients"}
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button variant="outline" size="sm" onClick={() => setActivePage("notifications")}>
                  <Bell className="h-4 w-4" />
                </Button>
                <UserProfileDropdown />
              </div>
            </div>
          </header>

          {/* Dashboard Content - responsive */}
          <main className="flex-1 overflow-auto p-4 sm:p-6">{renderPageContent()}</main>
        </div>
      </div>
    </TooltipProvider>
  )
}

// Placeholder components for missing pages
const AdminPaymentsPage = () => (
  <div className="text-center py-8">
    <h2 className="text-xl font-semibold mb-2">Admin Payments</h2>
    <p className="text-gray-600">This page is under construction.</p>
  </div>
)

const FreelancerPaymentsPage = () => (
  <div className="text-center py-8">
    <h2 className="text-xl font-semibold mb-2">Freelancer Payments</h2>
    <p className="text-gray-600">This page is under construction.</p>
  </div>
)

// Main App Component with Authentication
function PayVidiApp() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return user ? <Dashboard /> : <LandingPage onGetStarted={() => {}} />
}

// Root Component with Auth Provider
export default function PayVidiPlatform() {
  return (
    <AuthProvider>
      <PayVidiApp />
    </AuthProvider>
  )
}
