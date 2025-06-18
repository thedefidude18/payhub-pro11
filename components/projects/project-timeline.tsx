"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Upload,
  Download,
  Eye,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  FileText,
  ImageIcon,
  Video,
  Music,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TimelineEvent {
  id: string
  type: "comment" | "status_change" | "file_upload" | "approval" | "rejection"
  user_name: string
  user_email: string
  user_type: "freelancer" | "client" | "admin"
  content: string
  timestamp: string
  metadata?: {
    file_name?: string
    file_type?: string
    file_url?: string
    old_status?: string
    new_status?: string
    reason?: string
  }
}

interface ProjectTimelineProps {
  projectId: string
  projectTitle: string
  clientEmail: string
  freelancerName: string
  currentStatus: string
}

export function ProjectTimeline({
  projectId,
  projectTitle,
  clientEmail,
  freelancerName,
  currentStatus,
}: ProjectTimelineProps) {
  const { toast } = useToast()
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [approvalAction, setApprovalAction] = useState<"approve" | "decline" | null>(null)
  const [approvalReason, setApprovalReason] = useState("")

  // Mock timeline data
  const [timeline, setTimeline] = useState<TimelineEvent[]>([
    {
      id: "1",
      type: "status_change",
      user_name: freelancerName,
      user_email: "john@designer.com",
      user_type: "freelancer",
      content: "Project created and initial files uploaded",
      timestamp: "2024-01-20T10:00:00Z",
      metadata: {
        old_status: "draft",
        new_status: "preview_sent",
      },
    },
    {
      id: "2",
      type: "file_upload",
      user_name: freelancerName,
      user_email: "john@designer.com",
      user_type: "freelancer",
      content: "Uploaded initial logo concepts",
      timestamp: "2024-01-20T10:30:00Z",
      metadata: {
        file_name: "logo_concepts_v1.pdf",
        file_type: "pdf",
        file_url: "/files/logo_concepts_v1.pdf",
      },
    },
    {
      id: "3",
      type: "comment",
      user_name: "Tech Startup Inc",
      user_email: clientEmail,
      user_type: "client",
      content:
        "Love the direction! Could we try a more modern approach with the typography? Also, can we explore some blue color variations?",
      timestamp: "2024-01-21T14:15:00Z",
    },
    {
      id: "4",
      type: "comment",
      user_name: freelancerName,
      user_email: "john@designer.com",
      user_type: "freelancer",
      content:
        "I'll work on some modern typography options and blue color schemes. Should have the revised concepts ready by tomorrow.",
      timestamp: "2024-01-21T15:30:00Z",
    },
    {
      id: "5",
      type: "file_upload",
      user_name: freelancerName,
      user_email: "john@designer.com",
      user_type: "freelancer",
      content: "Uploaded revised logo concepts with modern typography",
      timestamp: "2024-01-22T11:00:00Z",
      metadata: {
        file_name: "logo_concepts_v2_modern.pdf",
        file_type: "pdf",
        file_url: "/files/logo_concepts_v2_modern.pdf",
      },
    },
  ])

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    setLoading(true)
    try {
      const newTimelineEvent: TimelineEvent = {
        id: Date.now().toString(),
        type: "comment",
        user_name: "Current User", // This would be dynamic based on auth
        user_email: "current@user.com",
        user_type: "client", // This would be dynamic
        content: newComment,
        timestamp: new Date().toISOString(),
      }

      setTimeline([...timeline, newTimelineEvent])
      setNewComment("")

      toast({
        title: "Comment Added",
        description: "Your comment has been posted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApproval = async () => {
    if (!approvalAction) return

    setLoading(true)
    try {
      const newTimelineEvent: TimelineEvent = {
        id: Date.now().toString(),
        type: approvalAction === "approve" ? "approval" : "rejection",
        user_name: "Current User",
        user_email: "current@user.com",
        user_type: "client",
        content:
          approvalAction === "approve"
            ? "Preview approved! Ready for final delivery."
            : `Preview declined. ${approvalReason}`,
        timestamp: new Date().toISOString(),
        metadata: {
          reason: approvalReason,
          old_status: currentStatus,
          new_status: approvalAction === "approve" ? "approved" : "revision_requested",
        },
      }

      setTimeline([...timeline, newTimelineEvent])
      setShowApprovalDialog(false)
      setApprovalAction(null)
      setApprovalReason("")

      toast({
        title: approvalAction === "approve" ? "Preview Approved" : "Preview Declined",
        description:
          approvalAction === "approve"
            ? "The project has been approved and is ready for final delivery."
            : "Feedback has been sent to the freelancer for revisions.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process approval. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="h-4 w-4" />
      case "status_change":
        return <Clock className="h-4 w-4" />
      case "file_upload":
        return <Upload className="h-4 w-4" />
      case "approval":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejection":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType?.includes("image")) return <ImageIcon className="h-4 w-4" />
    if (fileType?.includes("video")) return <Video className="h-4 w-4" />
    if (fileType?.includes("audio")) return <Music className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{projectTitle}</CardTitle>
              <CardDescription>Project Timeline & Communication</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={currentStatus === "approved" ? "default" : "secondary"}>
                {currentStatus.replace("_", " ")}
              </Badge>
              {currentStatus === "preview_sent" && (
                <div className="flex space-x-2">
                  <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => setApprovalAction("decline")}>
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Decline
                      </Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                      <Button size="sm" onClick={() => setApprovalAction("approve")}>
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {approvalAction === "approve" ? "Approve Preview" : "Decline Preview"}
                        </DialogTitle>
                        <DialogDescription>
                          {approvalAction === "approve"
                            ? "Are you satisfied with this preview and ready to approve it?"
                            : "Please provide feedback for the freelancer to make improvements."}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        {approvalAction === "decline" && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Reason for decline (optional)</label>
                            <Textarea
                              placeholder="Please provide specific feedback for improvements..."
                              value={approvalReason}
                              onChange={(e) => setApprovalReason(e.target.value)}
                              rows={3}
                            />
                          </div>
                        )}

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={handleApproval}
                            disabled={loading}
                            variant={approvalAction === "approve" ? "default" : "destructive"}
                          >
                            {loading && (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            )}
                            {approvalAction === "approve" ? "Approve Preview" : "Send Feedback"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>Track all project activities and communications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {timeline.map((event, index) => (
              <div key={event.id} className="flex space-x-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`p-2 rounded-full ${
                      event.type === "approval"
                        ? "bg-green-100"
                        : event.type === "rejection"
                          ? "bg-red-100"
                          : event.type === "file_upload"
                            ? "bg-blue-100"
                            : "bg-gray-100"
                    }`}
                  >
                    {getTimelineIcon(event.type)}
                  </div>
                  {index < timeline.length - 1 && <div className="w-px h-12 bg-gray-200 mt-2" />}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {event.user_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{event.user_name}</span>
                      <Badge variant="outline" className="text-xs">
                        {event.user_type}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatTimestamp(event.timestamp)}</span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm">{event.content}</p>

                    {event.metadata?.file_name && (
                      <div className="flex items-center space-x-2 mt-2 p-2 bg-white rounded border">
                        {getFileIcon(event.metadata.file_type || "")}
                        <span className="text-sm font-medium">{event.metadata.file_name}</span>
                        <div className="flex space-x-1 ml-auto">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {event.metadata?.old_status && event.metadata?.new_status && (
                      <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                        <span>Status changed from</span>
                        <Badge variant="outline" className="text-xs">
                          {event.metadata.old_status.replace("_", " ")}
                        </Badge>
                        <span>to</span>
                        <Badge variant="outline" className="text-xs">
                          {event.metadata.new_status.replace("_", " ")}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Comment */}
      <Card>
        <CardHeader>
          <CardTitle>Add Comment</CardTitle>
          <CardDescription>Share feedback or ask questions about this project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Type your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Attach File
                </Button>
              </div>
              <Button onClick={handleAddComment} disabled={loading || !newComment.trim()}>
                {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />}
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
