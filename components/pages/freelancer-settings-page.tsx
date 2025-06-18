"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ColorfulBadge } from "@/components/ui/colorful-badge"
import { ColorfulAvatar } from "@/components/ui/colorful-avatar"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth/simple-auth"
import {
  User,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  RefreshCw,
  Upload,
  Eye,
  EyeOff,
  Copy,
  Check,
} from "lucide-react"

export function FreelancerSettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [copied, setCopied] = useState(false)

  // Profile Settings State
  const [profileSettings, setProfileSettings] = useState({
    fullName: user?.full_name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    bio: "Passionate designer with 5+ years of experience creating stunning visual identities.",
    location: "San Francisco, CA",
    website: "https://johndesign.com",
    timezone: "PST",
    language: "en",
    skills: ["Logo Design", "Brand Identity", "Web Design", "Print Design"],
    experience: "5+ years",
    hourlyRate: 75,
    availability: "Available for new projects",
    portfolioUrl: "https://portfolio.johndesign.com",
  })

  // Business Settings State
  const [businessSettings, setBusinessSettings] = useState({
    businessName: "John Design Studio",
    subdomain: "johndesign",
    customDomain: "",
    businessType: "individual",
    taxId: "",
    businessAddress: "",
    businessPhone: "",
    businessEmail: "",
    invoicePrefix: "JDS",
    invoiceNumber: 1001,
    paymentTerms: "Net 30",
  })

  // Payout Settings State
  const [payoutSettings, setPayoutSettings] = useState({
    payoutMethod: "bank_transfer",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountHolderName: "",
    swiftCode: "",
    paypalEmail: "",
    minimumPayout: 100,
    autoPayoutEnabled: true,
    payoutSchedule: "weekly",
  })

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    projectUpdates: true,
    paymentNotifications: true,
    messageNotifications: true,
    marketingEmails: false,
    weeklyReports: true,
    clientReviews: true,
    systemUpdates: true,
  })

  // Privacy Settings State
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    showLocation: true,
    showRates: false,
    allowDirectContact: true,
    showOnlineStatus: true,
    dataRetention: "2_years",
    analyticsOptOut: false,
  })

  // Branding Settings State
  const [brandingSettings, setBrandingSettings] = useState({
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    logoUrl: "",
    bannerUrl: "",
    customCss: "",
    fontFamily: "Inter",
    brandingEnabled: true,
    customFooter: "",
    socialLinks: {
      twitter: "",
      linkedin: "",
      instagram: "",
      behance: "",
      dribbble: "",
    },
  })

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: 24,
    apiKeyEnabled: false,
    apiKey: "pk_live_51234567890abcdef",
    allowedIPs: "",
    passwordLastChanged: "2024-01-15",
  })

  const handleSaveSettings = async (section: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings Saved",
        description: `${section} settings have been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(securitySettings.apiKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied",
        description: "API key copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy API key",
        variant: "destructive",
      })
    }
  }

  const generateNewApiKey = () => {
    const newKey = `pk_live_${Math.random().toString(36).substr(2, 24)}`
    setSecuritySettings({ ...securitySettings, apiKey: newKey })
    toast({
      title: "New API Key Generated",
      description: "Your API key has been regenerated. Make sure to update your integrations.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">Manage your profile and account preferences</p>
        </div>
        <ColorfulBadge variant="role" value={user?.role}>
          {user?.role}
        </ColorfulBadge>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>Update your personal and professional information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <ColorfulAvatar name={profileSettings.fullName} email={profileSettings.email} size="xl" showBorder />
                <div className="space-y-2">
                  <h3 className="font-semibold">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">
                    Your avatar is automatically generated based on your name and email
                  </p>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Custom Avatar
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={profileSettings.fullName}
                    onChange={(e) => setProfileSettings({ ...profileSettings, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    value={profileSettings.phone}
                    onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={profileSettings.location}
                    onChange={(e) => setProfileSettings({ ...profileSettings, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input
                    value={profileSettings.website}
                    onChange={(e) => setProfileSettings({ ...profileSettings, website: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Portfolio URL</Label>
                  <Input
                    value={profileSettings.portfolioUrl}
                    onChange={(e) => setProfileSettings({ ...profileSettings, portfolioUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={profileSettings.bio}
                  onChange={(e) => setProfileSettings({ ...profileSettings, bio: e.target.value })}
                  rows={4}
                  placeholder="Tell clients about yourself and your expertise..."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select
                    value={profileSettings.experience}
                    onValueChange={(value) => setProfileSettings({ ...profileSettings, experience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2 years">1-2 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="5+ years">5+ years</SelectItem>
                      <SelectItem value="10+ years">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Hourly Rate ($)</Label>
                  <Input
                    type="number"
                    value={profileSettings.hourlyRate}
                    onChange={(e) => setProfileSettings({ ...profileSettings, hourlyRate: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Availability Status</Label>
                  <Select
                    value={profileSettings.availability}
                    onValueChange={(value) => setProfileSettings({ ...profileSettings, availability: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available for new projects">Available for new projects</SelectItem>
                      <SelectItem value="Busy - limited availability">Busy - limited availability</SelectItem>
                      <SelectItem value="Not available">Not available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileSettings.skills.map((skill, index) => (
                    <ColorfulBadge key={index} variant="category">
                      {skill}
                    </ColorfulBadge>
                  ))}
                </div>
                <Input placeholder="Add a new skill and press Enter" />
              </div>

              <Button onClick={() => handleSaveSettings("Profile")} disabled={loading}>
                {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Profile Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Business Information</span>
              </CardTitle>
              <CardDescription>Configure your business details and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input
                    value={businessSettings.businessName}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, businessName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Business Type</Label>
                  <Select
                    value={businessSettings.businessType}
                    onValueChange={(value) => setBusinessSettings({ ...businessSettings, businessType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Subdomain Settings</h4>
                <div className="space-y-2">
                  <Label>PayVidi Subdomain</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={businessSettings.subdomain}
                      onChange={(e) => setBusinessSettings({ ...businessSettings, subdomain: e.target.value })}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">.payvidi.com</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your public profile will be available at {businessSettings.subdomain}.payvidi.com
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Custom Domain (Optional)</Label>
                  <Input
                    value={businessSettings.customDomain}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, customDomain: e.target.value })}
                    placeholder="www.yourwebsite.com"
                  />
                  <p className="text-sm text-muted-foreground">
                    Use your own domain for your PayVidi profile (requires DNS configuration)
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tax ID / EIN</Label>
                  <Input
                    value={businessSettings.taxId}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, taxId: e.target.value })}
                    placeholder="12-3456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Business Phone</Label>
                  <Input
                    value={businessSettings.businessPhone}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, businessPhone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Business Address</Label>
                <Textarea
                  value={businessSettings.businessAddress}
                  onChange={(e) => setBusinessSettings({ ...businessSettings, businessAddress: e.target.value })}
                  rows={3}
                  placeholder="Enter your business address..."
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Invoice Settings</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Invoice Prefix</Label>
                    <Input
                      value={businessSettings.invoicePrefix}
                      onChange={(e) => setBusinessSettings({ ...businessSettings, invoicePrefix: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Next Invoice Number</Label>
                    <Input
                      type="number"
                      value={businessSettings.invoiceNumber}
                      onChange={(e) =>
                        setBusinessSettings({ ...businessSettings, invoiceNumber: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Terms</Label>
                    <Select
                      value={businessSettings.paymentTerms}
                      onValueChange={(value) => setBusinessSettings({ ...businessSettings, paymentTerms: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Due on receipt">Due on receipt</SelectItem>
                        <SelectItem value="Net 15">Net 15</SelectItem>
                        <SelectItem value="Net 30">Net 30</SelectItem>
                        <SelectItem value="Net 60">Net 60</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSaveSettings("Business")} disabled={loading}>
                {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Business Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Payout Settings</span>
              </CardTitle>
              <CardDescription>Configure how you receive payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Payout Method</Label>
                  <Select
                    value={payoutSettings.payoutMethod}
                    onValueChange={(value) => setPayoutSettings({ ...payoutSettings, payoutMethod: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="wise">Wise (formerly TransferWise)</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {payoutSettings.payoutMethod === "bank_transfer" && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium">Bank Account Details</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Bank Name</Label>
                        <Input
                          value={payoutSettings.bankName}
                          onChange={(e) => setPayoutSettings({ ...payoutSettings, bankName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Account Holder Name</Label>
                        <Input
                          value={payoutSettings.accountHolderName}
                          onChange={(e) => setPayoutSettings({ ...payoutSettings, accountHolderName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Account Number</Label>
                        <Input
                          value={payoutSettings.accountNumber}
                          onChange={(e) => setPayoutSettings({ ...payoutSettings, accountNumber: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Routing Number</Label>
                        <Input
                          value={payoutSettings.routingNumber}
                          onChange={(e) => setPayoutSettings({ ...payoutSettings, routingNumber: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>SWIFT Code (for international transfers)</Label>
                        <Input
                          value={payoutSettings.swiftCode}
                          onChange={(e) => setPayoutSettings({ ...payoutSettings, swiftCode: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {payoutSettings.payoutMethod === "paypal" && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium">PayPal Details</h4>
                    <div className="space-y-2">
                      <Label>PayPal Email</Label>
                      <Input
                        type="email"
                        value={payoutSettings.paypalEmail}
                        onChange={(e) => setPayoutSettings({ ...payoutSettings, paypalEmail: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Minimum Payout Amount ($)</Label>
                  <Input
                    type="number"
                    value={payoutSettings.minimumPayout}
                    onChange={(e) => setPayoutSettings({ ...payoutSettings, minimumPayout: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Payout Schedule</Label>
                  <Select
                    value={payoutSettings.payoutSchedule}
                    onValueChange={(value) => setPayoutSettings({ ...payoutSettings, payoutSchedule: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Automatic Payouts</h4>
                  <p className="text-sm text-muted-foreground">Automatically process payouts based on your schedule</p>
                </div>
                <Switch
                  checked={payoutSettings.autoPayoutEnabled}
                  onCheckedChange={(checked) => setPayoutSettings({ ...payoutSettings, autoPayoutEnabled: checked })}
                />
              </div>

              <Button onClick={() => handleSaveSettings("Payout")} disabled={loading}>
                {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Payout Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Notification Channels</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Email Notifications</span>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Push Notifications</span>
                      <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">SMS Notifications</span>
                      <p className="text-sm text-muted-foreground">Receive important updates via SMS</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Project Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Project Updates</span>
                    <Switch
                      checked={notificationSettings.projectUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, projectUpdates: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Notifications</span>
                    <Switch
                      checked={notificationSettings.paymentNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, paymentNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Message Notifications</span>
                    <Switch
                      checked={notificationSettings.messageNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, messageNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Client Reviews</span>
                    <Switch
                      checked={notificationSettings.clientReviews}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, clientReviews: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Marketing & Reports</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Marketing Emails</span>
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, marketingEmails: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Weekly Reports</span>
                    <Switch
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Updates</span>
                    <Switch
                      checked={notificationSettings.systemUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, systemUpdates: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSaveSettings("Notification")} disabled={loading}>
                {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Privacy Settings</span>
              </CardTitle>
              <CardDescription>Control your privacy and data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select
                    value={privacySettings.profileVisibility}
                    onValueChange={(value) => setPrivacySettings({ ...privacySettings, profileVisibility: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Visible to everyone</SelectItem>
                      <SelectItem value="clients_only">Clients Only - Visible to your clients</SelectItem>
                      <SelectItem value="private">Private - Not visible in search</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Contact Information</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Show Email Address</span>
                      <Switch
                        checked={privacySettings.showEmail}
                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showEmail: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Show Phone Number</span>
                      <Switch
                        checked={privacySettings.showPhone}
                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showPhone: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Show Location</span>
                      <Switch
                        checked={privacySettings.showLocation}
                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showLocation: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Show Hourly Rates</span>
                      <Switch
                        checked={privacySettings.showRates}
                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showRates: checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Communication Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Allow Direct Contact</span>
                        <p className="text-xs text-muted-foreground">Let clients contact you directly</p>
                      </div>
                      <Switch
                        checked={privacySettings.allowDirectContact}
                        onCheckedChange={(checked) =>
                          setPrivacySettings({ ...privacySettings, allowDirectContact: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Show Online Status</span>
                        <p className="text-xs text-muted-foreground">Display when you're online</p>
                      </div>
                      <Switch
                        checked={privacySettings.showOnlineStatus}
                        onCheckedChange={(checked) =>
                          setPrivacySettings({ ...privacySettings, showOnlineStatus: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Data & Analytics</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Data Retention Period</Label>
                      <Select
                        value={privacySettings.dataRetention}
                        onValueChange={(value) => setPrivacySettings({ ...privacySettings, dataRetention: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1_year">1 Year</SelectItem>
                          <SelectItem value="2_years">2 Years</SelectItem>
                          <SelectItem value="5_years">5 Years</SelectItem>
                          <SelectItem value="indefinite">Indefinite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Opt out of Analytics</span>
                        <p className="text-xs text-muted-foreground">Don't track my usage for analytics</p>
                      </div>
                      <Switch
                        checked={privacySettings.analyticsOptOut}
                        onCheckedChange={(checked) =>
                          setPrivacySettings({ ...privacySettings, analyticsOptOut: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSaveSettings("Privacy")} disabled={loading}>
                {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Branding & Customization</span>
              </CardTitle>
              <CardDescription>Customize your profile appearance and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Custom Branding</h4>
                  <p className="text-sm text-muted-foreground">Enable custom branding for your profile</p>
                </div>
                <Switch
                  checked={brandingSettings.brandingEnabled}
                  onCheckedChange={(checked) => setBrandingSettings({ ...brandingSettings, brandingEnabled: checked })}
                />
              </div>

              {brandingSettings.brandingEnabled && (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="color"
                          value={brandingSettings.primaryColor}
                          onChange={(e) => setBrandingSettings({ ...brandingSettings, primaryColor: e.target.value })}
                          className="w-16 h-10"
                        />
                        <Input
                          value={brandingSettings.primaryColor}
                          onChange={(e) => setBrandingSettings({ ...brandingSettings, primaryColor: e.target.value })}
                          placeholder="#3B82F6"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Color</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="color"
                          value={brandingSettings.secondaryColor}
                          onChange={(e) => setBrandingSettings({ ...brandingSettings, secondaryColor: e.target.value })}
                          className="w-16 h-10"
                        />
                        <Input
                          value={brandingSettings.secondaryColor}
                          onChange={(e) => setBrandingSettings({ ...brandingSettings, secondaryColor: e.target.value })}
                          placeholder="#10B981"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Font Family</Label>
                    <Select
                      value={brandingSettings.fontFamily}
                      onValueChange={(value) => setBrandingSettings({ ...brandingSettings, fontFamily: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                        <SelectItem value="Lato">Lato</SelectItem>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Logo URL</Label>
                      <Input
                        value={brandingSettings.logoUrl}
                        onChange={(e) => setBrandingSettings({ ...brandingSettings, logoUrl: e.target.value })}
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Banner URL</Label>
                      <Input
                        value={brandingSettings.bannerUrl}
                        onChange={(e) => setBrandingSettings({ ...brandingSettings, bannerUrl: e.target.value })}
                        placeholder="https://example.com/banner.jpg"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Social Links</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Twitter</Label>
                        <Input
                          value={brandingSettings.socialLinks.twitter}
                          onChange={(e) =>
                            setBrandingSettings({
                              ...brandingSettings,
                              socialLinks: { ...brandingSettings.socialLinks, twitter: e.target.value },
                            })
                          }
                          placeholder="https://twitter.com/username"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>LinkedIn</Label>
                        <Input
                          value={brandingSettings.socialLinks.linkedin}
                          onChange={(e) =>
                            setBrandingSettings({
                              ...brandingSettings,
                              socialLinks: { ...brandingSettings.socialLinks, linkedin: e.target.value },
                            })
                          }
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Behance</Label>
                        <Input
                          value={brandingSettings.socialLinks.behance}
                          onChange={(e) =>
                            setBrandingSettings({
                              ...brandingSettings,
                              socialLinks: { ...brandingSettings.socialLinks, behance: e.target.value },
                            })
                          }
                          placeholder="https://behance.net/username"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Dribbble</Label>
                        <Input
                          value={brandingSettings.socialLinks.dribbble}
                          onChange={(e) =>
                            setBrandingSettings({
                              ...brandingSettings,
                              socialLinks: { ...brandingSettings.socialLinks, dribbble: e.target.value },
                            })
                          }
                          placeholder="https://dribbble.com/username"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Custom CSS</Label>
                    <Textarea
                      value={brandingSettings.customCss}
                      onChange={(e) => setBrandingSettings({ ...brandingSettings, customCss: e.target.value })}
                      rows={6}
                      placeholder="/* Add your custom CSS here */"
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
              )}

              <Button onClick={() => handleSaveSettings("Branding")} disabled={loading}>
                {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Branding Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>Manage your account security and access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={securitySettings.twoFactorEnabled}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, twoFactorEnabled: checked })
                      }
                    />
                    <ColorfulBadge variant="status" value={securitySettings.twoFactorEnabled ? "enabled" : "disabled"}>
                      {securitySettings.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </ColorfulBadge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Login Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified when someone logs into your account</p>
                  </div>
                  <Switch
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, loginNotifications: checked })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Session Timeout (hours)</Label>
                  <Input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, sessionTimeout: Number(e.target.value) })
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    You'll be automatically logged out after this period of inactivity
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">API Access</h4>
                    <p className="text-sm text-muted-foreground">Enable API access for integrations</p>
                  </div>
                  <Switch
                    checked={securitySettings.apiKeyEnabled}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, apiKeyEnabled: checked })}
                  />
                </div>

                {securitySettings.apiKeyEnabled && (
                  <div className="space-y-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="space-y-2">
                      <Label>API Key</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type={showApiKey ? "text" : "password"}
                          value={securitySettings.apiKey}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCopyApiKey}>
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={generateNewApiKey}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Generate New Key
                      </Button>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Keep your API key secure. Don't share it publicly or include it in client-side code.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Password Security</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Password last changed:</span>
                    <span className="text-sm font-medium">{securitySettings.passwordLastChanged}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Allowed IP Addresses (Optional)</Label>
                <Textarea
                  value={securitySettings.allowedIPs}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, allowedIPs: e.target.value })}
                  placeholder="192.168.1.1&#10;10.0.0.1&#10;Leave empty to allow all IPs"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  Restrict account access to specific IP addresses (one per line)
                </p>
              </div>

              <Button onClick={() => handleSaveSettings("Security")} disabled={loading}>
                {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
