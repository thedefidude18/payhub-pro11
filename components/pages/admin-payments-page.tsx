"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ColorfulBadge } from "@/components/ui/colorful-badge"
import { ColorfulAvatar } from "@/components/ui/colorful-avatar"
import { useToast } from "@/hooks/use-toast"
import {
  DollarSign,
  TrendingUp,
  Search,
  Download,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
  Send,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Payment {
  id: string
  transaction_id: string
  project_id: string
  project_title: string
  freelancer_id: string
  freelancer_name: string
  freelancer_email: string
  client_email: string
  client_name: string
  amount: number
  commission_amount: number
  freelancer_amount: number
  currency: string
  payment_method: string
  payment_gateway: string
  status: "pending" | "processing" | "completed" | "failed" | "refunded"
  created_at: string
  processed_at?: string
  failure_reason?: string
}

interface PaymentStats {
  totalRevenue: number
  totalCommissions: number
  totalPayouts: number
  pendingPayments: number
  completedPayments: number
  failedPayments: number
  averageTransactionValue: number
  monthlyGrowth: number
}

export function AdminPaymentsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

  // Mock payment data
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "pay_001",
      transaction_id: "FLW_TXN_001234567890",
      project_id: "proj_001",
      project_title: "Logo Design for Tech Startup",
      freelancer_id: "freelancer_001",
      freelancer_name: "John Smith",
      freelancer_email: "john@designer.com",
      client_email: "client@techstartup.com",
      client_name: "Tech Startup Inc",
      amount: 500.0,
      commission_amount: 50.0,
      freelancer_amount: 450.0,
      currency: "USD",
      payment_method: "card",
      payment_gateway: "flutterwave",
      status: "completed",
      created_at: "2024-01-20T10:30:00Z",
      processed_at: "2024-01-20T10:32:15Z",
    },
    {
      id: "pay_002",
      transaction_id: "FLW_TXN_001234567891",
      project_id: "proj_002",
      project_title: "Website Redesign",
      freelancer_id: "freelancer_001",
      freelancer_name: "John Smith",
      freelancer_email: "john@designer.com",
      client_email: "client@restaurant.com",
      client_name: "Restaurant Chain",
      amount: 2500.0,
      commission_amount: 250.0,
      freelancer_amount: 2250.0,
      currency: "USD",
      payment_method: "bank_transfer",
      payment_gateway: "flutterwave",
      status: "pending",
      created_at: "2024-01-22T14:15:00Z",
    },
    {
      id: "pay_003",
      transaction_id: "FLW_TXN_001234567892",
      project_id: "proj_003",
      project_title: "Brand Identity Package",
      freelancer_id: "freelancer_002",
      freelancer_name: "Sarah Johnson",
      freelancer_email: "sarah@creative.com",
      client_email: "client@fashion.com",
      client_name: "Fashion Brand",
      amount: 3500.0,
      commission_amount: 262.5,
      freelancer_amount: 3237.5,
      currency: "USD",
      payment_method: "card",
      payment_gateway: "flutterwave",
      status: "completed",
      created_at: "2024-01-18T09:20:00Z",
      processed_at: "2024-01-18T09:22:30Z",
    },
    {
      id: "pay_004",
      transaction_id: "FLW_TXN_001234567893",
      project_id: "proj_004",
      project_title: "Mobile App Design",
      freelancer_id: "freelancer_003",
      freelancer_name: "Mike Wilson",
      freelancer_email: "mike@developer.com",
      client_email: "client@startup.com",
      client_name: "Mobile Startup",
      amount: 1200.0,
      commission_amount: 120.0,
      freelancer_amount: 1080.0,
      currency: "USD",
      payment_method: "card",
      payment_gateway: "flutterwave",
      status: "failed",
      created_at: "2024-01-21T16:45:00Z",
      failure_reason: "Insufficient funds",
    },
  ])

  const [paymentStats, setPaymentStats] = useState<PaymentStats>({
    totalRevenue: 7700.0,
    totalCommissions: 682.5,
    totalPayouts: 7017.5,
    pendingPayments: 1,
    completedPayments: 2,
    failedPayments: 1,
    averageTransactionValue: 1925.0,
    monthlyGrowth: 15.2,
  })

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.project_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.freelancer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transaction_id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleProcessPayment = async (paymentId: string) => {
    setActionLoading(paymentId)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === paymentId
            ? {
                ...payment,
                status: "completed" as const,
                processed_at: new Date().toISOString(),
              }
            : payment,
        ),
      )

      toast({
        title: "Payment Processed",
        description: "Payment has been successfully processed.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleRefundPayment = async (paymentId: string) => {
    setActionLoading(paymentId)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === paymentId
            ? {
                ...payment,
                status: "refunded" as const,
                processed_at: new Date().toISOString(),
              }
            : payment,
        ),
      )

      toast({
        title: "Payment Refunded",
        description: "Payment has been successfully refunded.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refund payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleRetryPayment = async (paymentId: string) => {
    setActionLoading(paymentId)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === paymentId
            ? {
                ...payment,
                status: "pending" as const,
                failure_reason: undefined,
              }
            : payment,
        ),
      )

      toast({
        title: "Payment Retry Initiated",
        description: "Payment retry has been initiated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to retry payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "refunded":
        return <RefreshCw className="h-4 w-4 text-blue-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const formatCurrency = (amount: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payment Management</h1>
          <p className="text-muted-foreground">Monitor and manage all platform payments</p>
        </div>
        <div className="flex items-center space-x-2">
          <ColorfulBadge variant="status" value="flutterwave">
            Powered by Flutterwave
          </ColorfulBadge>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Total Revenue</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{formatCurrency(paymentStats.totalRevenue)}</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600 font-medium">+{paymentStats.monthlyGrowth}%</span>
              <span className="text-green-600">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Commissions</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{formatCurrency(paymentStats.totalCommissions)}</div>
            <p className="text-xs text-blue-600">Platform earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Completed Payments</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{paymentStats.completedPayments}</div>
            <p className="text-xs text-purple-600">Successful transactions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Pending Payments</CardTitle>
            <div className="p-2 bg-orange-500 rounded-lg">
              <Clock className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{paymentStats.pendingPayments}</div>
            <p className="text-xs text-orange-600">Awaiting processing</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Gateway Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Transactions</CardTitle>
              <CardDescription>View and manage all payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Freelancer</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{payment.transaction_id}</div>
                            <div className="text-sm text-muted-foreground">{payment.payment_method}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{payment.project_title}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <ColorfulAvatar name={payment.freelancer_name} email={payment.freelancer_email} size="sm" />
                            <div>
                              <div className="font-medium">{payment.freelancer_name}</div>
                              <div className="text-sm text-muted-foreground">{payment.freelancer_email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{payment.client_name}</div>
                            <div className="text-sm text-muted-foreground">{payment.client_email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{formatCurrency(payment.amount, payment.currency)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {formatCurrency(payment.commission_amount, payment.currency)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(payment.status)}
                            <ColorfulBadge variant="status" value={payment.status}>
                              {payment.status}
                            </ColorfulBadge>
                          </div>
                          {payment.failure_reason && (
                            <div className="text-xs text-red-600 mt-1">{payment.failure_reason}</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{formatDate(payment.created_at)}</div>
                          {payment.processed_at && (
                            <div className="text-xs text-muted-foreground">
                              Processed: {formatDate(payment.processed_at)}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0" disabled={actionLoading === payment.id}>
                                {actionLoading === payment.id ? (
                                  <RefreshCw className="h-4 w-4 animate-spin" />
                                ) : (
                                  <MoreHorizontal className="h-4 w-4" />
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedPayment(payment)
                                  setShowPaymentDialog(true)
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {payment.status === "pending" && (
                                <DropdownMenuItem onClick={() => handleProcessPayment(payment.id)}>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Process Payment
                                </DropdownMenuItem>
                              )}
                              {payment.status === "failed" && (
                                <DropdownMenuItem onClick={() => handleRetryPayment(payment.id)}>
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Retry Payment
                                </DropdownMenuItem>
                              )}
                              {payment.status === "completed" && (
                                <DropdownMenuItem onClick={() => handleRefundPayment(payment.id)}>
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Refund Payment
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Send className="mr-2 h-4 w-4" />
                                Send Receipt
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredPayments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No payments found matching your criteria.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution of payment methods used</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Credit/Debit Cards</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bank Transfer</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-10 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mobile Money</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Status</CardTitle>
                <CardDescription>Current status of all transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Completed</span>
                    </div>
                    <ColorfulBadge variant="status" value="completed">
                      {paymentStats.completedPayments}
                    </ColorfulBadge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Pending</span>
                    </div>
                    <ColorfulBadge variant="status" value="pending">
                      {paymentStats.pendingPayments}
                    </ColorfulBadge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Failed</span>
                    </div>
                    <ColorfulBadge variant="status" value="failed">
                      {paymentStats.failedPayments}
                    </ColorfulBadge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Insights</CardTitle>
              <CardDescription>Key financial metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-900">
                    {formatCurrency(paymentStats.averageTransactionValue)}
                  </div>
                  <p className="text-sm text-green-600">Average Transaction Value</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900">{formatCurrency(paymentStats.totalPayouts)}</div>
                  <p className="text-sm text-blue-600">Total Freelancer Payouts</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-900">
                    {((paymentStats.totalCommissions / paymentStats.totalRevenue) * 100).toFixed(1)}%
                  </div>
                  <p className="text-sm text-purple-600">Commission Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flutterwave Configuration</CardTitle>
              <CardDescription>Configure your Flutterwave payment gateway settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Current Configuration</h4>
                <div className="grid gap-4 md:grid-cols-2 text-sm">
                  <div>
                    <span className="font-medium">Environment:</span>
                    <ColorfulBadge variant="status" value="test" className="ml-2">
                      Test Mode
                    </ColorfulBadge>
                  </div>
                  <div>
                    <span className="font-medium">Public Key:</span>
                    <span className="ml-2 font-mono">FLWPUBK_TEST-8c5e41f0e8fab86eb65afcbe88045cdf-X</span>
                  </div>
                  <div>
                    <span className="font-medium">Webhook URL:</span>
                    <span className="ml-2">https://payvidi.com/api/webhooks/flutterwave</span>
                  </div>
                  <div>
                    <span className="font-medium">Supported Methods:</span>
                    <span className="ml-2">Card, Bank Transfer, Mobile Money, USSD</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Payment Settings</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Default Currency</Label>
                    <Select defaultValue="USD">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="NGN">NGN - Nigerian Naira</SelectItem>
                        <SelectItem value="GHS">GHS - Ghanaian Cedi</SelectItem>
                        <SelectItem value="KES">KES - Kenyan Shilling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Transaction Fee (%)</Label>
                    <Input type="number" defaultValue="2.5" step="0.1" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Webhook Configuration</h4>
                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <Input defaultValue="https://payvidi.com/api/webhooks/flutterwave" />
                  <p className="text-sm text-muted-foreground">
                    This URL will receive payment notifications from Flutterwave
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button>Save Settings</Button>
                <Button variant="outline">Test Connection</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Details Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Complete information about transaction {selectedPayment?.transaction_id}
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Transaction Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Transaction ID:</span>
                        <span className="font-mono">{selectedPayment.transaction_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Method:</span>
                        <span className="capitalize">{selectedPayment.payment_method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gateway:</span>
                        <span className="capitalize">{selectedPayment.payment_gateway}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <ColorfulBadge variant="status" value={selectedPayment.status}>
                          {selectedPayment.status}
                        </ColorfulBadge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Project Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Project:</span>
                        <span>{selectedPayment.project_title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Freelancer:</span>
                        <span>{selectedPayment.freelancer_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Client:</span>
                        <span>{selectedPayment.client_name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Financial Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Amount:</span>
                        <span className="font-medium">
                          {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Commission:</span>
                        <span className="text-blue-600">
                          {formatCurrency(selectedPayment.commission_amount, selectedPayment.currency)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Freelancer Amount:</span>
                        <span className="text-green-600">
                          {formatCurrency(selectedPayment.freelancer_amount, selectedPayment.currency)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Timeline</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Created:</span>
                        <span>{formatDate(selectedPayment.created_at)}</span>
                      </div>
                      {selectedPayment.processed_at && (
                        <div className="flex justify-between">
                          <span>Processed:</span>
                          <span>{formatDate(selectedPayment.processed_at)}</span>
                        </div>
                      )}
                      {selectedPayment.failure_reason && (
                        <div className="flex justify-between">
                          <span>Failure Reason:</span>
                          <span className="text-red-600">{selectedPayment.failure_reason}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                  Close
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
