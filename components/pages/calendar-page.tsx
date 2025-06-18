"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ColorfulBadge } from "@/components/ui/colorful-badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus, CalendarIcon, Clock, Users, Video, Phone } from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  description?: string
  start: Date
  end: Date
  type: "meeting" | "deadline" | "call" | "review"
  client?: string
  project?: string
  location?: string
  attendees?: string[]
}

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showEventDialog, setShowEventDialog] = useState(false)

  // Mock events data
  const [events] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Client Review Meeting",
      description: "Review logo concepts with Tech Startup Inc",
      start: new Date(2024, 0, 22, 10, 0),
      end: new Date(2024, 0, 22, 11, 0),
      type: "meeting",
      client: "Tech Startup Inc",
      project: "Logo Design",
      location: "Zoom",
      attendees: ["client1@example.com"],
    },
    {
      id: "2",
      title: "Project Deadline",
      description: "Website redesign final delivery",
      start: new Date(2024, 0, 25, 23, 59),
      end: new Date(2024, 0, 25, 23, 59),
      type: "deadline",
      client: "Restaurant Chain",
      project: "Website Redesign",
    },
    {
      id: "3",
      title: "Discovery Call",
      description: "Initial consultation with new client",
      start: new Date(2024, 0, 24, 14, 0),
      end: new Date(2024, 0, 24, 15, 0),
      type: "call",
      client: "E-commerce Store",
      location: "Phone",
    },
    {
      id: "4",
      title: "Design Review",
      description: "Internal review of brand identity concepts",
      start: new Date(2024, 0, 23, 16, 0),
      end: new Date(2024, 0, 23, 17, 0),
      type: "review",
      project: "Brand Identity Package",
    },
  ])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-500"
      case "deadline":
        return "bg-red-500"
      case "call":
        return "bg-green-500"
      case "review":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <Users className="h-3 w-3" />
      case "deadline":
        return <Clock className="h-3 w-3" />
      case "call":
        return <Phone className="h-3 w-3" />
      case "review":
        return <Video className="h-3 w-3" />
      default:
        return <CalendarIcon className="h-3 w-3" />
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 p-1"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayEvents = getEventsForDate(date)
      const isToday = new Date().toDateString() === date.toDateString()

      days.push(
        <div
          key={day}
          className={`h-24 p-1 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
            isToday ? "bg-blue-50 border-blue-300" : ""
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : ""}`}>{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded text-white truncate ${getEventTypeColor(event.type)}`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  const upcomingEvents = events
    .filter((event) => event.start >= new Date())
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and deadlines</p>
        </div>
        <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Add a new event to your calendar</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Event Title</Label>
                <Input placeholder="Enter event title" />
              </div>
              <div className="space-y-2">
                <Label>Event Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="datetime-local" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Event description (optional)" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowEventDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowEventDialog(false)}>Create Event</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Today
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-0 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0">{renderCalendarDays()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your next scheduled events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg text-white ${getEventTypeColor(event.type)}`}>
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.start.toLocaleDateString()} at{" "}
                      {event.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    {event.client && (
                      <ColorfulBadge variant="category" className="mt-1 text-xs">
                        {event.client}
                      </ColorfulBadge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Meetings</span>
                <ColorfulBadge variant="category">3</ColorfulBadge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Deadlines</span>
                <ColorfulBadge variant="priority" value="high">
                  2
                </ColorfulBadge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Calls</span>
                <ColorfulBadge variant="category">1</ColorfulBadge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
