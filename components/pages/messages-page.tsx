"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, Paperclip, MoreVertical, Archive, Star, MessageSquare } from "lucide-react"

interface Message {
  id: string
  sender_name: string
  sender_email: string
  sender_type: "freelancer" | "client" | "admin"
  subject: string
  content: string
  timestamp: string
  read: boolean
  project_id?: string
  project_title?: string
}

export function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock messages data
  const messages: Message[] = [
    {
      id: "1",
      sender_name: "Tech Startup Inc",
      sender_email: "client1@example.com",
      sender_type: "client",
      subject: "Logo Design Feedback",
      content:
        "Hi John, I've reviewed the logo concepts and I'm really impressed with the direction. Could we explore some variations with different color schemes? I'm particularly interested in seeing how it would look with our brand colors (blue and white). Also, could you provide the logo in different formats for various use cases?",
      timestamp: "2024-01-22T14:30:00Z",
      read: false,
      project_id: "p1",
      project_title: "Logo Design for Tech Startup",
    },
    {
      id: "2",
      sender_name: "Restaurant Chain",
      sender_email: "client2@example.com",
      sender_type: "client",
      subject: "Website Redesign Timeline",
      content:
        "Hello! I wanted to check in on the progress of our website redesign project. We're getting close to our launch date and want to make sure we're on track. Could you provide an updated timeline?",
      timestamp: "2024-01-21T16:45:00Z",
      read: true,
      project_id: "p2",
      project_title: "Website Redesign",
    },
    {
      id: "3",
      sender_name: "PayVidi Admin",
      sender_email: "admin@payvidi.com",
      sender_type: "admin",
      subject: "Account Verification Update",
      content:
        "Congratulations! Your account has been reviewed and you're now eligible for SuperFreelancer status. This comes with reduced commission rates and priority support. Would you like to upgrade your account?",
      timestamp: "2024-01-20T09:15:00Z",
      read: true,
    },
    {
      id: "4",
      sender_name: "Fashion Brand",
      sender_email: "client3@example.com",
      sender_type: "client",
      subject: "Brand Identity Package - Final Approval",
      content:
        "The brand identity package looks absolutely perfect! We're ready to approve and proceed with payment. Thank you for the excellent work and attention to detail.",
      timestamp: "2024-01-19T11:20:00Z",
      read: true,
      project_id: "p3",
      project_title: "Brand Identity Package",
    },
  ]

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendReply = () => {
    if (!replyContent.trim()) return

    // Here you would send the reply
    console.log("Sending reply:", replyContent)
    setReplyContent("")
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-lg border">
      {/* Messages List */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="h-full">
          <div className="p-2">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedMessage?.id === message.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                } ${!message.read ? "border-l-4 border-l-blue-500" : ""}`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {message.sender_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate ${!message.read ? "font-semibold" : ""}`}>
                        {message.sender_name}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {message.sender_type}
                      </Badge>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatTimestamp(message.timestamp)}</span>
                </div>

                <h4 className={`text-sm mb-1 ${!message.read ? "font-semibold" : ""}`}>{message.subject}</h4>

                <p className="text-xs text-muted-foreground line-clamp-2">{message.content}</p>

                {message.project_title && (
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {message.project_title}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Message Detail */}
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            {/* Message Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {selectedMessage.sender_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedMessage.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      From: {selectedMessage.sender_name} ({selectedMessage.sender_email})
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(selectedMessage.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {selectedMessage.project_title && (
                <div className="mt-3">
                  <Badge variant="secondary">Project: {selectedMessage.project_title}</Badge>
                </div>
              )}
            </div>

            {/* Message Content */}
            <ScrollArea className="flex-1 p-4">
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>
            </ScrollArea>

            {/* Reply Section */}
            <div className="p-4 border-t">
              <div className="space-y-3">
                <Textarea
                  placeholder="Type your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach File
                  </Button>
                  <Button onClick={handleSendReply} disabled={!replyContent.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a message to view its content</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
