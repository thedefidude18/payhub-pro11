"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  MoreHorizontal,
  Search,
  Eye,
  Crown,
  UserX,
  Mail,
  Phone,
  Calendar,
  Star,
  Globe,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  Users,
} from "lucide-react"
import { ColorfulAvatar } from "@/components/ui/colorful-avatar"
import { ColorfulBadge } from "@/components/ui/colorful-badge"
import { useToast } from "@/hooks/use-toast"

// Mock data for freelancers
const mockFreelancers = [
  {
    id: "1",
    user_id: "freelancer-1",
    users: {
      full_name: "John Smith",
      email: "john@designer.com",
      phone: "+1 (555) 123-4567",
      avatar_url: null,
      status: "active",
      role: "freelancer",
      created_at: "2024-01-15",
      last_login: "2024-01-20",
    },
    business_name: "John Design Studio",
    subdomain: "johndesign",
    subdomain_status: "approved",
    total_earnings: 15000,
    total_projects: 25,
    completed_projects: 22,
    approval_rating: 4.8,
    is_verified: false,
    commission_rate: 10.0,
    skills: ["Logo Design", "Branding", "Web Design"],
    location: "New York, USA",
    bio: "Professional designer with 5+ years of experience in branding and web design.",
    portfolio_url: "https://johndesign.com",
    created_at: "2024-01-15",
  },
  {
    id: "2",
    user_id: "freelancer-2",
    users: {
      full_name: "Sarah Johnson",
      email: "sarah@creative.com",
      phone: "+1 (555) 987-6543",
      avatar_url: null,
      status: "active",
      role: "superfreelancer",
      created_at: "2023-08-20",
      last_login: "2024-01-21",
    },
    business_name: "Sarah Creative Agency",
    subdomain: "sarahcreative",
    subdomain_status: "approved",
    total_earnings: 45000,
    total_projects: 78,
    completed_projects: 75,
    approval_rating: 4.9,
    is_verified: true,
    commission_rate: 7.5,
    skills: ["UI/UX Design", "Mobile Apps", "Branding", "Illustration"],
    location: "San Francisco, USA",
    bio: "Award-winning creative director specializing in digital experiences and brand identity.",
    portfolio_url: "https://sarahcreative.com",
    created_at: "2023-08-20",
  },
  {
    id: "3",
    user_id: "freelancer-3",
    users: {
      full_name: "Mike Chen",
      email: "mike@webdev.com",
      phone: "+1 (555) 456-7890",
      avatar_url: null,
      status: "pending",
      role: "freelancer",
      created_at: "2024-01-18",
      last_login: "2024-01-19",
    },
    business_name: "Chen Web Solutions",
    subdomain: "chenweb",
    subdomain_status: "pending",
    total_earnings: 0,
    total_projects: 0,
    completed_projects: 0,
    approval_rating: 0,
    is_verified: false,
    commission_rate: 10.0,
    skills: ["React", "Node.js", "Full Stack Development"],
    location: "Toronto, Canada",
    bio: "Full-stack developer with expertise in modern web technologies.",
    portfolio_url: "https://mikechendev.com",
    created_at: "2024-01-18",
  },
]

