"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  History,
  Settings,
  Info,
  MessageSquare,
  Plus,
  X,
  Sparkles,
  Zap,
  Brain,
  Database,
  FileText,
  Calendar,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeTab?: string
}

export default function Sidebar({ isOpen, onClose, activeTab }: SidebarProps) {
  const isMobile = useMobile()
  const [activeChat, setActiveChat] = useState<string | null>("chat1")

  const chatHistory = [
    { id: "chat1", title: "Productivity tips", date: "Today" },
    { id: "chat2", title: "Project planning", date: "Yesterday" },
    { id: "chat3", title: "Content ideas", date: "Mar 15" },
    { id: "chat4", title: "Technical questions", date: "Mar 10" },
  ]

  const features = [
    { icon: <Sparkles className="h-4 w-4" />, name: "Smart Responses" },
    { icon: <Zap className="h-4 w-4" />, name: "Real-Time Processing" },
    { icon: <Brain className="h-4 w-4" />, name: "Self-Learning" },
    { icon: <Database className="h-4 w-4" />, name: "Secure Storage" },
  ]

  const mainNavItems = [
    { icon: <MessageSquare className="h-5 w-5" />, name: "Chat", href: "/chat", id: "chat" },
    { icon: <FileText className="h-5 w-5" />, name: "Content Creation", href: "/create", id: "create" },
    { icon: <Calendar className="h-5 w-5" />, name: "Personal Assistant", href: "/assistant", id: "assistant" },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={onClose} />}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transition-transform duration-300 ease-in-out",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "relative z-0 w-64",
        )}
      >
        {isMobile && (
          <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}

        <div className="flex flex-col h-full">
          <div className="p-4">
            <Button
              asChild
              className="w-full justify-start gap-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Link href="/">
                <Plus className="h-4 w-4" />
                New Chat
              </Link>
            </Button>
          </div>

          <div className="px-4 py-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Main Navigation</h3>
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2 h-10"
                  asChild
                >
                  <Link href={item.href}>
                    {item.icon}
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="px-4 py-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent Chats</h3>
            <ScrollArea className="h-[30vh]">
              <div className="space-y-1">
                {chatHistory.map((chat) => (
                  <Button
                    key={chat.id}
                    variant={activeChat === chat.id ? "secondary" : "ghost"}
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => setActiveChat(chat.id)}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm">{chat.title}</span>
                      <span className="text-xs text-muted-foreground">{chat.date}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="px-4 py-2 mt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-auto py-2 justify-start gap-2 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all"
                      >
                        {feature.icon}
                        <span className="text-xs truncate">{feature.name}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{feature.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>

          <div className="mt-auto border-t">
            <div className="p-4 space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <History className="h-4 w-4" />
                History
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Info className="h-4 w-4" />
                Help & Info
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

