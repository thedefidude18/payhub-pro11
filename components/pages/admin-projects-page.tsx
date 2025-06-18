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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  MoreHorizontal,
  Search,
  Eye,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Briefcase,
} from "lucide-react"
import { ColorfulAvatar } from "@/components/ui/colorful-avatar"
import { useToast } from "@/hooks/use-toast"

// Mock data for projects
const mockProjects = [
  {
    id: "1",
    freelancer_id: "freelancer-1",
    title: "Logo Design for Tech Startup",
    description: "Complete brand identity package including logo, business cards, and letterhead design.",
    client_name: "Tech Startup Inc",
    client_email: "client1@example.com",
    price: 500,
    status: "preview_sent",
    category: "Logo Design",
    created_at: "2024-01-20",
    updated_at: "2024-01-21",
    deadline: "2024-02-01",
    tags: ["logo", "tech", "startup"],
    freelancer: {
      full_name: "John Smith",
      business_name: "John Design Studio",
      email: "john@designer.com",
    },
    files_count: 3,
    comments_count: 5,
  },
  {
    id: "2",
    freelancer_id: "freelancer-1",
    title: "Website Redesign",
    description: "Complete website redesign for restaurant chain with modern UI/UX.",
    client_name: "Restaurant Chain",
    client_email: "client2@example.com",
    price: 2500,
    status: "approved",
    category: "Web Design",
    created_at: "2024-01-18",
    updated_at: "2024-01-20",
    deadline: "2024-02-15",
    tags: ["website", "restaurant", "redesign"],
    freelancer: {
      full_name: "John Smith",
      business_name: "John Design Studio",
      email: "john@designer.com",
    },
    files_count: 12,
    comments_count: 8,
  },
  {
    id: "3",
    freelancer_id: "freelancer-2",
    title: "Mobile App UI Design",
    description: "Complete UI/UX design for iOS and Android mobile application.",
    client_name: "FinTech Solutions",
    client_email: "client3@example.com",
    price: 3500,
    status: "in_progress",
    category: "Mobile Design",
    created_at: "2024-01-15",
    updated_at: "2024-01-21",
    deadline: "2024-02-10",
    tags: ["mobile", "ui", "fintech"],
    freelancer: {
      full_name: "Sarah Johnson",
      business_name: "Sarah Creative Agency",
      email: "sarah@creative.com",
    },
    files_count: 8,
    comments_count: 12,
  },
  {
    id: "4",
    freelancer_id: "freelancer-2",
    title: "Brand Identity Package",
    description: "Complete brand identity including logo, colors, typography, and brand guidelines.",
    client_name: "E-commerce Store",
    client_email: "client4@example.com",
    price: 1800,
    status: "delivered",
    category: "Branding",
    created_at: "2024-01-10",
    updated_at: "2024-01-19",
    deadline: "2024-01-25",
    tags: ["branding", "ecommerce", "identity"],
    freelancer: {
      full_name: "Sarah Johnson",
      business_name: "Sarah Creative Agency",
      email: "sarah@creative.com",
    },
    files_count: 15,
    comments_count: 6,
  },
]

export function AdminProjectsPage() {
  const [projects, setProjects] = useState(mockProjects)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const { toast } = useToast()

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.freelancer.full_name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const stats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "in_progress").length,
    previewSent: projects.filter((p) => p.status === "preview_sent").length,
    approved: projects.filter((p) => p.status === "approved").length,
    delivered: projects.filter((p) => p.status === "delivered").length,
    totalValue: projects.reduce((sum, p) => sum + p.price, 0),
  }

  const categories = [...new Set(projects.map((p) => p.category))]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "blue"
      case "preview_sent":
        return "yellow"
      case "approved":
        return "green"
      case "delivered":
        return "purple"
      case "cancelled":
        return "red"
      default:
        return "gray"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in_progress":
        return <Clock className="h-4 w-4" />
      case "preview_sent":
        return <Eye className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{stats.inProgress}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Preview Sent</CardTitle>
            <Eye className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{stats.previewSent}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{stats.delivered}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-800">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-900">${stats.totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Project Management</CardTitle>
              <CardDescription>Monitor all projects across the platform</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search projects..."
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
                <option value="in_progress">In Progress</option>
                <option value="preview_sent">Preview Sent</option>
                <option value="approved">Approved</option>
                <option value="delivered">Delivered</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead className="hidden md:table-cell">Freelancer</TableHead>
                  <TableHead className="hidden lg:table-cell">Client</TableHead>
                  <TableHead className="hidden lg:table-cell">Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Deadline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="min-w-0">
                        <div className="font-medium truncate">{project.title}</div>
                        <div className="text-sm text-muted-foreground truncate">{project.category}</div>
                        <div className="text-xs text-muted-foreground md:hidden">{project.description}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        <ColorfulAvatar name={project.freelancer.full_name} />
                        <span className="ml-2 font-medium">{project.freelancer.full_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="font-medium">{project.client_name}</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="font-medium">${project.price.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`bg-${getStatusColor(project.status)}-100 text-${getStatusColor(project.status)}-800`}
                      >
                        {getStatusIcon(project.status)}
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="font-medium">{project.deadline}</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProject(project)
                              setShowDetails(true)
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
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

      {/* Project Details Dialog */}
      {selectedProject && (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>{selectedProject.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Freelancer:</span> {selectedProject.freelancer.full_name} (
                {selectedProject.freelancer.business_name})
              </div>
              <div>
                <span className="font-medium">Client:</span> {selectedProject.client_name} (
                {selectedProject.client_email})
              </div>
              <div>
                <span className="font-medium">Price:</span> ${selectedProject.price.toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Status:</span> {selectedProject.status}
              </div>
              <div>
                <span className="font-medium">Deadline:</span> {selectedProject.deadline}
              </div>
              <div>
                <span className="font-medium">Files:</span> {selectedProject.files_count}
              </div>
              <div>
                <span className="font-medium">Comments:</span> {selectedProject.comments_count}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
