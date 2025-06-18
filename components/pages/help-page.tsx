"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ColorfulBadge } from "@/components/ui/colorful-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  HelpCircle,
  MessageSquare,
  Book,
  Video,
  FileText,
  Mail,
  Phone,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const faqCategories = [
    { id: "all", name: "All", count: 24 },
    { id: "getting-started", name: "Getting Started", count: 8 },
    { id: "projects", name: "Projects", count: 6 },
    { id: "payments", name: "Payments", count: 5 },
    { id: "account", name: "Account", count: 3 },
    { id: "technical", name: "Technical", count: 2 },
  ]

  const faqs = [
    {
      id: "1",
      category: "getting-started",
      question: "How do I create my first project?",
      answer:
        "To create your first project, navigate to the Projects page and click the 'New Project' button. Fill in the project details including title, description, price, and client information. You can then upload your files and send a preview to your client.",
      helpful: 15,
      notHelpful: 2,
    },
    {
      id: "2",
      category: "projects",
      question: "How do I send a preview to my client?",
      answer:
        "Once you've uploaded your project files, go to the project timeline and click 'Send Preview'. Your client will receive an email with a secure link to view and comment on your work.",
      helpful: 12,
      notHelpful: 1,
    },
    {
      id: "3",
      category: "payments",
      question: "When do I receive payment for my projects?",
      answer:
        "Payments are processed automatically when your client approves the final deliverables. Funds are typically available in your account within 2-3 business days, minus the platform commission.",
      helpful: 20,
      notHelpful: 0,
    },
    {
      id: "4",
      category: "account",
      question: "How can I become a SuperFreelancer?",
      answer:
        "SuperFreelancer status is awarded based on your performance metrics including client satisfaction, project completion rate, and total earnings. Qualified freelancers receive reduced commission rates and priority support.",
      helpful: 18,
      notHelpful: 3,
    },
    {
      id: "5",
      category: "technical",
      question: "What file formats are supported?",
      answer:
        "PayVidi supports a wide range of file formats including JPG, PNG, PDF, MP4, MP3, WAV, PSD, AI, and more. Maximum file size is 500MB per upload.",
      helpful: 10,
      notHelpful: 1,
    },
    {
      id: "6",
      category: "projects",
      question: "How do I handle client revisions?",
      answer:
        "When a client requests revisions, they can leave comments directly on your project timeline. You can respond to their feedback, upload revised files, and continue the collaboration until they're satisfied.",
      helpful: 14,
      notHelpful: 2,
    },
  ]

  const tutorials = [
    {
      id: "1",
      title: "Getting Started with PayVidi",
      description: "Complete guide to setting up your freelancer account",
      type: "video",
      duration: "8 min",
      difficulty: "Beginner",
    },
    {
      id: "2",
      title: "Creating Your First Project",
      description: "Step-by-step tutorial on project creation",
      type: "article",
      readTime: "5 min",
      difficulty: "Beginner",
    },
    {
      id: "3",
      title: "Advanced Project Management",
      description: "Tips for managing multiple projects efficiently",
      type: "video",
      duration: "12 min",
      difficulty: "Intermediate",
    },
    {
      id: "4",
      title: "Optimizing Your Profile",
      description: "Best practices for attracting clients",
      type: "article",
      readTime: "7 min",
      difficulty: "Beginner",
    },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Help Center</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions, browse tutorials, or contact our support team
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-blue-500 rounded-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Contact Support</h3>
              <p className="text-sm text-blue-700">Get help from our team</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-green-500 rounded-lg">
              <Video className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">Video Tutorials</h3>
              <p className="text-sm text-green-700">Learn with step-by-step guides</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-purple-500 rounded-lg">
              <Book className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-purple-900">Documentation</h3>
              <p className="text-sm text-purple-700">Browse detailed guides</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          {/* FAQ Categories */}
          <div className="flex flex-wrap gap-2">
            {faqCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-xs"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* FAQ List */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                {filteredFaqs.length} question{filteredFaqs.length !== 1 ? "s" : ""} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center space-x-2">
                        <HelpCircle className="h-4 w-4 text-blue-500" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">{faq.answer}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-muted-foreground">Was this helpful?</span>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {faq.helpful}
                              </Button>
                              <Button variant="outline" size="sm">
                                <ThumbsDown className="h-3 w-3 mr-1" />
                                {faq.notHelpful}
                              </Button>
                            </div>
                          </div>
                          <ColorfulBadge variant="category" value={faq.category}>
                            {faqCategories.find((c) => c.id === faq.category)?.name}
                          </ColorfulBadge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {tutorial.type === "video" ? (
                        <Video className="h-5 w-5 text-blue-600" />
                      ) : (
                        <FileText className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <ColorfulBadge variant="category" value={tutorial.difficulty}>
                        {tutorial.difficulty}
                      </ColorfulBadge>
                      <span className="text-sm text-muted-foreground">
                        {tutorial.type === "video" ? tutorial.duration : tutorial.readTime}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Send us a message and we'll get back to you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="What can we help you with?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="Describe your issue or question..." rows={4} />
                </div>
                <Button className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Other Ways to Reach Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@payvidi.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Phone className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-muted-foreground">Available 9 AM - 6 PM EST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Times</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Email</span>
                    <ColorfulBadge variant="priority" value="medium">
                      24 hours
                    </ColorfulBadge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Live Chat</span>
                    <ColorfulBadge variant="priority" value="low">
                      Instant
                    </ColorfulBadge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Phone</span>
                    <ColorfulBadge variant="priority" value="low">
                      Instant
                    </ColorfulBadge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto">
                  <Book className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">User Guide</h3>
                  <p className="text-sm text-muted-foreground">Complete documentation</p>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto">
                  <Video className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Video Library</h3>
                  <p className="text-sm text-muted-foreground">Step-by-step tutorials</p>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Watch Videos
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto">
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Community</h3>
                  <p className="text-sm text-muted-foreground">Connect with other users</p>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Join Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
