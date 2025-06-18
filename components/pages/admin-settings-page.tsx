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
import { Slider } from "@/components/ui/slider"
import { ColorfulBadge } from "@/components/ui/colorful-badge"
import { useToast } from "@/hooks/use-toast"
import { DollarSign, Shield, Mail, Bell, FileText, Globe, Database, Key, Save, RefreshCw } from "lucide-react"

export function AdminSettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  // Platform Settings State
  const [platformSettings, setPlatformSettings] = useState({
    siteName: "PayVidi",
    siteDescription: "Professional freelancer platform for creative services",
    siteUrl: "https://payvidi.com",
    supportEmail: "support@payvidi.com",
    adminEmail: "admin@payvidi.com",
    timezone: "UTC",
    currency: "USD",
    language: "en",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
  })

  // Commission Settings State
  const [commissionSettings, setCommissionSettings] = useState({
    defaultCommissionRate: 10.0,
    superFreelancerRate: 7.5,
    minimumCommissionRate: 5.0,
    maximumCommissionRate: 25.0,
    processingFee: 2.5,
    withdrawalFee: 1.0,
  })

  // Payment Settings State
  const [paymentSettings, setPaymentSettings] = useState({
    flutterwaveEnabled: true,
    flutterwavePublicKey: "FLWPUBK_TEST-8c5e41f0e8fab86eb65afcbe88045cdf-X",
    flutterwaveSecretKey: "FLWSECK_TEST-9de31a88414f45d0f7f7d44e8d7c6c23-X",
    flutterwaveEncryptionKey: "FLWSECK_TEST4d056efeb439",
    paypalEnabled: false,
    stripeEnabled: false,
    minimumPayoutAmount: 50,
    payoutSchedule: "weekly",
    autoPayoutEnabled: true,
  })

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorRequired: false,
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    passwordRequireSpecialChars: true,
    passwordRequireNumbers: true,
    passwordRequireUppercase: true,
    ipWhitelistEnabled: false,
    ipWhitelist: "",
  })

  // Email Settings State
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "",
    smtpPassword: "",
    smtpEncryption: "tls",
    fromEmail: "noreply@payvidi.com",
    fromName: "PayVidi",
    emailVerificationEnabled: true,
    welcomeEmailEnabled: true,
    paymentNotificationsEnabled: true,
  })

  // File Settings State
  const [fileSettings, setFileSettings] = useState({
    maxFileSize: 500,
    allowedFileTypes: ["jpg", "png", "pdf", "mp4", "mp3", "wav", "psd", "ai", "sketch", "fig"],
    previewDurationLimit: 300,
    downloadLinkExpiry: 168,
    watermarkEnabled: true,
    compressionEnabled: true,
    virusScanEnabled: true,
  })

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    slackIntegration: false,
    discordIntegration: false,
    webhookUrl: "",
    notifyOnNewUser: true,
    notifyOnNewProject: true,
    notifyOnPayment: true,
    notifyOnDispute: true,
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

  const handleTestConnection = async (service: string) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "Connection Successful",
        description: `${service} connection test passed.`,
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${service}. Please check your settings.`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Platform Settings</h1>
          <p className="text-muted-foreground">Configure your PayVidi platform settings</p>
        </div>
        <ColorfulBadge variant="role" value="admin">
          Admin Access
        </ColorfulBadge>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="commission">Commission</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>General Settings</span>
              </CardTitle>
              <CardDescription>Basic platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Site Name</Label>
                  <Input
                    value={platformSettings.siteName}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Site URL</Label>
                  <Input
                    value={platformSettings.siteUrl}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, siteUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Site Description</Label>
                <Textarea
                  value={platformSettings.siteDescription}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, siteDescription: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input
                    type="email"
                    value={platformSettings.supportEmail}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, supportEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Admin Email</Label>
                  <Input
                    type="email"
                    value={platformSettings.adminEmail}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, adminEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select
                    value={platformSettings.timezone}
                    onValueChange={(value) => setPlatformSettings({ ...platformSettings, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select
                    value={platformSettings.currency}
                    onValueChange={(value) => setPlatformSettings({ ...platformSettings, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="NGN">NGN - Nigerian Naira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={platformSettings.language}
                    onValueChange={(value) => setPlatformSettings({ ...platformSettings, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Maintenance Mode</h4>
                    <p className="text-sm text-muted-foreground">Temporarily disable the platform for maintenance</p>
                  </div>
                  <Switch
                    checked={platformSettings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      setPlatformSettings({ ...platformSettings, maintenanceMode: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">User Registration</h4>
                    <p className="text-sm text-muted-foreground">Allow new users to register</p>
                  </div>
                  <Switch
                    checked={platformSettings.registrationEnabled}
                    onCheckedChange={(checked) =>
                      setPlatformSettings({ ...platformSettings, registrationEnabled: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Verification Required</h4>
                    <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                  </div>
                  <Switch
                    checked={platformSettings.emailVerificationRequired}
                    onCheckedChange={(checked) =>
                      setPlatformSettings({ ...platformSettings, emailVerificationRequired: checked })
                    }
                  />
                </div>
              </div>

              <Button onClick={() => handleSaveSettings("General")} disabled={loading}>
                {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Payment Gateway Settings</span>
              </CardTitle>
              <CardDescription>Configure payment processing and gateways</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Flutterwave Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Flutterwave Integration</h4>
                    <p className="text-sm text-muted-foreground">Primary payment gateway for the platform</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={paymentSettings.flutterwaveEnabled}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({ ...paymentSettings, flutterwaveEnabled: checked })
                      }
                    />
                    <ColorfulBadge variant="status" value={paymentSettings.flutterwaveEnabled ? "active" : "inactive"}>
                      {paymentSettings.flutterwaveEnabled ? "Active" : "Inactive"}
                    </ColorfulBadge>
                  </div>
                </div>

                {paymentSettings.flutterwaveEnabled && (
                  <div className="grid gap-4 md:grid-cols-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="space-y-2">
                      <Label>Public Key</Label>
                      <Input
                        value={paymentSettings.flutterwavePublicKey}
                        onChange={(e) =>
                          setPaymentSettings({ ...paymentSettings, flutterwavePublicKey: e.target.value })
                        }
                        placeholder="FLWPUBK_TEST-..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Secret Key</Label>
                      <Input
                        type="password"
                        value={paymentSettings.flutterwaveSecretKey}
                        onChange={(e) =>
                          setPaymentSettings({ ...paymentSettings, flutterwaveSecretKey: e.target.value })
                        }
                        placeholder="FLWSECK_TEST-..."
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Encryption Key</Label>
                      <Input
                        type="password"
                        value={paymentSettings.flutterwaveEncryptionKey}
                        onChange={(e) =>
                          setPaymentSettings({ ...paymentSettings, flutterwaveEncryptionKey: e.target.value })
                        }
                        placeholder="FLWSECK_TEST..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Button variant="outline" onClick={() => handleTestConnection("Flutterwave")} disabled={loading}>
                        {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                        Test Connection
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Payment Gateways */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">PayPal Integration</h4>
                    <p className="text-sm text-muted-foreground">Alternative payment method</p>
                  </div>
                  <Switch
                    checked={paymentSettings.paypalEnabled}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, paypalEnabled: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Stripe Integration</h4>
                    <p className="text-sm text-muted-foreground">Credit card processing</p>
                  </div>
                  <Switch
                    checked={paymentSettings.stripeEnabled}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, stripeEnabled: checked })}
                  />
                </div>
              </div>

              {/* Payout Settings */}
              <div className="space-y-4">
                <h4 className="font-medium">Payout Settings</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Minimum Payout Amount ($)</Label>
                    <Input
                      type="number"
                      value={paymentSettings.minimumPayoutAmount}
                      onChange={(e) =>
                        setPaymentSettings({ ...paymentSettings, minimumPayoutAmount: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Payout Schedule</Label>
                    <Select
                      value={paymentSettings.payoutSchedule}
                      onValueChange={(value) => setPaymentSettings({ ...paymentSettings, payoutSchedule: value })}
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
                    <p className="text-sm text-muted-foreground">Automatically process payouts based on schedule</p>
                  </div>
                  <Switch
                    checked={paymentSettings.autoPayoutEnabled}
                    onCheckedChange={(checked) =>
                      setPaymentSettings({ ...paymentSettings, autoPayoutEnabled: checked })
                    }
                  />
                </div>
              </div>

              <Button onClick={() => handleSaveSettings("Payment")} disabled={loading}>
                {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Payment Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Commission & Fees</span>
              </CardTitle>
              <CardDescription>Configure platform commission rates and fees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Commission Rate (%)</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[commissionSettings.defaultCommissionRate]}
                        onValueChange={(value) =>
                          setCommissionSettings({ ...commissionSettings, defaultCommissionRate: value[0] })
                        }
                        max={25}
                        min={5}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>5%</span>
                        <span className="font-medium">{commissionSettings.defaultCommissionRate}%</span>
                        <span>25%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>SuperFreelancer Rate (%)</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[commissionSettings.superFreelancerRate]}
                        onValueChange={(value) =>
                          setCommissionSettings({ ...commissionSettings, superFreelancerRate: value[0] })
                        }
                        max={20}
                        min={3}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>3%</span>
                        <span className="font-medium">{commissionSettings.superFreelancerRate}%</span>
                        <span>20%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Processing Fee (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={commissionSettings.processingFee}
                      onChange={(e) =>
                        setCommissionSettings({ ...commissionSettings, processingFee: Number(e.target.value) })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Withdrawal Fee (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={commissionSettings.withdrawalFee}
                      onChange={(e) =>
                        setCommissionSettings({ ...commissionSettings, withdrawalFee: Number(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Commission Preview</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Project Value:</span>
                    <span>$1,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Default Freelancer Commission:</span>
                    <span>${((1000 * commissionSettings.defaultCommissionRate) / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SuperFreelancer Commission:</span>
                    <span>${((1000 * commissionSettings.superFreelancerRate) / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee:</span>
                    <span>${((1000 * commissionSettings.processingFee) / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSaveSettings("Commission")} disabled={loading}>
                {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Commission Settings
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
              <CardDescription>Configure platform security and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication Required</h4>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorRequired}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, twoFactorRequired: checked })
                    }
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Session Timeout (hours)</Label>
                    <Input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) =>
                        setSecuritySettings({ ...securitySettings, sessionTimeout: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Login Attempts</Label>
                    <Input
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) =>
                        setSecuritySettings({ ...securitySettings, maxLoginAttempts: Number(e.target.value) })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Password Requirements</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Minimum Length</Label>
                      <Input
                        type="number"
                        value={securitySettings.passwordMinLength}
                        onChange={(e) =>
                          setSecuritySettings({ ...securitySettings, passwordMinLength: Number(e.target.value) })
                        }
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Require Special Characters</span>
                        <Switch
                          checked={securitySettings.passwordRequireSpecialChars}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({ ...securitySettings, passwordRequireSpecialChars: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Require Numbers</span>
                        <Switch
                          checked={securitySettings.passwordRequireNumbers}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({ ...securitySettings, passwordRequireNumbers: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Require Uppercase</span>
                        <Switch
                          checked={securitySettings.passwordRequireUppercase}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({ ...securitySettings, passwordRequireUppercase: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">IP Whitelist</h4>
                      <p className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses</p>
                    </div>
                    <Switch
                      checked={securitySettings.ipWhitelistEnabled}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, ipWhitelistEnabled: checked })
                      }
                    />
                  </div>

                  {securitySettings.ipWhitelistEnabled && (
                    <div className="space-y-2">
                      <Label>Allowed IP Addresses (one per line)</Label>
                      <Textarea
                        value={securitySettings.ipWhitelist}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
                        placeholder="192.168.1.1&#10;10.0.0.1&#10;203.0.113.0/24"
                        rows={4}
                      />
                    </div>
                  )}
                </div>
              </div>

              <Button onClick={() => handleSaveSettings("Security")} disabled={loading}>
                {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Email Settings</span>
              </CardTitle>
              <CardDescription>Configure SMTP and email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>SMTP Host</Label>
                  <Input
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Port</Label>
                  <Input
                    type="number"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Username</Label>
                  <Input
                    value={emailSettings.smtpUsername}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Password</Label>
                  <Input
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Encryption</Label>
                  <Select
                    value={emailSettings.smtpEncryption}
                    onValueChange={(value) => setEmailSettings({ ...emailSettings, smtpEncryption: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="tls">TLS</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>From Email</Label>
                  <Input
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Verification</span>
                    <Switch
                      checked={emailSettings.emailVerificationEnabled}
                      onCheckedChange={(checked) =>
                        setEmailSettings({ ...emailSettings, emailVerificationEnabled: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Welcome Emails</span>
                    <Switch
                      checked={emailSettings.welcomeEmailEnabled}
                      onCheckedChange={(checked) =>
                        setEmailSettings({ ...emailSettings, welcomeEmailEnabled: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Notifications</span>
                    <Switch
                      checked={emailSettings.paymentNotificationsEnabled}
                      onCheckedChange={(checked) =>
                        setEmailSettings({ ...emailSettings, paymentNotificationsEnabled: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={() => handleSaveSettings("Email")} disabled={loading}>
                  {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                  <Save className="mr-2 h-4 w-4" />
                  Save Email Settings
                </Button>
                <Button variant="outline" onClick={() => handleTestConnection("SMTP")} disabled={loading}>
                  {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                  Test SMTP
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>File & Upload Settings</span>
              </CardTitle>
              <CardDescription>Configure file upload and processing settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Maximum File Size (MB)</Label>
                  <Input
                    type="number"
                    value={fileSettings.maxFileSize}
                    onChange={(e) => setFileSettings({ ...fileSettings, maxFileSize: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Preview Duration Limit (seconds)</Label>
                  <Input
                    type="number"
                    value={fileSettings.previewDurationLimit}
                    onChange={(e) => setFileSettings({ ...fileSettings, previewDurationLimit: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Download Link Expiry (hours)</Label>
                  <Input
                    type="number"
                    value={fileSettings.downloadLinkExpiry}
                    onChange={(e) => setFileSettings({ ...fileSettings, downloadLinkExpiry: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Allowed File Types</Label>
                <div className="grid grid-cols-4 gap-2">
                  {["jpg", "png", "pdf", "mp4", "mp3", "wav", "psd", "ai", "sketch", "fig", "zip", "rar"].map(
                    (type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={type}
                          checked={fileSettings.allowedFileTypes.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFileSettings({
                                ...fileSettings,
                                allowedFileTypes: [...fileSettings.allowedFileTypes, type],
                              })
                            } else {
                              setFileSettings({
                                ...fileSettings,
                                allowedFileTypes: fileSettings.allowedFileTypes.filter((t) => t !== type),
                              })
                            }
                          }}
                          className="rounded"
                        />
                        <label htmlFor={type} className="text-sm">
                          {type.toUpperCase()}
                        </label>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">File Processing</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">Watermark Enabled</span>
                      <p className="text-xs text-muted-foreground">Add watermarks to preview files</p>
                    </div>
                    <Switch
                      checked={fileSettings.watermarkEnabled}
                      onCheckedChange={(checked) => setFileSettings({ ...fileSettings, watermarkEnabled: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">Compression Enabled</span>
                      <p className="text-xs text-muted-foreground">Compress files to save storage</p>
                    </div>
                    <Switch
                      checked={fileSettings.compressionEnabled}
                      onCheckedChange={(checked) => setFileSettings({ ...fileSettings, compressionEnabled: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">Virus Scanning</span>
                      <p className="text-xs text-muted-foreground">Scan uploaded files for malware</p>
                    </div>
                    <Switch
                      checked={fileSettings.virusScanEnabled}
                      onCheckedChange={(checked) => setFileSettings({ ...fileSettings, virusScanEnabled: checked })}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSaveSettings("File")} disabled={loading}>
                {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save File Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>Configure platform notifications and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Notification Channels</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Notifications</span>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push Notifications</span>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS Notifications</span>
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
                <h4 className="font-medium">Event Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New User Registration</span>
                    <Switch
                      checked={notificationSettings.notifyOnNewUser}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, notifyOnNewUser: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New Project Created</span>
                    <Switch
                      checked={notificationSettings.notifyOnNewProject}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, notifyOnNewProject: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Received</span>
                    <Switch
                      checked={notificationSettings.notifyOnPayment}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, notifyOnPayment: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dispute Created</span>
                    <Switch
                      checked={notificationSettings.notifyOnDispute}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, notifyOnDispute: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Integrations</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Slack Integration</span>
                    <Switch
                      checked={notificationSettings.slackIntegration}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, slackIntegration: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Discord Integration</span>
                    <Switch
                      checked={notificationSettings.discordIntegration}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, discordIntegration: checked })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <Input
                    value={notificationSettings.webhookUrl}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, webhookUrl: e.target.value })}
                    placeholder="https://hooks.slack.com/services/..."
                  />
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

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Advanced Settings</span>
              </CardTitle>
              <CardDescription>Advanced platform configuration and maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Database Maintenance</h4>
                  <p className="text-sm text-muted-foreground mb-4">Optimize database performance</p>
                  <Button variant="outline" className="w-full">
                    <Database className="mr-2 h-4 w-4" />
                    Optimize Database
                  </Button>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Cache Management</h4>
                  <p className="text-sm text-muted-foreground mb-4">Clear application cache</p>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Clear Cache
                  </Button>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">System Backup</h4>
                  <p className="text-sm text-muted-foreground mb-4">Create system backup</p>
                  <Button variant="outline" className="w-full">
                    <Database className="mr-2 h-4 w-4" />
                    Create Backup
                  </Button>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">API Keys</h4>
                  <p className="text-sm text-muted-foreground mb-4">Manage API access</p>
                  <Button variant="outline" className="w-full">
                    <Key className="mr-2 h-4 w-4" />
                    Manage Keys
                  </Button>
                </Card>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">Danger Zone</h4>
                <p className="text-sm text-red-600 mb-4">
                  These actions are irreversible. Please proceed with caution.
                </p>
                <div className="space-y-2">
                  <Button variant="destructive" size="sm">
                    Reset All Settings
                  </Button>
                  <Button variant="destructive" size="sm">
                    Clear All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