export function AdminFreelancersPage() {
  const [freelancers, setFreelancers] = useState(mockFreelancers)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  const filteredFreelancers = freelancers.filter((freelancer) => {
    const matchesSearch =
      freelancer.users.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.users.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || freelancer.users.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: freelancers.length,
    active: freelancers.filter((f) => f.users.status === "active").length,
    pending: freelancers.filter((f) => f.users.status === "pending").length,
    suspended: freelancers.filter((f) => f.users.status === "suspended").length,
    superFreelancers: freelancers.filter((f) => f.is_verified).length,
  }

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

  const handleApproveFreelancer = async (freelancerId: string, freelancerName: string) => {
    setActionLoading(freelancerId)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setFreelancers((prev) =>
        prev.map((f) =>
          f.user_id === freelancerId
            ? {
                ...f,
                users: { ...f.users, status: "active" },
                subdomain_status: "approved",
              }
            : f,
        ),
      )

      toast({
        title: "Success",
        description: `${freelancerName} has been approved!`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve freelancer",
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

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Freelancers</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.active}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">Suspended</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{stats.suspended}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">SuperFreelancers</CardTitle>
            <Crown className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{stats.superFreelancers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Freelancer Management</CardTitle>
              <CardDescription>Manage freelancers, approve accounts, and handle promotions</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search freelancers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Freelancer</TableHead>
                  <TableHead className="hidden md:table-cell">Subdomain</TableHead>
                  <TableHead className="hidden lg:table-cell">Earnings</TableHead>
                  <TableHead className="hidden lg:table-cell">Projects</TableHead>
                  <TableHead className="hidden md:table-cell">Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFreelancers.map((freelancer) => (
                  <TableRow key={freelancer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <ColorfulAvatar name={freelancer.users.full_name} email={freelancer.users.email} size="md" />
                        <div className="min-w-0">
                          <div className="font-medium truncate">{freelancer.users.full_name}</div>
                          <div className="text-sm text-muted-foreground truncate">{freelancer.business_name}</div>
                          <div className="text-xs text-muted-foreground md:hidden">
                            {freelancer.subdomain}.payvidi.com
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{freelancer.subdomain}.payvidi.com</span>
                        {freelancer.is_verified && <Crown className="h-4 w-4 text-yellow-500" />}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      ${freelancer.total_earnings.toLocaleString()}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{freelancer.total_projects}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {freelancer.approval_rating > 0 ? (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{freelancer.approval_rating}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">No rating</span>
                      )}
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
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedFreelancer(freelancer)
                              setShowDetails(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {freelancer.users.status === "pending" && (
                            <DropdownMenuItem
                              onClick={() => handleApproveFreelancer(freelancer.user_id, freelancer.users.full_name)}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve Account
                            </DropdownMenuItem>
                          )}
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
          </div>
        </CardContent>
      </Card>

      {/* Freelancer Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Freelancer Details</DialogTitle>
            <DialogDescription>Complete information about {selectedFreelancer?.users.full_name}</DialogDescription>
          </DialogHeader>

          {selectedFreelancer && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 p-6 bg-gray-50 rounded-lg">
                <ColorfulAvatar
                  name={selectedFreelancer.users.full_name}
                  email={selectedFreelancer.users.email}
                  size="xl"
                  showBorder
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{selectedFreelancer.users.full_name}</h3>
                      <p className="text-gray-600">{selectedFreelancer.business_name}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <ColorfulBadge variant="status" value={selectedFreelancer.users.status}>
                          {selectedFreelancer.users.status}
                        </ColorfulBadge>
                        {selectedFreelancer.is_verified && (
                          <ColorfulBadge variant="role" value="superfreelancer">
                            SuperFreelancer
                          </ColorfulBadge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{selectedFreelancer.users.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{selectedFreelancer.users.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <span>{selectedFreelancer.location}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Joined {new Date(selectedFreelancer.created_at).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performance Stats */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Performance</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Total Earnings</span>
                          <span className="font-semibold">${selectedFreelancer.total_earnings.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Total Projects</span>
                          <span className="font-semibold">{selectedFreelancer.total_projects}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Completed Projects</span>
                          <span className="font-semibold">{selectedFreelancer.completed_projects}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Approval Rating</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{selectedFreelancer.approval_rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Commission Rate</span>
                          <span className="font-semibold">{selectedFreelancer.commission_rate}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Bio and Skills */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">About</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{selectedFreelancer.bio}</p>
                      <div>
                        <h4 className="font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedFreelancer.skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Portfolio</h4>
                        <a
                          href={selectedFreelancer.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {selectedFreelancer.portfolio_url}
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project History</CardTitle>
                      <CardDescription>Recent projects and performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-gray-500">
                        No projects data available. This would show the freelancer's project history.
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>Manage freelancer account settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Account Status</h4>
                            <p className="text-sm text-gray-600">Current account status</p>
                          </div>
                          <ColorfulBadge variant="status" value={selectedFreelancer.users.status}>
                            {selectedFreelancer.users.status}
                          </ColorfulBadge>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">SuperFreelancer Status</h4>
                            <p className="text-sm text-gray-600">Premium account benefits</p>
                          </div>
                          {selectedFreelancer.is_verified ? (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Crown className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Not Verified</Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Commission Rate</h4>
                            <p className="text-sm text-gray-600">Platform commission percentage</p>
                          </div>
                          <span className="font-semibold">{selectedFreelancer.commission_rate}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
