"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, FileText, Mail, Plus, Search, Trash2, Phone, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

export default function AssistantPage() {
  const { toast } = useToast()
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [searchQuery, setSearchQuery] = useState("")

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const tasks = [
    {
      id: 1,
      title: "Prepare quarterly report",
      dueDate: "2025-03-25",
      priority: "high",
      status: "in-progress",
      description: "Compile data and create presentation for Q1 results",
    },
    {
      id: 2,
      title: "Schedule team meeting",
      dueDate: "2025-03-20",
      priority: "medium",
      status: "completed",
      description: "Coordinate with team members for weekly sync",
    },
    {
      id: 3,
      title: "Research AI trends",
      dueDate: "2025-03-30",
      priority: "low",
      status: "not-started",
      description: "Gather information on latest AI developments for blog post",
    },
    {
      id: 4,
      title: "Review marketing materials",
      dueDate: "2025-03-22",
      priority: "medium",
      status: "in-progress",
      description: "Provide feedback on new campaign assets",
    },
  ]

  const reminders = [
    {
      id: 1,
      title: "Team standup",
      time: "09:00 AM",
      date: "Today",
      type: "meeting",
    },
    {
      id: 2,
      title: "Call with client",
      time: "02:30 PM",
      date: "Today",
      type: "call",
    },
    {
      id: 3,
      title: "Submit expense report",
      time: "05:00 PM",
      date: "Tomorrow",
      type: "task",
    },
    {
      id: 4,
      title: "Project deadline",
      time: "All day",
      date: "Mar 25",
      type: "deadline",
    },
  ]

  const emails = [
    {
      id: 1,
      sender: "Sarah Johnson",
      subject: "Project Update: AI Implementation",
      preview: "Here's the latest progress on our AI integration...",
      time: "10:23 AM",
      unread: true,
    },
    {
      id: 2,
      sender: "Marketing Team",
      subject: "New Campaign Materials",
      preview: "Please review the attached files for our upcoming...",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      sender: "Alex Chen",
      subject: "Meeting Notes: Product Strategy",
      preview: "Attached are the notes from our discussion about...",
      time: "Yesterday",
      unread: true,
    },
    {
      id: 4,
      sender: "HR Department",
      subject: "Upcoming Training Sessions",
      preview: "We're pleased to announce new professional development...",
      time: "Mar 15",
      unread: false,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-500/10"
      case "medium":
        return "text-amber-500 bg-amber-500/10"
      case "low":
        return "text-emerald-500 bg-emerald-500/10"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
      case "in-progress":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20"
      case "not-started":
        return "text-muted-foreground bg-muted border-muted-foreground/20"
      default:
        return "text-muted-foreground bg-muted border-muted-foreground/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <Calendar className="h-4 w-4 text-primary" />
      case "call":
        return <Phone className="h-4 w-4 text-emerald-500" />
      case "task":
        return <FileText className="h-4 w-4 text-amber-500" />
      case "deadline":
        return <Clock className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} activeTab="assistant" />

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} title="Personal Assistant" />

        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="icon" asChild className="mr-2">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Personal Assistant</h1>
                <p className="text-muted-foreground">Manage your tasks, reminders, and communications</p>
              </div>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-9 bg-background/50 border-border/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="tasks" className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
                <TabsTrigger value="tasks" className="text-sm">
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="reminders" className="text-sm">
                  Reminders
                </TabsTrigger>
                <TabsTrigger value="emails" className="text-sm">
                  Emails
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tasks" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Tasks</h2>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Add Task
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tasks.map((task) => (
                    <Card key={task.id} className="overflow-hidden group hover:shadow-md transition-all">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <CardTitle className="text-base">{task.title}</CardTitle>
                            <CardDescription>{task.description}</CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Due:{" "}
                            {new Date(task.dueDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t bg-card/30 backdrop-blur-sm pt-3">
                        <Badge variant="outline" className={cn("font-normal", getPriorityColor(task.priority))}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </Badge>
                        <Badge variant="outline" className={cn("font-normal", getStatusColor(task.status))}>
                          {task.status
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </Badge>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reminders" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Reminders</h2>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Add Reminder
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {reminders.map((reminder) => (
                    <Card key={reminder.id} className="overflow-hidden group hover:shadow-md transition-all">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full p-2 bg-primary/10">{getTypeIcon(reminder.type)}</div>
                            <CardTitle className="text-base">{reminder.title}</CardTitle>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {reminder.time}, {reminder.date}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="emails" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Recent Emails</h2>
                  <Button className="gap-2">
                    <Mail className="h-4 w-4" /> Compose
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {emails.map((email) => (
                        <div
                          key={email.id}
                          className={cn(
                            "flex items-start p-4 hover:bg-muted/50 transition-colors cursor-pointer group",
                            email.unread ? "bg-primary/5" : "",
                          )}
                        >
                          <Avatar className="h-10 w-10 mr-4">
                            <div className="bg-primary text-primary-foreground font-medium">
                              {email.sender
                                .split(" ")
                                .map((name) => name[0])
                                .join("")}
                            </div>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                              <h4 className={cn("text-sm font-medium truncate", email.unread ? "font-semibold" : "")}>
                                {email.sender}
                              </h4>
                              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{email.time}</span>
                            </div>
                            <h3 className={cn("text-sm truncate mb-1", email.unread ? "font-medium" : "")}>
                              {email.subject}
                            </h3>
                            <p className="text-xs text-muted-foreground truncate">{email.preview}</p>
                          </div>
                          {email.unread && <div className="ml-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

