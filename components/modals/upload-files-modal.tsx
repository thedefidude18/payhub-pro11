"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, X, File, ImageIcon, Video, Music, Archive, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface UploadFilesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FileUpload {
  id: string
  file: File
  progress: number
  status: "uploading" | "completed" | "error"
  error?: string
}

const mockProjects = [
  { id: "1", title: "Logo Design for Tech Startup", client: "Tech Startup Inc" },
  { id: "2", title: "Website Redesign", client: "Restaurant Chain" },
  { id: "3", title: "Brand Identity Package", client: "Fashion Brand" },
]

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith("image/")) return ImageIcon
  if (fileType.startsWith("video/")) return Video
  if (fileType.startsWith("audio/")) return Music
  if (fileType.includes("pdf") || fileType.includes("document")) return File
  if (fileType.includes("zip") || fileType.includes("rar")) return Archive
  return File
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function UploadFilesModal({ open, onOpenChange }: UploadFilesModalProps) {
  const [selectedProject, setSelectedProject] = useState("")
  const [files, setFiles] = useState<FileUpload[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const simulateUpload = async (fileUpload: FileUpload) => {
    const updateProgress = (progress: number) => {
      setFiles((prev) => prev.map((f) => (f.id === fileUpload.id ? { ...f, progress } : f)))
    }

    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        updateProgress(progress)
      }

      // Mark as completed
      setFiles((prev) => prev.map((f) => (f.id === fileUpload.id ? { ...f, status: "completed" as const } : f)))
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileUpload.id
            ? {
                ...f,
                status: "error" as const,
                error: "Upload failed",
              }
            : f,
        ),
      )
    }
  }

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles: FileUpload[] = Array.from(selectedFiles).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: "uploading" as const,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Start upload simulation for each file
    newFiles.forEach((fileUpload) => {
      simulateUpload(fileUpload)
    })
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      handleFileSelect(e.dataTransfer.files)
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const handleSubmit = async () => {
    if (!selectedProject) {
      toast({
        title: "Error",
        description: "Please select a project first.",
        variant: "destructive",
      })
      return
    }

    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select files to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Simulate final processing
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const completedFiles = files.filter((f) => f.status === "completed")
      const project = mockProjects.find((p) => p.id === selectedProject)

      toast({
        title: "Files Uploaded Successfully!",
        description: `${completedFiles.length} files uploaded to ${project?.title}`,
      })

      // Reset form
      setFiles([])
      setSelectedProject("")
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process uploads. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const completedFiles = files.filter((f) => f.status === "completed").length
  const totalFiles = files.length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Upload Files</DialogTitle>
          <DialogDescription>
            Upload files to an existing project. Supported formats: Images, Documents, Videos, Archives.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Selection */}
          <div className="space-y-2">
            <Label htmlFor="project">Select Project *</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a project" />
              </SelectTrigger>
              <SelectContent>
                {mockProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    <div>
                      <div className="font-medium">{project.title}</div>
                      <div className="text-sm text-muted-foreground">{project.client}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* File Upload Area */}
          <div className="space-y-4">
            <Label>Upload Files</Label>

            {/* Drag and Drop Zone */}
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400",
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium">Drop files here or click to browse</p>
                <p className="text-sm text-muted-foreground">Maximum file size: 100MB per file</p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.zip,.rar"
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                  Browse Files
                </Button>
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Files ({files.length})</Label>
                  {totalFiles > 0 && (
                    <Badge variant="outline">
                      {completedFiles}/{totalFiles} completed
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {files.map((fileUpload) => {
                    const FileIcon = getFileIcon(fileUpload.file.type)

                    return (
                      <div key={fileUpload.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <FileIcon className="h-8 w-8 text-gray-500 flex-shrink-0" />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium truncate">{fileUpload.file.name}</p>
                            <div className="flex items-center gap-2">
                              {fileUpload.status === "completed" && <CheckCircle className="h-4 w-4 text-green-500" />}
                              {fileUpload.status === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(fileUpload.id)}
                                className="h-6 w-6 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>{formatFileSize(fileUpload.file.size)}</span>
                            <span>{fileUpload.progress}%</span>
                          </div>

                          <Progress value={fileUpload.progress} className="h-1" />

                          {fileUpload.error && <p className="text-xs text-red-500 mt-1">{fileUpload.error}</p>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isUploading || files.length === 0 || !selectedProject}>
            {isUploading ? "Processing..." : `Upload ${files.length} Files`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
