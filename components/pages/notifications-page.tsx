"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  CheckCircle,
  DollarSign,
  MessageSquare,
  FileText,
  Trash2,
  BookMarkedIcon as MarkAsRead,
} from "lucide-react"

interface Notification {
  id: string
  type: "payment" | "message" | "project" | "system" | "approval"
  title: string
  description: string
  timestamp: string
  read: boolean
  action_url?: string
  metadata?: {
    amount?: number
    project_title?: string
    sender_name?: string
  }
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "payment",
      title: "Payment Received",
      description: "You received $3,237.50 for Brand Identity Package project",
      timestamp: "2024-01-22T10:30:00Z",
      read: false,
      metadata: {
        amount: 3237.5,
        project_title: "Brand Identity Package",
      },
    },
    {
      id: "2",
      type: "message",
      title: "New Message",
      description: "Tech Startup Inc sent you a message about Logo Design project",
      timestamp: "2024-01-22T09:15:00Z",
      read: false,
      metadata: {
        sender_name: "Tech Startup Inc",
        project_title: "Logo Design for Tech Startup",
      },
    },
    {
      id: "3",
      type: "project",
      title: "Project Status Update",
      description: "Website Redesign project status changed to 'In Review'",
      timestamp: "2024-01-21T16:45:00Z",
      read: true,
      metadata: {
        project_title: "Website Redesign",
      },
    },
    {
      id: "4",
      type: "approval",
      title: "Preview Approved",
      description: "Your logo design preview has been approved by the client",
      timestamp: "2024-01-21T14:20:00Z",
      read: true,
      metadata: {
        project_title: "Logo Design for Tech Startup",
      },
    },
    {
      id: "5",
      type: "system",
      title: "Account Upgrade Available",
      description: "You're eligible for SuperFreelancer status with reduced commission rates",
      timestamp: "2024-01-20T11:00:00Z",
      read: true,
    },
  ])

  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: true,
    push_notifications: true,
    project_updates: true,
    payment_notifications: true,
    message_notifications: true,
    marketing_emails: false,
  })

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <DollarSign className="h-5 w-5 text-green-600" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-600" />
      case "project":
        return <FileText className="h-5 w-5 text-purple-600" />
      case "approval":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "system":
        return <Bell className="h-5 w-5 text-orange-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)} days ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your projects and account activity</p>
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && <Badge variant="secondary">{unreadCount} unread</Badge>}
          <Button variant="outline" onClick={markAllAsRead}>
            <MarkAsRead className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground text-center">
                  You're all caught up! New notifications will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-colors ${!notification.read ? "border-blue-200 bg-blue-50/50" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`text-sm font-medium ${!notification.read ? "font-semibold" : ""}`}>
                              {notification.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>

                            {notification.metadata && (
                              <div className="flex items-center space-x-2 mt-2">
                                {notification.metadata.project_title && (
                                  <Badge variant="outline" className="text-xs">
                                    {notification.metadata.project_title}
                                  </Badge>
                                )}
                                {notification.metadata.amount && (
                                  <Badge variant="secondary" className="text-xs">
                                    ${notification.metadata.amount.toLocaleString()}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            <div className="flex space-x-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <CheckCircle className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <div className="space-y-2">
            {notifications
              .filter((n) => !n.read)
              .map((notification) => (
                <Card key={notification.id} className="border-blue-200 bg-blue-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold">{notification.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about different activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.email_notifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        email_notifications: checked,
                      }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                  </div>
                  <Switch
                    checked={notificationSettings.push_notifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        push_notifications: checked,
                      }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Project Updates</h4>
                    <p className="text-sm text-muted-foreground">Get notified about project status changes</p>
                  </div>
                  <Switch
                    checked={notificationSettings.project_updates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        project_updates: checked,
                      }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Payment Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified about payments and earnings</p>
                  </div>
                  <Switch
                    checked={notificationSettings.payment_notifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        payment_notifications: checked,
                      }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Message Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified about new messages from clients</p>
                  </div>
                  <Switch
                    checked={notificationSettings.message_notifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        message_notifications: checked,
                      }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Emails</h4>
                    <p className="text-sm text-muted-foreground">Receive updates about new features and tips</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketing_emails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        marketing_emails: checked,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
